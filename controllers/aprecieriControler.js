import express from "express";
import Apreciere from "../models/aprecieriModel.js";
import Comentariu from "../models/comentariiModel.js";

const router = express.Router();

// Endpoint pentru a adăuga o apreciere la un comentariu
router.post("/comentarii/:idComentariu/aprecieri", async (req, res) => {
  const idComentariu = req.params.idComentariu;
  const idUtilizator = req.body.idUtilizator; // Înlocuiește cu metoda de preluare a ID-ului utilizatorului

  try {
    const comentariu = await Comentariu.findByPk(idComentariu);
    if (!comentariu) {
      return res.status(404).json({ error: "Comentariul nu a fost găsit" });
    }

    const apreciere = await Apreciere.create({
      ID_Comentariu: idComentariu,
      ID_Utilizator: idUtilizator,
    });

    res.json(apreciere);
  } catch (err) {
    console.error("Eroare la adăugarea aprecierii:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la adăugarea aprecierii" });
  }
});

// Endpoint pentru a obține aprecierile unui comentariu
router.get("/comentarii/:idComentariu/aprecieri", async (req, res) => {
  const idComentariu = req.params.idComentariu;

  try {
    const comentariu = await Comentariu.findByPk(idComentariu);
    if (!comentariu) {
      return res.status(404).json({ error: "Comentariul nu a fost găsit" });
    }

    const aprecieri = await Apreciere.findAll({
      where: { ID_Comentariu: idComentariu },
    });

    res.json(aprecieri);
  } catch (err) {
    console.error("Eroare la obținerea aprecierilor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea aprecierilor" });
  }
});

// Endpoint pentru a șterge o apreciere asociată unui comentariu
router.delete(
  "/comentarii/:idComentariu/aprecieri/:idApreciere",
  async (req, res) => {
    const idComentariu = req.params.idComentariu;
    const idApreciere = req.params.idApreciere;

    try {
      const comentariu = await Comentariu.findByPk(idComentariu);
      if (!comentariu) {
        return res.status(404).json({ error: "Comentariul nu a fost găsit" });
      }

      const apreciere = await Apreciere.findByPk(idApreciere);
      if (!apreciere) {
        return res.status(404).json({ error: "Aprecierul nu a fost găsit" });
      }

      await apreciere.destroy();
      res.sendStatus(204);
    } catch (err) {
      console.error("Eroare la ștergerea aprecierii:", err);
      res
        .status(500)
        .json({ error: "A apărut o eroare la ștergerea aprecierii" });
    }
  }
);

export default router;
