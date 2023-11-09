import mailer from "@sendgrid/mail";
import { renderFile } from "ejs";
import path from "path";

export async function sendEmail(sendTo, subject, template, locals) {
  mailer.setApiKey(process.env.SENDGRID_API_KEY);

  const __dirname = new URL(".", import.meta.url).pathname;
  const templatePath = path.join(__dirname, "../views/emails", template);
  const html = await renderFile(templatePath, locals);

  const msg = {
    from: "noureddine@laassari.com",
    to: sendTo,
    subject,
    html,
  };

  return mailer.send(msg).then(console.log).catch(console.error);
}
