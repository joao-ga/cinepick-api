const { getDatabase } = require("../../config/database");

const getAllGenres = async () => {
    const db = await getDatabase();
    const genres = await db.collection("movies").distinct("genres");
    return genres;
};

module.exports = { getAllGenres };
