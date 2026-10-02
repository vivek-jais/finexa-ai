import { Env } from "../config/env.config";
import { resend } from "../config/resend.config";

type Params = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  from?: string;
};

const mailer_sender = `Finexa <${Env.RESEND_MAILER_SENDER}>`;

export const sendEmail = async ({
  to,
  from = mailer_sender,
  subject,
  text,
  html,
}: Params) => {
  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    text,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`);
  }

  return data;
};