import User from "../entities/user-entity";
import { Document } from "mongoose";

class GetService {
    async getUser(data: any): Promise<Document | null> {
        const uid = data.uid;
        try {
            const user = await User.findOne({ uid: uid });
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GetService;
