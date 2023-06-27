import express from "express";
import Episoade from "../models/episoadeModel.js";

const router = express.Router();

// Endpoint pentru a obține toate episoadele unui serial
router.get("/seriale/:idserial/episoade", async (req, res) => {
  const idserial = req.params.idserial;
  try {
    const episoade = await Episoade.findAll({
      where: { ID_Serial: idserial },
    });
    res.json(episoade);
  } catch (err) {
    console.error("Eroare la obținerea episoadelor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea episoadelor" });
  }
});

// Endpoint pentru a obține un episod după ID
router.get("/episoade/:idepisod", async (req, res) => {
  const idepisod = req.params.idepisod;
  try {
    const episod = await Episoade.findByPk(idepisod);
    if (episod) {
      res.json(episod);
    } else {
      res.status(404).json({ error: "Episodul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea episodului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea episodului" });
  }
});

// Endpoint pentru a crea un episod nou pentru un serial
router.post("/seriale/:idserial/episoade", async (req, res) => {
  const idserial = req.params.idserial;
  const episodData = req.body;
  episodData.ID_Serial = idserial;

  try {
    const episodNou = await Episoade.create(episodData);
    res.status(201).json(episodNou);
  } catch (err) {
    console.error("Eroare la crearea episodului:", err);
    res.status(500).json({ error: "A apărut o eroare la crearea episodului" });
  }
});

// Endpoint pentru a actualiza un episod existent
router.put("/episoade/:idepisod", async (req, res) => {
  const idepisod = req.params.idepisod;
  const episodData = req.body;

  try {
    const episod = await Episoade.findByPk(idepisod);
    if (episod) {
      await episod.update(episodData);
      res.json(episod);
    } else {
      res.status(404).json({ error: "Episodul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la actualizarea episodului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la actualizarea episodului" });
  }
});

// Endpoint pentru a șterge un episod existent
router.delete("/episoade/:idepisod", async (req, res) => {
  const idepisod = req.params.idepisod;

  try {
    const episod = await Episoade.findByPk(idepisod);
    if (episod) {
      await episod.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Episodul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea episodului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la ștergerea episodului" });
  }
});

export default router;