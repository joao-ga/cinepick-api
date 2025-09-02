import { Request, Response } from "express";
import UserFolloweesMoviesService from "../services/get-followees-movies-service";

export class UserFolloweesMoviesController {
  static async getFolloweesMovies(req: Request, res: Response) {
    try {
      const uid = String(req.query.uid || "").trim();
      if (!uid) {
        res.status(400).json({ message: "uid is required" });
      }

      const movies = await UserFolloweesMoviesService.getFolloweesMoviesEntities(uid);
      const limited = movies.slice(0, 20);

      res.status(200).json(limited);
    } catch (err: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserFolloweesMoviesController;
