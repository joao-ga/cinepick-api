import { Router } from "express";

const router = Router();
const genreController = require("../controllers/genreController");

router.get("/getallgenres", genreController.getGenres);

export default router;
