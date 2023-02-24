#!/usr/bin/env node
import { App, Tags } from "@aws-cdk/core";
import { PipelineStack } from "./PipelineStack";

import { Stage } from "./Stage";

export function create_stacks() {
  const app = new App();
  const stages: Stage[] = ["staging", "production"];

  stages.forEach((stage) => {
    const pipeline_stack = new PipelineStack(
      app,
      `${stage}-plat-react-ui-pipeline`,
      {
        frm_repo: "plat-react-ui",
        frm_stage: stage,
      }
    );

    Tags.of(pipeline_stack).add("stage", stage);
  });

  app.synth();
}
