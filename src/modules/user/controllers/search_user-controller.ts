import { Request, Response } from "express";
import SearchUserService from "../services/search_user-service";
import { Document } from "mongoose";


interface SearchUser {
    username: string;
}

class SearchUserController {
    static async searchUser(req: Request, res: Response): Promise<void> {
        const username = req.query.username as string;
        try {
            const service = new SearchUserService();
            const user:Array<Document> | null = await service.searchUser(username);

            if(!user || user.length === 0) {
                res.status(404).json({message: "User not found"});
            } else {
                res.status(200).json(user);
            }
        } catch(error) {
            console.error(error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}

export default SearchUserController;