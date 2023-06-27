import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Utilizatori from "../models/utilizatoriModel.js";
import fs from "fs";

const router = express.Router();

// Endpoint pentru a obține toate utilizatorile
router.get("/utilizatori", async (req, res) => {
  try {
    const utilizatori = await Utilizatori.findAll();
    res.json(utilizatori);
  } catch (err) {
    console.error("Eroare la obținerea utilizatorilor:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea utilizatorilor" });
  }
});

// Endpoint pentru a obține un utilizator după ID
router.get("/utilizatori/:id", async (req, res) => {
  const idUtilizator = req.params.id;
  try {
    const utilizator = await Utilizatori.findByPk(idUtilizator);
    if (utilizator) {
      res.json(utilizator);
    } else {
      res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea utilizatorului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea utilizatorului" });
  }
});

const privateKey = "secret_key";
// Endpoint pentru autentificare
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const utilizator = await Utilizatori.findOne({
      where: { Email: email },
    });
    if (utilizator) {
      const isPasswordMatch = bcrypt.compareSync(password, utilizator.Parola);
      if (isPasswordMatch) {
        const token = jwt.sign(
          { userId: utilizator.ID_Utilizator },
          privateKey,
          {
            expiresIn: "1h",
          }
        );
        const user = {
          ID_Utilizator: utilizator.ID_Utilizator,
          Nume_utilizator: utilizator.Nume_utilizator,
          Nume: utilizator.Nume,
          Prenume: utilizator.Prenume,
          Email: utilizator.Email,
          Avatar: utilizator.Avatar,
          Tip_utilizator: utilizator.Tip_utilizator,
        };
        const response = {
          user,
          token,
        };
        res.status(200).json(response);
      } else {
        res.status(401).json({ message: "Email sau parolă greșită." });
      }
    } else {
      res.status(404).json({ error: "Email sau parolă greșită." });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Eroare la autentificare." });
  }
});

// Endpoint pentru a obține un utilizator după email
router.get("/utilizatori/getByEmail/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const utilizator = await Utilizatori.findOne({
      where: { Email: email },
    });
    if (utilizator) {
      res.json(utilizator);
    } else {
      res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea utilizatorului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea utilizatorului" });
  }
});

// Endpoint pentru a obține un utilizator după username
router.get("/utilizatori/getByUsername/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const utilizator = await Utilizatori.findOne({
      where: { Nume_utilizator: username },
    });
    if (utilizator) {
      res.json(utilizator);
    } else {
      res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la obținerea utilizatorului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la obținerea utilizatorului" });
  }
});

// Endpoint pentru a crea un utilizator nou
router.post("/register", async (req, res) => {
  const utilizatorData = req.body;
  try {
    const utilizatorNou = await Utilizatori.create(utilizatorData);
    res.status(201).json(utilizatorNou);
  } catch (err) {
    console.error("Eroare la crearea utilizatorului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la crearea utilizatorului" });
  }
});

// Endpoint pentru a actualiza un utilizator existent
router.put("/utilizatori/:id", async (req, res) => {
  const idUtilizator = req.params.id;
  const utilizatorData = req.body;
  try {
    const utilizator = await Utilizatori.findByPk(idUtilizator);
    if (utilizator) {
      await utilizator.update(utilizatorData);
      res.json(utilizator);
    } else {
      res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la actualizarea utilizatorului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la actualizarea utilizatorului" });
  }
});

//Verifica autenticitate token-ului
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Verifică dacă antetul este prezent și are prefixul "Bearer"
  console.log(authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extrage token-ul fără prefixul "Bearer"
    const token = authHeader.substring(7);
    console.log(token);
    if (token) {
      // Verifică și decodează token-ul utilizând cheia privată;
      jwt.verify(token, privateKey, { expiresIn: "1h" }, (err, decoded) => {
        if (err) {
          // Răspunde cu eroare 401 Unauthorized în cazul în care token-ul nu este valid
          console.error("Token not found", err);
          return res.sendStatus(401);
        }

        // Salvarea informațiilor despre utilizator în obiectul cererii
        req.user = decoded;
        next();
      });
    } else {
      // Răspunde cu eroare 401 Unauthorized dacă nu există token în antetul cererii
      console.log("nu am gasit token");
      res.sendStatus(401);
    }
  }
};

//Endpoint pentru a prelua informatii utilizatorului cu token
router.get("/getUserByToken", verifyJWT, async (req, res) => {
  // Accesează informațiile despre utilizator din obiectul cererii
  const userID = req.user.userId;
  try {
    console.log(userID);
    // Obține datele despre utilizator dintr-o bază de date sau sistem de autentificare
    const userData = await Utilizatori.findByPk(userID);
    if (userData) {
      // Returnează datele despre utilizator către client
       const user = {
          ID_Utilizator: userData.ID_Utilizator,
          Nume_utilizator: userData.Nume_utilizator,
          Nume: userData.Nume,
          Prenume: userData.Prenume,
          Email: userData.Email,
          Avatar: userData.Avatar,
          Tip_utilizator: userData.Tip_utilizator,
        };
      res.json(user);
    } else {
      // Răspunde cu eroare dacă nu se găsesc datele despre utilizator
      res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    }
  } catch (err) {
    res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
  }
});

// Endpoint pentru a șterge un utilizator existent
router.delete("/utilizatori/:id", async (req, res) => {
  const idUtilizator = req.params.id;
  try {
    const utilizator = await Utilizatori.findByPk(idUtilizator);
    if (utilizator) {
      await utilizator.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Utilizatorul nu a fost găsit" });
    }
  } catch (err) {
    console.error("Eroare la ștergerea utilizatorului:", err);
    res
      .status(500)
      .json({ error: "A apărut o eroare la ștergerea utilizatorului" });
  }
});

export default router;
