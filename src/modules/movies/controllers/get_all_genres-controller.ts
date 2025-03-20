import { Request, Response } from "express";
const genreService = require("../services/genreService");

const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await genreService.getAllGenres();
        res.status(201).json(genres);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar gêneros"});
    }
};

module.exports = { getGenres };
