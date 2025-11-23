import http from "node:http";
import fs from "node:fs";

const PORT = 8001;
const HOSTNAME = "127.0.0.1";
const FILE = "./commandes.json";

//  Simple Unique ID
function uniqueId() {
  return Date.now();
}

// lire le fichiers json
function readData() {
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

// Écrire dans le fichier JSON
function writeData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// Création du serveur HTTP
const server = http.createServer((req, res) => {
  // Allow ALL origins : CORS policy
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // respond to CORS preflight
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  // ---------------------------------------------
  // GET /commandes  -> Lire toutes les commandes
  // ---------------------------------------------
  if (req.method === "GET" && req.url === "/commandes") {
    const data = readData();
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(data));
  }

  // ------------------------------------------------
  // POST /commande  -> Créer une nouvelle commande
  // ------------------------------------------------
  else if (req.method === "POST" && req.url === "/commande") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let createdAt = new Date().toISOString();

      const newOrder = JSON.parse(body);
      newOrder.id = uniqueId();
      newOrder.date = createdAt;

      // calcul du prix total
      let totalPrice = 0;
      let prixBase = newOrder.base === "chocolat" ? 11 : 10;
      let prixGlacage = newOrder.glacage ? 3 : 0;
      let prixCreme = newOrder.creme === "oui" ? 2 : 0;
      let prixCerise = newOrder.cerise === "oui" ? 1 : 0;

      totalPrice = prixBase + prixGlacage + prixCreme + prixCerise;

      newOrder.prixTotal = totalPrice;

      const data = readData();

      data.push(newOrder);
      writeData(data);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Commande ajoutée avec succès" }));
      return;
    });
  }

  // -------------------------------------------------------------
  // DELETE /commande/:id  -> Supprimer une commande existante
  // -------------------------------------------------------------
  else if (req.method === "DELETE") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    const urlArray = req.url.split("/");
    const id = urlArray[urlArray.length - 1];

    const data = readData();

    // filtrage pour supprimer la commande avec id
    const filteredData = data.filter((c) => c.id != id);

    if (filteredData.length === data.length) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Commande introuvable" }));
      return;
    }

    writeData(filteredData);

    res.end(JSON.stringify({ message: "Commande supprimée" }));
    return;
  } else {
    // Route inconnue
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Route non trouvée" }));
    return;
  }
});

// Démarrage du serveur
server.listen(PORT, HOSTNAME, () => {
  console.log(`Serveur en écoute sur http://${HOSTNAME}:${PORT}`);
});
