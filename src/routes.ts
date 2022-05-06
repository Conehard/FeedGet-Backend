import express from "express";
import {SubmitFeedbackService} from "./services/submit-feedback-service";
import {PrismaFeedbacksRepository} from "./repositories/prisma/prisma-feedbacks-repository";
import {NodemailerMailAdapter} from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodeMailerAdapter = new NodemailerMailAdapter();

    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository,nodeMailerAdapter);
    await submitFeedbackService.execute({type, comment, screenshot});

    res.status(201).json();
});
