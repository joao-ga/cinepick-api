import { Request, Response } from "express";
import CreateReviewService from "../services/create_review-service";

class CreateReviewController {
    static async createReview(req: Request, res: Response): Promise<void> {
        const data = req.body;

        try {
            const service = new CreateReviewService();

            const review = await service.createReview(data);

            if(review) {
                res.status(201).json(review);
            } else {
                res.status(400).json({ message: "Erro ao avaliar filme" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }

    }
}

export default CreateReviewController;
