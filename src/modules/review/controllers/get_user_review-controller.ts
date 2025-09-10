import { Request, Response } from "express";
import GetUserReviewService from "../services/get_user_review-service";


class GetUserReviewController {
    static async getUserReview(req: Request, res: Response): Promise<void> {
        const data: any = req.params;
        try {
            const service = new GetUserReviewService();
            const review = await service.getUserReview(data);

            if(review) {
                res.status(200).json(review);
            } else {
                res.status(400).json({ message: "Erro ao buscar avaliação do usuário" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export default GetUserReviewController;