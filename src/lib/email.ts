import { Resend } from "resend";

let resendClient: Resend | null | undefined;

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const client = getResend();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!client || !from) {
    console.info("Email skipped because Resend credentials are unavailable.", {
      to,
      subject,
    });
    return { delivered: false, fallback: true };
  }

  await client.emails.send({
    from,
    to,
    subject,
    html,
  });

  return { delivered: true, fallback: false };
}
