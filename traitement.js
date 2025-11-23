import http from "node:http";
import fs from "node:fs";

const PORT = 8001;
const HOSTNAME = "127.0.0.1";
const FILE = "./commandes.json";

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
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Serveur en fonctionnement");
});

// Démarrage du serveur
server.listen(PORT, HOSTNAME, () => {
  console.log(`Serveur en écoute sur http://${HOSTNAME}:${PORT}`);
});
