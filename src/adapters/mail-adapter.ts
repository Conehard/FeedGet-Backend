export interface SendMailData{
    from: string;
    to: string;
    subject: string;
    body: string;
}
export interface MailAdapter {
  send(mail: SendMailData): Promise<void>;
}
