/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
export function validate_email(email: string) {
  if (!email) {
    return false;
  }

  const email_regex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return !!email.match(email_regex);
}
