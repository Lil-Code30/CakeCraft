const baseCake = document.getElementById("base-cake");
const cakeContainer = document.getElementById("cake-container");

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
