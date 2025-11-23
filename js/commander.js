const baseCake = document.getElementById("base-cake");
const cakeContainer = document.getElementById("cake-position-container");
const cakeFavor = document.getElementById("cake-flavor");
const creamCheckbox = document.getElementById("whipped-cream");
const cherryCheckbox = document.getElementById("cherry");
const resetBtn = document.getElementById("reset-btn");
const orderForm = document.getElementById("order-form");

// Création de l'élément image pour le gâteau
const cakeImage = document.createElement("img");
cakeImage.id = "cake-image";
cakeContainer.appendChild(cakeImage);

// Met à jour l'image du gâteau en fonction de la base
baseCake.addEventListener("change", (event) => {
  const selectedBase = event.target.value;

  let baseImageSrc = "";
  switch (selectedBase) {
    case "vanille":
      baseImageSrc = "./assets/images/base_vanille.png";
      break;
    case "chocolat":
      baseImageSrc = "./assets/images/base_chocolat.png";
      break;
  }
  cakeImage.src = baseImageSrc;
  cakeImage.alt = `Base de gâteau ${selectedBase}`;
});

//  Met à jour l'image du gâteau en fonction de la saveur du glaçage
cakeFavor.addEventListener("change", (event) => {
  const selectedFlavor = event.target.value;

  let flavorImageSrc = "";
  const selectedBase = baseCake.value;
  if (cakeImage.src) {
    switch (selectedFlavor) {
      case "vanille":
        if (selectedBase === "vanille") {
          flavorImageSrc = "./assets/images/base_vanille_glacage_vanille.png";
        } else if (selectedBase === "chocolat") {
          flavorImageSrc = "./assets/images/base_chocolat_glacage_vanille.png";
        }
        break;
      case "chocolat":
        if (selectedBase === "vanille") {
          flavorImageSrc = "./assets/images/base_vanille_glacage_chocolat.png";
        } else if (selectedBase === "chocolat") {
          flavorImageSrc = "./assets/images/base_chocolat_glacage_chocolat.png";
        }
        break;
      case "fraise":
        if (selectedBase === "vanille") {
          flavorImageSrc = "./assets/images/base_vanille_glacage_fraise.png";
        } else if (selectedBase === "chocolat") {
          flavorImageSrc = "./assets/images/base_chocolat_glacage_fraise.png";
        }
        break;
    }
    if (flavorImageSrc) {
      cakeImage.src = flavorImageSrc;
      cakeImage.alt = `Gâteau avec base ${selectedBase} et glaçage ${selectedFlavor}`;
    } else {
      alert(
        "La saveur sélectionnée n'est pas disponible pour la base choisie."
      );
      cakeFavor.value = "";
      return;
    }
  } else {
    alert("Veuillez d'abord sélectionner une base de gâteau.");
    cakeFavor.value = "";
    return;
  }
});

// Création de l'élément image pour la crème fouettée
const creamImg = document.createElement("img");
creamImg.src = "./assets/images/creme_fouettee.png";
creamImg.id = "cream-image";

// ajout ou suppression de la crème fouettée
creamCheckbox.addEventListener("change", () => {
  const selectedBase = baseCake.value;
  if (creamCheckbox.checked) {
    if (selectedBase === "") {
      alert("Veuillez d'abord sélectionner une base de gâteau.");
      creamCheckbox.checked = false;
      return;
    }
    cakeContainer.style.position = "relative";
    creamImg.style.position = "absolute";
    creamImg.style.top = "0";
    // creamImg.style.left = "0";
    creamImg.style.display = "block";
    creamImg.style.width = "100px";
    creamImg.style.height = "100px";
    cakeContainer.appendChild(creamImg);
  } else {
    creamImg.style.display = "none";
  }
});

// Création de l'élément image pour la cerise
const cherryImg = document.createElement("img");
cherryImg.src = "./assets/images/cerise.png";
cherryImg.id = "cherry-image";

// ajout ou suppression de la cerise
cherryCheckbox.addEventListener("change", () => {
  const selectedBase = baseCake.value;
  if (cherryCheckbox.checked) {
    if (selectedBase === "") {
      alert("Veuillez d'abord sélectionner une base de gâteau.");
      cherryCheckbox.checked = false;
      return;
    }

    cakeContainer.style.position = "relative";
    cherryImg.style.position = "absolute";
    cherryImg.style.top = "-5px";
    cherryImg.style.zIndex = "1";
    cherryImg.style.display = "block";
    cherryImg.style.width = "50px";
    cherryImg.style.height = "50px";
    cakeContainer.appendChild(cherryImg);
  } else {
    cherryImg.style.display = "none";
  }
});

// Réinitialisation du formulaire et de l'image du gâteau
resetBtn.addEventListener("click", () => {
  cakeImage.src = "";
  cakeImage.alt = "";
  creamImg.style.display = "none";
  cherryImg.style.display = "none";
});

// Gestion de la soumission du formulaire
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);

  const commande = {
    base: formData.get("base"),
    glacage: formData.get("glacage"),
    creme: formData.get("creme") ? "oui" : "non",
    cerise: formData.get("cerise") ? "oui" : "non",
    nom: formData.get("nom"),
    adresse: formData.get("adresse"),
  };

  console.log("Commande créée :", commande);

  alert("Votre commande a été enregistrée avec succès !");
  orderForm.reset();
  cakeImage.src = "";
  cakeImage.alt = "";
  creamImg.style.display = "none";
  cherryImg.style.display = "none";
});
