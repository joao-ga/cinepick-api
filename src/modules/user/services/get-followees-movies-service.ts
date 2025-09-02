import mongoose from "mongoose";
import { Follow } from "../../follows/entities/follow-entity";
import { User } from "../entities/user-entity";
import { Movie } from "../../movies/entities/movie-entity";

export class UserFolloweesMoviesService {
  static async getFolloweesUid(followerUid: string): Promise<string[]> {
    const uid = String(followerUid || "").trim();
    if (!uid) return [];

    const follower = await User.findOne({ uid, active: true }).select("uid").lean();
    if (!follower) return [];

    const follows = await Follow.find({ follower_id: uid })
      .select("followee_id -_id")
      .lean();

    const followeeUids = follows
      .map((f: any) => f.followee_id as string)
      .filter(Boolean);

    return Array.from(new Set(followeeUids));
  }

  static async getFolloweesWithSharedGenres(followerUid: string): Promise<string[]> {
    const uid = String(followerUid || "").trim();
    if (!uid) return [];

    const follower = await User.findOne({ uid, active: true })
      .select("uid movieGender")
      .lean();
    if (!follower) return [];

    const followerGenres: string[] = Array.isArray(follower.movieGender)
      ? (follower.movieGender as string[])
      : [];
    if (followerGenres.length === 0) return [];

    const followeeUids = await this.getFolloweesUid(uid);
    if (followeeUids.length === 0) return [];

    const matchedFollowees = await User.find({
      uid: { $in: followeeUids },
      active: true,
      movieGender: { $elemMatch: { $in: followerGenres } },
    })
      .select("uid -_id")
      .lean();

    return matchedFollowees.map((u: any) => u.uid as string).filter(Boolean);
  }

  static async getLikedMoviesOfFollowees(followeeUids: string[]): Promise<string[]> {
    const uids = Array.isArray(followeeUids) ? followeeUids.filter(Boolean) : [];
    if (uids.length === 0) return [];

    const users = await User.find({ uid: { $in: uids }, active: true })
      .select("movies -_id")
      .lean();

    const allMovies = users
      .flatMap((u: any) => Array.isArray(u.movies) ? (u.movies as string[]) : [])
      .filter(Boolean);

    return Array.from(new Set(allMovies));
  }

  static async getFolloweesMoviesEntities(followerUid: string) {
    const followees = await this.getFolloweesWithSharedGenres(followerUid);
    if (followees.length === 0) return [];

    const likedIds = await this.getLikedMoviesOfFollowees(followees);
    if (likedIds.length === 0) return [];

    const objectIds: mongoose.Types.ObjectId[] = [];
    const titles: string[] = [];
    for (const v of likedIds) {
      if (mongoose.isValidObjectId(v)) objectIds.push(new mongoose.Types.ObjectId(v));
      else titles.push(v);
    }

    const query: any = { $or: [] as any[] };
    if (objectIds.length) query.$or.push({ _id: { $in: objectIds } });
    if (titles.length) query.$or.push({ title: { $in: titles } });
    if (query.$or.length === 0) return [];

    return Movie.find(query)
      .select("_id fullplot title poster genres runtime imdb")
      .limit(20)
      .lean();
  }
}

export default UserFolloweesMoviesService;
