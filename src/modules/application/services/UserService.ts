import { Document } from "mongoose";
import { IUserRepository } from "../../core/domain/interfaces/IUserRepository";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { IUser } from "../../core/domain/entities/User";

// Observer Pattern
interface UserObserver {
    update(user: IUser): void;
}

class UserActivityLogger implements UserObserver {
    update(user: IUser): void {
        console.log(`User activity: ${user.name} (${user.uid}) - ${new Date().toISOString()}`);
    }
}

class UserMetricsCollector implements UserObserver {
    update(user: IUser): void {
        console.log(`Collecting metrics for user ${user.uid}: Movies: ${user.movies?.length}, Genres: ${user.movieGender?.length}`);
    }
}

// Factory Pattern
export class UserRepositoryFactory {
    static createRepository(): IUserRepository {
        return new MongoUserRepository();
    }
}

export class UserService {
    private repository: IUserRepository;
    private observers: UserObserver[] = [];

    constructor() {
        this.repository = UserRepositoryFactory.createRepository();
        this.addObserver(new UserActivityLogger());
        this.addObserver(new UserMetricsCollector());
    }

    addObserver(observer: UserObserver): void {
        this.observers.push(observer);
    }

    private notifyObservers(user: IUser): void {
        this.observers.forEach(observer => observer.update(user));
    }

    async createUser(userData: IUser): Promise<Document | null> {
        try {
            const user = await this.repository.create(userData);
            if (user) {
                this.notifyObservers(userData);
            }
            return user;
        } catch (error) {
            console.error("Error in createUser:", error);
            return null;
        }
    }

    async getUser(uid: string): Promise<Document | null> {
        try {
            return await this.repository.findByUid(uid);
        } catch (error) {
            console.error("Error in getUser:", error);
            return null;
        }
    }

    async updateUser(uid: string, userData: Partial<IUser>): Promise<Document | null> {
        try {
            const user = await this.repository.update(uid, userData);
            if (user) {
                this.notifyObservers(user as unknown as IUser);
            }
            return user;
        } catch (error) {
            console.error("Error in updateUser:", error);
            return null;
        }
    }

    async deleteUser(uid: string): Promise<Document | null> {
        try {
            const user = await this.repository.delete(uid);
            if (user) {
                this.notifyObservers(user as unknown as IUser);
            }
            return user;
        } catch (error) {
            console.error("Error in deleteUser:", error);
            return null;
        }
    }

    async addMovies(uid: string, movies: string[]): Promise<Document | null> {
        try {
            const user = await this.repository.addMovies(uid, movies);
            if (user) {
                this.notifyObservers(user as unknown as IUser);
            }
            return user;
        } catch (error) {
            console.error("Error in addMovies:", error);
            return null;
        }
    }

    async getUserMovies(uid: string): Promise<Document | null> {
        try {
            return await this.repository.getMovies(uid);
        } catch (error) {
            console.error("Error in getUserMovies:", error);
            return null;
        }
    }

    async addGenres(uid: string, genres: string[]): Promise<Document | null> {
        try {
            const user = await this.repository.addGenres(uid, genres);
            if (user) {
                this.notifyObservers(user as unknown as IUser);
            }
            return user;
        } catch (error) {
            console.error("Error in addGenres:", error);
            return null;
        }
    }
} 