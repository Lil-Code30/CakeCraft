import http from "node:http";
import fs from "node:fs";

const PORT = 8001;
const HOSTNAME = "127.0.0.1";

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
