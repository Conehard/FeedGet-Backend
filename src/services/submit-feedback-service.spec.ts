import {SubmitFeedbackService} from "./submit-feedback-service";

const createFeedBackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    {create: createFeedBackSpy},
    {send: sendEmailSpy}
);

describe('Submit Feedback', () => {
    it('shoud be able to submit a feedback', async () => {
        await  expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60hGlUAAAAABJRU5ErkJggg=='
        })).resolves.not.toThrow();

        expect(createFeedBackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });

    it('shoud not be able to submit a feedback without type', async () => {
        await  expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60hGlUAAAAABJRU5ErkJggg=='
        })).rejects.toThrow();
    });

    it('shoud not be able to submit a feedback without comment', async () => {
        await  expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60hGlUAAAAABJRU5ErkJggg=='
        })).rejects.toThrow();
    });

    it('shoud not be able to submit a feedback with invalid screenshot', async () => {
        await  expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.png'
        })).rejects.toThrow();
    });
});
