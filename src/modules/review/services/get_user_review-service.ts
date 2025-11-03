import { Review } from "../entities/review-entity";
import { User } from "../../user/entities/user-entity";
import { Document } from "mongoose";
import { Movie } from "../../movies/entities/movie-entity";

interface IUserReview {
    uid: string;
}

class GetUserReviewService {
    async getUserReview(data: IUserReview): Promise<any[] | null> {
        const uid = data.uid;

        try {
            const user = await User.findOne({ uid: uid }).lean();

            if(!user) {
                console.error("[getUserReview] Usuário não encontrado para uid:", uid);
                return null;
            }

            const userHasReview = await this.getIfUserHasReview(uid);

            if(!userHasReview) {
                console.error("[getUserReview] Usuário não tem avaliação. uid:", uid);
                return null;
            }

            const reviews = await Review.find({ user_uid: uid }).lean();

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
                    uid,
                    user_name: user.name,
                    title: movie.title ?? null,
                    poster: movie.poster ?? null
                };
                return enriched;
            });

            return reviewsWithName;
        } catch (error) {
            return null;
        }
    }

    private async getIfUserHasReview(uid: string): Promise<boolean> {
        const review = await Review.findOne({ user_uid: uid });
        const has = Boolean(review);
        if(review) {
            return true;
        } else {
            return false;
        }
    }
}

export default GetUserReviewService;