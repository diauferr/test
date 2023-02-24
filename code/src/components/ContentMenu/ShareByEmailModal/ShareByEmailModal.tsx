/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { ContentSearchResult } from '../../../models/ContentSearchResult';

interface IProps {
  result: ContentSearchResult;
  onCancel: () => any;
  visible: boolean;
}

interface IEmailInfo {
  email: string;
  valid: boolean;
}

export const ShareByEmailModal = ({ result, onCancel, visible }: IProps) =>
  null;
// const [shareApiResult, loading, error, doRequest] = useDoRequest<any>();
// const [emails, setEmails] = useState<string[]>([]);
// const [emailOnInputInfo, setEmailOnInputInfo] = useState<IEmailInfo>({
// 	email: "",
// 	valid: false
// });

// const contentLink = getAppCofig().bidBaseUrl + RoutesResolver.getContentRoute(result);

// useEffect(() => {
// 	if (_.get(shareApiResult, "status") === 200) {
// 		message.success("Conteúdo compartilhado.");
// 		onCancel();
// 	}
// 	setEmails([]);
// 	setEmailOnInputInfo({ email: "", valid: false });
// }, [shareApiResult]);

// useEffect(() => {
// 	if (error) message.error("Ocorreu um erro ao tentar compartilhar o conteúdo.");
// }, [error]);

// const isEmailAlreadyIncluded = (email: string) => emails.some((e) => e === email);

// function share() {
// 	if (loading) return;

// 	let _emails = [...emails];

// 	if (!emailOnInputInfo.valid) {
// 		doRequest(() => {
// 			return EmailRequests.shareContentByEmail(contentLink, result, _emails);
// 		});
// 	} else {
// 		if (isEmailAlreadyIncluded(emailOnInputInfo.email)) {
// 			message.error("E-mail já adicionado.");
// 			return;
// 		}

// 		_emails = [..._emails, emailOnInputInfo.email];

// 		doRequest(() => {
// 			return EmailRequests.shareContentByEmail(contentLink, result, _emails);
// 		});
// 	}
// }

// return (
// 	<Modal
// 		title="Compartilhar por email"
// 		visible={visible}
// 		onOk={() => null}
// 		onCancel={onCancel}
// 		footer={[
// 			<Button
// 				type={"primary"}
// 				key={"btn-1"}
// 				disabled={emails.length === 0 && !emailOnInputInfo.valid}
// 				loading={loading}
// 				onClick={share}
// 			>
// 				Enviar
// 			</Button>
// 		]}
// 	>
// 		<ModalBody>
// 			<Fieldset disabled={loading}>
// 				<EmailInput
// 					onValidEmailAndEnterPressed={(email: string) => {
// 						if (isEmailAlreadyIncluded(email)) {
// 							message.error("E-mail já adicionado.");
// 						} else {
// 							setEmailOnInputInfo({ email: "", valid: false });
// 							setEmails([...emails, email]);
// 						}
// 					}}
// 					otherProps={{
// 						autoFocus: true
// 					}}
// 					onChange={(email, valid) => {
// 						setEmailOnInputInfo({ email, valid });
// 					}}
// 					inputValue={emailOnInputInfo.email}
// 				/>

// 				<ReceipientsEmailList
// 					emails={emails}
// 					onRemoveEmailClick={(email: string) => {
// 						setEmails(emails.filter((e) => e !== email));
// 					}}
// 				/>
// 			</Fieldset>
// 		</ModalBody>
// 	</Modal>
// );
