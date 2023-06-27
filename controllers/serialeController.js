import express from "express";
import Seriale from "../models/serialeModel.js";

const router = express.Router();

// Endpoint pentru a obține toate serialele
router.get("/seriale", async (req, res) => {
  try {
    const seriale = await Seriale.findAll();
    res.json(seriale);
  } catch (err) {
    console.error("Eroare la obținerea serialelor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea serialelor" });
  }
});

// Endpoint pentru a obține un serial după ID
router.get("/seriale/:id", async (req, res) => {
  const idserial = req.params.id;
  try {
    const serial = await Seriale.findByPk(idserial);
    if (serial) {
      res.json(serial);
    } else {
      res.status(404).json({ error: "serialul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea serialului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea serialului" });
  }
});

// Endpoint pentru a crea un serial nou
router.post("/seriale", async (req, res) => {
  const serialData = req.body;
  try {
    const serialNou = await Seriale.create(serialData);
    res.status(201).json(serialNou);
  } catch (err) {
    console.error("Eroare la crearea serialului:", err);
    res.status(500).json({ error: "A apărut o eroare la crearea serialului" });
  }
});

// Endpoint pentru a actualiza un serial existent
router.put("/seriale/:id", async (req, res) => {
  const idserial = req.params.id;
  const serialData = req.body;
  try {
    const serial = await Seriale.findByPk(idserial);
    if (serial) {
      await serial.update(serialData);
      res.json(serial);
    } else {
      res.status(404).json({ error: "serialul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la actualizarea serialului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la actualizarea serialului" });
  }
});

// Endpoint pentru a șterge un serial existent
router.delete("/seriale/:id", async (req, res) => {
  const idserial = req.params.id;
  try {
    const serial = await Seriale.findByPk(idserial);
    if (serial) {
      await serial.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "serialul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea serialului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la ștergerea serialului" });
  }
});

export default router;
