import * as codebuild from "@aws-cdk/aws-codebuild";
import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import * as iam from "@aws-cdk/aws-iam";
import * as s3 from "@aws-cdk/aws-s3";
import { App, Duration, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { Stage } from "./Stage";

export interface PipelineStackProps extends StackProps {
  readonly frm_repo: string;
  readonly frm_stage: Stage;
}

export class PipelineStack extends Stack {
  static GetConfig(stage: Stage) {
    const ProductionCloudFronDistributionId = "E3A3KT8AKE6WRE";
    const StagingCloudFronDistributionId = "E1RJCHB3FHUS4A";

    return {
      repo_owner: "editoraforum",
      assets_bucket_name: "cdk-assets-1006",
      branch: stage === "production" ? "main" : "staging",
      distribution_id:
        stage === "production"
          ? ProductionCloudFronDistributionId
          : StagingCloudFronDistributionId,
    };
  }

  constructor(app: App, id: string, props: PipelineStackProps) {
    super(app, id, props);

    const { repo_owner, assets_bucket_name, branch, distribution_id } =
      PipelineStack.GetConfig(props.frm_stage);

    const source_code = new codepipeline.Artifact("SourceCode");
    const ui_build = new codepipeline.Artifact("UiBuild");
    const github_token = SecretValue.secretsManager("GithubToken");

    const deploy_bucket = new s3.Bucket(this, "DeploymentBucket", {
      bucketName: `bid1006-${props.frm_stage}-${props.frm_repo}`,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      enforceSSL: true,
    });

    const assets_bucket = s3.Bucket.fromBucketName(
      this,
      "AssetsBucket",
      assets_bucket_name
    );

    new codepipeline.Pipeline(this, "Pipeline", {
      pipelineName: `${props.frm_stage}-${props.frm_repo}`,
      artifactBucket: assets_bucket,
      stages: [
        {
          stageName: "Source",
          actions: [
            new codepipeline_actions.GitHubSourceAction({
              actionName: "Github",
              oauthToken: github_token,
              owner: repo_owner,
              repo: props.frm_repo,
              branch: branch,
              output: source_code,
            }),
          ],
        },

        {
          stageName: "Build",
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: "Build",
              input: source_code,
              project: new codebuild.PipelineProject(this, "UiBuild", {
                timeout: Duration.minutes(6),
                environment: {
                  computeType: codebuild.ComputeType.SMALL,
                  buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_3,
                },
                buildSpec: codebuild.BuildSpec.fromObject({
                  version: "0.2",
                  phases: {
                    install: {
                      commands: ["n 14.18.3", "cd code", "npm install"],
                    },
                    // pre_build: {
                    //   commands: ["npm test -- --watchAll=false"],
                    // },
                    build: {
                      commands: [
                        branch === "main"
                          ? "npm run build"
                          : "npm run build:staging",
                      ],
                    },
                  },
                  artifacts: {
                    "base-directory": "code/build",
                    files: [`**/*`],
                  },
                }),
              }),
              outputs: [ui_build],
            }),
          ],
        },
        {
          stageName: "Deploy",
          actions: [
            new codepipeline_actions.S3DeployAction({
              actionName: "S3Deploy",
              bucket: deploy_bucket,
              input: ui_build,
              runOrder: 1,
            }),
            new codepipeline_actions.CodeBuildAction({
              actionName: "InvalidateCache",
              project:
                this.create_invalidate_distribution_build_project(
                  distribution_id
                ),
              input: ui_build,
              runOrder: 2,
            }),
          ],
        },
      ],
    });
  }

  create_invalidate_distribution_build_project(distribution_id: string) {
    const project = new codebuild.PipelineProject(this, `InvalidateProject`, {
      environment: {
        computeType: codebuild.ComputeType.SMALL,
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_3,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          build: {
            commands: [
              `aws cloudfront create-invalidation --distribution-id ${distribution_id} --paths "/*"`,
            ],
          },
        },
      }),
    });

    // Add Cloudfront invalidation permissions to the project
    const distributionArn = `arn:aws:cloudfront::${this.account}:distribution/${distribution_id}`;
    const policy = new iam.PolicyStatement({
      resources: [distributionArn],
      actions: ["cloudfront:CreateInvalidation"],
    });
    project.addToRolePolicy(policy);

    return project;
  }
}
