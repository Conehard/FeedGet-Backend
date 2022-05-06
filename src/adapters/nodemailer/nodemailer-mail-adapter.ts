import {MailAdapter, SendMailData} from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "",
    port: 2525,
    auth: {
        user: "",
        pass: ""
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
