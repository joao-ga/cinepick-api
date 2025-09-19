import { User } from "../entities/user-entity";

class GetFirstLoginService {
    async getFirstLogin(data: any): Promise<boolean | null> {
        const firstLogin = await User.findOne({ uid: data.uid }).select("movieGender").lean();
        
        if (firstLogin?.movieGender && firstLogin?.movieGender?.length > 0) {
            return true;
        }
        return false;
    }
}

export default GetFirstLoginService;