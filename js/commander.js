const baseCake = document.getElementById("base-cake");
const cakeContainer = document.getElementById("cake-container");
const cakeFavor = document.getElementById("cake-flavor");

const cakeImage = document.createElement("img");
cakeImage.id = "cake-image";
cakeContainer.appendChild(cakeImage);

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

cakeFavor.addEventListener("change", (event) => {
  const selectedFlavor = event.target.value;

  let flavorImageSrc = "";
  const selectedBase = baseCake.value;
  if (cakeImage.src) {
    switch (selectedFlavor) {
      case "vanille":
        if (selectedBase === "base_vanille") {
          flavorImageSrc = "./assets/images/base_vanille_glacage_vanille.png";
        } else if (selectedBase === "base_chocolat") {
          flavorImageSrc = "./assets/images/base_chocolat_glacage_vanille.png";
        }
        break;
      case "chocolat":
        if (selectedBase === "base_vanille") {
          flavorImageSrc = "./assets/images/base_vanille_glacage_chocolat.png";
        } else if (selectedBase === "base_chocolat") {
          flavorImageSrc = "./assets/images/base_chocolat_glacage_chocolat.png";
        }
        break;
      case "fraise":
        if (selectedBase === "base_vanille") {
          flavorImageSrc = "./assets/images/base_vanille_glacage_fraise.png";
        } else if (selectedBase === "base_chocolat") {
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
