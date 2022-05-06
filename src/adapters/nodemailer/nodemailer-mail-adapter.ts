import {MailAdapter, SendMailData} from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "08bd90903b55d7",
        pass: "37ed4d1369d9a5"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async send({subject, body, to, from }: SendMailData): Promise<void> {
        await transport.sendMail({
            from,
            to,
            subject,
            html: body
        });
    }
}
