import express from "express";
import Comentariu from "../models/comentariiModel.js";
import Apreciere from "../models/aprecieriModel.js";
const router = express.Router();

// Endpoint pentru a obține toate comentariile
router.get("/comentarii", async (req, res) => {
  try {
    const comentarii = await Comentariu.findAll();
    res.json(comentarii);
  } catch (err) {
    console.error("Eroare la obținerea comentariilor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea comentariilor" });
  }
});

// Endpoint pentru a obține un comentariu după ID
router.get("/comentarii/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const comentariu = await Comentariu.findByPk(id);
    if (comentariu) {
      res.json(comentariu);
    } else {
      res.status(404).json({ error: "Comentariul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea comentariului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea comentariului" });
  }
});

// Endpoint pentru a obține comentariile unui film
router.get("/comentarii/getByMovieID/:id", async (req, res) => {
  const movieID = req.params.id;
  try {
    const comentarii = await Comentariu.findAll({
      where: { ID_Film: movieID },
    });
    if (comentarii) {
      res.json(comentarii);
    } else {
      res.status(404).json({ error: "Comentariile nu a fost găsite" });
    }
  } catch (err) {
    console.error("Eroare la obținerea comentariilor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea comentariilor" });
  }
});

//Endpoint pentru a obține comentariile unui serial
router.get("/comentarii/getBySerialID/:id", async (req, res) => {
  const serialID = req.params.id;
  try {
    const comentarii = await Comentariu.findAll({
      where: { ID_Serial: serialID },
    });
    if (comentarii) {
      res.json(comentarii);
    } else {
      res.status(404).json({ error: "Comentariul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea comentariului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea comentariului" });
  }
});

// Endpoint pentru a crea un comentariu nou
router.post("/comentarii", async (req, res) => {
  const comentariuData = req.body;
  try {
    const comentariuNou = await Comentariu.create(comentariuData);
    res.status(201).json(comentariuNou);
  } catch (err) {
    console.error("Eroare la crearea comentariului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la crearea comentariului" });
  }
});

// Endpoint pentru a actualiza un comentariu existent
router.put("/comentarii/:id", async (req, res) => {
  const id = req.params.id;
  const comentariuData = req.body;

  try {
    const comentariu = await Comentariu.findByPk(id);
    if (comentariu) {
      await comentariu.update(comentariuData);
      res.json(comentariu);
    } else {
      res.status(404).json({ error: "Comentariul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la actualizarea comentariului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la actualizarea comentariului" });
  }
});

// Endpoint pentru a șterge un comentariu existent
router.delete("/comentarii/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const comentariu = await Comentariu.findByPk(id);
    if (comentariu) {
      await Apreciere.destroy({
        where: {
          ID_Comentariu: comentariu.ID_Comentariu
        }
      });
      await comentariu.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Comentariul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea comentariului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la ștergerea comentariului" });
  }
});

export default router;
