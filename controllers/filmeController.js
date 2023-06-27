import express from "express";
import Filme from "../models/filmeModel.js";

const router = express.Router();

// Endpoint pentru a obține toate filmele
router.get("/filme", async (req, res) => {
  try {
    const filme = await Filme.findAll();
    res.json(filme);
  } catch (err) {
    console.error("Eroare la obținerea filmelor:", err);
    res.status(500).json({ error: "A apărut o eroare la obținerea filmelor" });
  }
});

// Endpoint pentru a obține un film după ID
router.get("/filme/:id", async (req, res) => {
  const idFilm = req.params.id;
  try {
    const film = await Filme.findByPk(idFilm);
    if (film) {
      res.json(film);
    } else {
      res.status(404).json({ error: "Filmul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea filmului:", err);
    res.status(500).json({ error: "A apărut o eroare la obținerea filmului" });
  }
});

// Endpoint pentru a crea un film nou
router.post("/filme", async (req, res) => {
  const filmData = req.body;
  try {
    const filmNou = await Filme.create(filmData);
    res.status(201).json(filmNou);
  } catch (err) {
    console.error("Eroare la crearea filmului:", err);
    res.status(500).json({ error: "A apărut o eroare la crearea filmului" });
  }
});

// Endpoint pentru a actualiza un film existent
router.put("/filme/:id", async (req, res) => {
  const idFilm = req.params.id;
  const filmData = req.body;
  try {
    const film = await Filme.findByPk(idFilm);
    if (film) {
      await film.update(filmData);
      res.json(film);
    } else {
      res.status(404).json({ error: "Filmul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la actualizarea filmului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la actualizarea filmului" });
  }
});

// Endpoint pentru a șterge un film existent
router.delete("/filme/:id", async (req, res) => {
  const idFilm = req.params.id;
  try {
    const film = await Filme.findByPk(idFilm);
    if (film) {
      await film.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Filmul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea filmului:", err);
    res.status(500).json({ error: "A apărut o eroare la ștergerea filmului" });
  }
});

export default router;
