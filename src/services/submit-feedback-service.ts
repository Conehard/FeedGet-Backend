import {FeedbacksRepository} from "../repositories/feedbacks-repository";
import {MailAdapter} from "../adapters/mail-adapter";

interface SubmitFeedbackServiceRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter){}


    async execute(request: SubmitFeedbackServiceRequest){
        const { type, comment, screenshot } = request;

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format');
        }

        if(!type){
            throw new Error('Invalid type');
        }

        if(!comment){
            throw new Error('Invalid comment');
        }

        await this.feedbacksRepository.create({ type, comment, screenshot });

        await this.mailAdapter.send({
            from: 'FeedGet <noreply@feedget.com',
            to: 'André Assunção <andre@egend.com',
            subject: 'Feedback',
            body: [
                `<div>`,
                `<p>Tipo: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `<div>`
            ].join('\n')
        });

    }
}
