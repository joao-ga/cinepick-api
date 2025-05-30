import { Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import { IUser } from "../../core/domain/entities/User";

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body as IUser;
            const user = await this.service.createUser(userData);

            if (user) {
                res.status(201).json(user);
            } else {
                res.status(400).json({ message: "Erro ao criar usuário" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const uid = req.params.uid;
            const user = await this.service.getUser(uid);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const uid = req.params.uid;
            const userData = req.body as Partial<IUser>;
            const user = await this.service.updateUser(uid, userData);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const uid = req.params.uid;
            const user = await this.service.deleteUser(uid);

            if (user) {
                res.status(200).json({ message: "Usuário desativado com sucesso" });
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async addMovies(req: Request, res: Response): Promise<void> {
        try {
            const uid = req.params.uid;
            const movies = req.body.movies as string[];
            const user = await this.service.addMovies(uid, movies);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "Erro ao adicionar filmes" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async getUserMovies(req: Request, res: Response): Promise<void> {
        try {
            const uid = req.params.uid;
            const movies = await this.service.getUserMovies(uid);

            if (movies) {
                res.status(200).json(movies);
            } else {
                res.status(404).json({ message: "Filmes não encontrados" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async addGenres(req: Request, res: Response): Promise<void> {
        try {
            const uid = req.params.uid;
            const genres = req.body.genres as string[];
            const user = await this.service.addGenres(uid, genres);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "Erro ao adicionar gêneros" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
} 