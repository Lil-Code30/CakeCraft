# 🍰 CakeCraft – Site Web de Personnalisation et Commande de Gâteaux

Projet – Introduction à l’Internet (INF16107)
Travail Pratique 2

## 📌 Description du projet

**CakeCraft** est une application web basique, responsive et interactive permettant aux utilisateurs de **personnaliser un gâteau**, **passer une commande**, puis **consulter l’historique des commandes**.
Les commandes sont enregistrées dans un fichier JSON à l’aide d’un serveur Node.js minimaliste, ce qui assure une **persistance des données**.

Ce projet a été réalisé dans le cadre du **TP2 du cours INF16107**.

---

## 🎯 Objectifs pédagogiques

Ce travail vise à nous familiariser avec :

- Les interactions dynamiques avec **JavaScript**
- La programmation côté serveur avec **Node.js**
- L'utilisation avancée d’un framework CSS : **Bootstrap 5**
- La communication client/serveur (GET, POST, DELETE)
- La gestion d’un fichier JSON pour stocker les commandes (sans base de données)

---

## 🧰 Technologies utilisées

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap 5** (CDN)
- **Font Awesome** (CDN)

### Backend

- **Node.js** (sans base de données)
- Gestion d’un fichier JSON `commandes.json`

### Outils

- Visual Studio Code
- Node.js Runtime

---

## 📂 Structure du projet

```
CakeCraft/
│── index.html
│── commande.html
│── historique.html
│── traitement.js
│── commandes.json
│
├── images/
│   └── (images des ingrédients du gâteau)
│
├── scripts/
│   ├── main.js
│   ├── commande.js
│   └── historique.js
│
└── styles/
    └── style.css (optionnel)
```

---

## 🖥️ Fonctionnalités

### ✔ Barre de navigation (présente sur toutes les pages)

- Accueil
- Commande en ligne
- Historique des commandes

### ✔ Footer

- Icônes de réseaux sociaux (Font Awesome)
- Adresse du commerce

---

## 🏠 Page Accueil

- Image de fond en plein écran
- Texte descriptif du commerce
- Bouton **Commander en ligne** menant à la page de commande

---

## 🎂 Page Commande en ligne

### Le formulaire permet de sélectionner :

- Base du gâteau :

  - Vanille
  - Chocolat

- Glaçage :

  - Vanille
  - Chocolat
  - Fraise

- Suppléments :

  - Crème fouettée
  - Cerise

### Informations acheteur :

- Nom
- Adresse

### Actions :

- **Commander** → Envoi des données au backend (POST /commande)
- **Annuler** → Réinitialise le formulaire et vide la zone de personnalisation

### Dynamique du gâteau (JavaScript)

- À chaque changement, une image est ajoutée/retirée
- Gestion via `onchange` et `onclick`
- Construction visuelle du gâteau dans une zone dédiée

---

## 🗃️ Page Historique des commandes

- Récupère les commandes depuis `/commandes` (GET)
- Affiche chaque commande dans une **carte Bootstrap** avec :

  - Base
  - Glaçage
  - Suppléments
  - Prix (si bonus activé)
  - Nom
  - Adresse

- Bouton **Supprimer** → Envoie une requête DELETE vers `/commande/:id`

---

## 🔌 Backend – Node.js

Les routes obligatoires :

### GET – Récupérer toutes les commandes

`GET /commandes`

### POST – Ajouter une commande

`POST /commande`

- Génère un ID unique
- Ajoute la commande dans `commandes.json`

### DELETE – Supprimer une commande

`DELETE /commande/:id`

Le fichier JSON ressemble à :

```json
[
  {
    "id": 1,
    "base": "vanille",
    "glacage": "chocolat",
    "creme": "oui",
    "cerise": "non",
    "date": "2025-10-20T14:30:00.000Z",
    "nom": "Pierre Martin",
    "adresse": "1595 boulevard Alphonse-Desjardins, Lévis"
  }
]
```

---

## 💰 Bonus (optionnel – 2 points)

Ajout d’un système de **prix dynamique** :

- Base vanille : 10$
- Base chocolat : 11$
- Glaçage : +3$
- Crème fouettée : +2$
- Cerise : +1$

Le prix total est ajouté à la commande dans `commandes.json`.

---

## 🎥 Vidéo démonstrative

Une courte vidéo doit être fournie montrant :

- Navigation
- Personnalisation d’un gâteau
- Soumission d’une commande
- Affichage dans l’historique
- Suppression

---

## 👥 Équipe

Projet réalisé par :

- **Loko Ismaël**
- **Ayassou Joseph Kossivi Loic**

---

## 📅 Date de remise

**9 décembre 2025 – 23h59**

---
