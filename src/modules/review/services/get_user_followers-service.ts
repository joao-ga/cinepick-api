import { Document } from "mongoose";
import { Review } from "../entities/review-entity";
import { User } from "../../user/entities/user-entity";
import { Follow } from "../../follows/entities/follow-entity";
import { Movie } from "../../movies/entities/movie-entity";

interface IUserFollowersReview {
    uid: string;
}

class GetUserFollowersReviewService {
    async getUserFollowersReview(data: IUserFollowersReview): Promise<any[] | null> {
        const uid = data.uid;
        try {
            const userExists = await this.getIfUserExists(uid);
            if(!userExists) {
                console.error("Usuário não encontrado");
                return null;
            }

            const userHasReview = await this.getIfUserHasReview(uid);
            if(!userHasReview) {
                console.error("Usuário não tem avaliação");
                return null;
            }

            const userHasFollowees = await this.getIfUserHasFollowees(uid);
            if(!userHasFollowees) {
                console.error("Usuário não segue ninguém");
                return null;
            }

            const followees = await this.getUserFollowees(uid);
            const followeeIds = followees.map((f: any) => f.followee_id);

            const users = await User.find({ uid: { $in: followeeIds } })
                .select("uid name")
                .lean();
            const uidToName = new Map<string, string>(
                users.map((u: any) => [u.uid, u.name])
            );

            const reviews = await Review.find({
                user_uid: { $in: followeeIds }
            }).lean();

            const movieIds = reviews.map((r: any) => r.movie_id);
            const movies = await Movie.find({ _id: { $in: movieIds } })
                .select("_id title poster")
                .lean();
            const idToMovie = new Map<string, { title?: string; poster?: string }>(
                movies.map((m: any) => [String(m._id), { title: m.title, poster: m.poster }])
            );

            const reviewsWithName = reviews.map((r: any, idx: number) => {
                const { user_uid, movie_id, ...rest } = r;
                const movie = idToMovie.get(String(movie_id)) ?? {};
                const enriched = {
                    ...rest,
                    uid: user_uid, 
                    user_name: uidToName.get(user_uid) ?? null,
                    title: movie.title ?? null,
                    poster: movie.poster ?? null
                };
                return enriched;
            });

            return reviewsWithName;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private async getIfUserExists(uid: string): Promise<boolean> {
        const user = await User.findOne({ uid: uid });
        if(user) {
            return true;
        }
        return false;
    }

    private async getIfUserHasReview(uid: string): Promise<boolean> {
        const review = await Review.findOne({ user_uid: uid });
        if(review) {
            return true;
        }
        return false;
    }

    private async getIfUserHasFollowees(uid: string): Promise<boolean> {
        const followees = await Follow.find({ follower_id: uid });
        if(followees.length > 0) {
            return true;
        }
        return false;
    }

    private async getUserFollowees(uid: string): Promise<Document[]> {
        const followees = await Follow.find({ follower_id: uid });
        return followees;
    }
}

export default GetUserFollowersReviewService;