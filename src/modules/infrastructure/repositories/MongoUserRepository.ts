import { Document, Model, Schema } from "mongoose";
import { IUserRepository } from "../../core/domain/interfaces/IUserRepository";
import { cinepickConnection } from "../../../database/database";
import { IUser } from "../../core/domain/entities/User";

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birth: { type: String, required: true },
    phone: { type: String, required: true },
    uid: { type: String },
    movieGender: { type: [String], required: false },
    movies: { type: [String], required: false, default: [] },
    active: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const UserModel = cinepickConnection.model<IUser>("User", UserSchema);

export class MongoUserRepository implements IUserRepository {
    private model: Model<IUser>;

    constructor() {
        this.model = UserModel;
    }

    async create(data: IUser): Promise<Document | null> {
        try {
            const user = new this.model(data);
            const createdUser = await user.save();
            return createdUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findByUid(uid: string): Promise<Document | null> {
        try {
            const user = await this.model.findOne({ uid });
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(uid: string, data: Partial<IUser>): Promise<Document | null> {
        try {
            const updatedUser = await this.model.findOneAndUpdate(
                { uid },
                data,
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async delete(uid: string): Promise<Document | null> {
        try {
            const deletedUser = await this.model.findOneAndUpdate(
                { uid },
                { active: false },
                { new: true }
            );
            return deletedUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async addMovies(uid: string, movies: string[]): Promise<Document | null> {
        try {
            const userWithMovies = await this.model.findOneAndUpdate(
                { uid },
                { movies },
                { new: true }
            );
            return userWithMovies;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getMovies(uid: string): Promise<Document | null> {
        try {
            const movies = await this.model
                .findOne({ uid })
                .select("movies");
            return movies;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async addGenres(uid: string, genres: string[]): Promise<Document | null> {
        try {
            const userWithGenres = await this.model.findOneAndUpdate(
                { uid },
                { movieGender: genres },
                { new: true }
            );
            return userWithGenres;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
} 