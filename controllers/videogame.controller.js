import { Videogame } from "../models/Videogame.js";

export const getVideogames = async (req, res) => {
  try {
    const videogames = await Videogame.find();

    return res.json( videogames );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const getVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const videogame = await Videogame.findById(id);

    if (!videogame)
      return res.status(404).json({ error: "Videojuego no existente" });

    return res.json({ videogame });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const createVideogame = async (req, res) => {
  try {
    let {
      title,
      description,
      gender,
      developer,
      platform,
      releaseDate,
      gameMode,
      price,
      score
    } = req.body;

    const videogame = new Videogame({
      title,
      description,
      gender,
      developer,
      platform,
      releaseDate,
      gameMode,
      price,
      score
    });
    const newVideogame = await videogame.save();

    return res.status(201).json({ newVideogame });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const removeVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const videogame = await Videogame.findById(id);

    if (!videogame)
      return res.status(404).json({ error: "Videojuego no existente" });

    await videogame.deleteOne({id: videogame.id});
    return res.json({ videogame });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const updateVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      gender,
      developer,
      platform,
      releaseDate,
      gameMode,
      price,
      score,
    } = req.body;

    const videogame = await Videogame.findById(id);

    if (!videogame)
      return res.status(404).json({ error: "Videojuego no existente" });

    videogame.title = title;
    videogame.description = description;
    videogame.gender = gender;
    videogame.developer = developer;
    videogame.platform = platform;
    videogame.releaseDate = releaseDate;
    videogame.gameMode = gameMode;
    videogame.price = price;
    videogame.score = score;

    await videogame.save();

    return res.json({ videogame });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};
