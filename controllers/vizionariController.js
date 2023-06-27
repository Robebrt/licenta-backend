import express from "express";
import Vizionari from "../models/vizionariModel.js";
import Episoade from "../models/episoadeModel.js";

const router = express.Router();

// Endpoint pentru a obține toate vizionareele
router.get("/vizionari", async (req, res) => {
  try {
    const vizionari = await Vizionari.findAll();
    res.json(vizionari);
  } catch (err) {
    console.error("Eroare la obținerea vizionarilor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea vizionărilor" });
  }
});

// Endpoint pentru a obține toate vizionareele
router.get("/vizionari/getFalse", async (req, res) => {
  try {
    const vizionari = await Vizionari.findAll({
      where: { Vazut_complet: false },
    });
    res.json(vizionari);
  } catch (err) {
    console.error("Eroare la obținerea vizionarilor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea vizionărilor" });
  }
});

router.get("/vizionari/getBySerialID/:id", async (req, res) => {
  const serialID = req.params.id;
  try {
    const vizionari = await Vizionari.findAll({
      where: { ID_Serial: serialID },
    });
    res.json(vizionari);
  } catch (err) {
    console.error("Eroare la obținerea vizionarilor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea vizionărilor" });
  }
});


// Endpoint pentru a obține un vizionare după ID
router.get("/vizionari/:id", async (req, res) => {
  const idVizionare = req.params.id;
  try {
    const vizionare = await Vizionari.findByPk(idVizionare);
    if (vizionare) {
      res.json(vizionare);
    } else {
      res.status(404).json({ error: "Vizionarea nu a fost găsită" });
    }
  } catch (err) {
    console.error("Eroare la obținerea vizionării:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea vizionării" });
  }
});

// Endpoint pentru a obține un vizionare după id-ul user
router.get("/vizionari/getByUserID/:userID", async (req, res) => {
  const idUser = req.params.userID;
  try {
    const vizionari = await Vizionari.findAll({
      where: { ID_Utilizator: idUser },
    });
    if (vizionari) {
      const movies = [];
      vizionari.forEach((vizionare) => {
        if (vizionare.ID_Serial === null) {
          movies.push({
            movie_ID: vizionare.ID_Film,
            Data_vizionare: vizionare.Data_vizionare,
            Vazut_complet: vizionare.Vazut_complet,
            Preferat: vizionare.Preferat,
          });
        }
      });
      const serialeSiEpisoade = vizionari.reduce((acc, vizionare) => {
        if (vizionare.ID_Film === null && vizionare.ID_Episod !== null) {
          const { ID_Serial, ID_Episod } = vizionare;
          if (acc[ID_Serial]) {
            acc[ID_Serial].episoade.push(ID_Episod);
          } else {
            acc[ID_Serial] = {
              series_ID: vizionare.ID_Serial,
              Data_vizionare: vizionare.Data_vizionare,
              Vazut_complet: vizionare.Vazut_complet,
              Preferat: vizionare.Preferat,
              episoade: [ID_Episod],
            };
          }
        }
        return acc;
      }, {});
      const series = Object.values(serialeSiEpisoade);
      res.json({ movies, series });
    } else {
      res.status(404).json({ error: "Vizionarea nu a fost găsită" });
    }
  } catch (err) {
    console.error("Eroare la obținerea vizionării:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea vizionării" });
  }
});

// Endpoint pentru a crea un vizionare nouă tip film
router.post("/vizionari/movie", async (req, res) => {
  const vizionareData = req.body;
  try {
    const vizionareNou = await Vizionari.create(vizionareData);
    res.status(201).json(vizionareNou);
  } catch (err) {
    console.error("Eroare la crearea vizionării:", err);
    res.status(500).json({ error: "A apărut o eroare la crearea vizionării" });
  }
});

//Endpoint pentru a crea un vizionare nouă tip serial vazut complet
router.post("/vizionari/serial", async (req, res) => {
  const vizionareData = req.body;
  try {
    const episoade = await Episoade.findAll({
      where: { ID_Serial: vizionareData.ID_Serial },
    });
    if (episoade.length === 0) {
      res.status(404).json({ error: "Nu există episoade pentru acest serial" });
      return;
    }
    const vizionariNoi = await Promise.all(
      episoade.map(async (episod) => {
        const Data = {
          ID_Serial: vizionareData.ID_Serial,
          ID_Episod: episod.ID_Episod,
          ID_Utilizator: vizionareData.ID_Utilizator,
          Data_vizionare: vizionareData.Data_vizionare,
          Vazut_complet: true,
          Preferat: false,
        };
        return await Vizionari.create(Data);
      })
    );
    res.status(201).json(vizionariNoi);
  } catch (err) {
    console.error("Eroare la crearea vizionării:", err);
    res.status(500).json({ error: "A apărut o eroare la crearea vizionării" });
  }
});

//Endpoint pentru a crea un vizionare nouă tip serial in urmarire
router.post("/vizionari/serialOnWatch", async (req, res) => {
  const vizionareData = req.body;
  try {
    const vizionareNou = await Vizionari.create(vizionareData);
    res.status(201).json(vizionareNou);
  } catch (err) {
    console.error("Eroare la crearea vizionării:", err);
    res.status(500).json({ error: "A apărut o eroare la crearea vizionării" });
  }
});

// Endpoint pentru a actualiza un vizionare existentă
router.put("/vizionari/:id", async (req, res) => {
  const idVizionare = req.params.id;
  const vizionareData = req.body;
  try {
    const vizionare = await Vizionari.findByPk(idVizionare);
    if (vizionare) {
      await vizionare.update(vizionareData);
      res.json(vizionare);
    } else {
      res.status(404).json({ error: "Vizionarea nu a fost găsită" });
    }
  } catch (err) {
    console.error("Eroare la actualizarea vizionării:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la actualizarea vizionării" });
  }
});

// Endpoint pentru a actualiza un vizionare existentă dupa id-ul filmului
router.put("/vizionari/updateByMovieID/:idUser/:idFilm", async (req, res) => {
  const idFilm = req.params.idFilm;
  const idUser = req.params.idUser;
  const vizionareData = req.body;
  try {
    const vizionare = await Vizionari.findOne({
      where: {
        ID_Film: idFilm,
        ID_Utilizator: idUser,
      },
    });
    if (vizionare) {
      await vizionare.update(vizionareData);
      res.json(vizionare);
    } else {
      res.status(404).json({ error: "Vizionarea nu a fost găsită" });
    }
  } catch (err) {
    console.error("Eroare la actualizarea vizionării:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la actualizarea vizionării" });
  }
});

// Endpoint pentru a actualiza un vizionare existentă dupa id-ul serialului
router.put(
  "/vizionari/updateBySerialID/:idUser/:idSerial",
  async (req, res) => {
    const idSerial = req.params.idSerial;
    const idUser = req.params.idUser;
    const vizionareData = req.body;
    try {
      const vizionare = await Vizionari.findOne({
        where: {
          ID_Serial: idSerial,
          ID_Utilizator: idUser,
        },
      });
      if (vizionare) {
        await vizionare.update(vizionareData);
        res.json(vizionare);
      } else {
        res.status(404).json({ error: "Vizionarea nu a fost găsită" });
      }
    } catch (err) {
      console.error("Eroare la actualizarea vizionării:", err);
      res
        .status(500)
        .json({ error: "A apărut o eroare la actualizarea vizionării" });
    }
  }
);

// Endpoint pentru a șterge un vizionare existentă
router.delete("/vizionari/:id", async (req, res) => {
  const idVizionare = req.params.id;
  try {
    const vizionare = await Vizionari.findByPk(idVizionare);
    if (vizionare) {
      await vizionare.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Vizionarea nu a fost găsită" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea vizionării:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la ștergerea vizionării" });
  }
});

// Endpoint pentru a șterge un vizionare existentă prin id-ul filmului
router.delete("/vizionari/deleteByMovieID/:id", async (req, res) => {
  const idMovie = req.params.id;
  try {
    const vizionare = await Vizionari.findOne({
      where: { ID_Film: idMovie },
    });
    if (vizionare) {
      await vizionare.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Vizionarea nu a fost găsită" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea vizionării:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la ștergerea vizionării" });
  }
});

// Endpoint pentru a șterge un vizionare existentă prin id-ul serialului
router.delete("/vizionari/deleteBySerialID/:id", async (req, res) => {
  const idSerial = req.params.id;
  try {
    const vizionari = await Vizionari.findAll({
      where: { ID_Serial: idSerial },
    });
    if (vizionari) {
      for (const vizionare of vizionari) {
        await vizionare.destroy();
      }
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Vizionarea nu a fost găsită" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea vizionării:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la ștergerea vizionării" });
  }
});

export default router;
