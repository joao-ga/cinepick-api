import { Request, Response } from "express";
import GetUserFollowersReviewService from "../services/get_user_followers-service";

class GetUserFollowersReviewController {
    static async getUserFollowersReview(req: Request, res: Response): Promise<void> {
        const data: any = req.params;
        try {
            const service = new GetUserFollowersReviewService();
            const reviews = await service.getUserFollowersReview(data);

            if(reviews) {
                res.status(200).json(reviews);
            } else {
                res.status(400).json({ message: "Erro ao buscar avaliação dos seguidores" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
        
    }
}

export default GetUserFollowersReviewController;