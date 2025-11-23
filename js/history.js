document.addEventListener("DOMContentLoaded", async () => {
  const ordersRow = document.getElementById("ordersRow");
  const noOrders = document.getElementById("no-orders");

  let allOrders;

  try {
    const response = await fetch("http://127.0.0.1:8001/commandes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    allOrders = await response.json();
    // console.log(allOrders);

    function createCard(order) {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4";

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm order-card";

      // Card Header
      const header = document.createElement("div");
      header.className =
        "order-card-header d-flex align-items-center justify-content-between";

      const left = document.createElement("div");
      left.className = "d-flex align-items-center gap-3";

      const thumb = document.createElement("div");
      thumb.className = "order-thumb";
      thumb.textContent = "🎂";

      const hTitle = document.createElement("div");
      const t1 = document.createElement("div");
      t1.className = "caveat-brush-regular";
      t1.textContent = order.nom;
      const t2 = document.createElement("div");
      t2.className = "text-muted small";
      t2.textContent = order.date.split("T")[0];

      hTitle.appendChild(t1);
      hTitle.appendChild(t2);

      left.appendChild(thumb);
      left.appendChild(hTitle);

      const priceBadge = document.createElement("div");
      priceBadge.className = "order-price-badge";
      priceBadge.textContent = `${order.prixTotal} $CAD`;

      header.appendChild(left);
      header.appendChild(priceBadge);

      const cardBody = document.createElement("div");
      cardBody.className = "card-body d-flex flex-column";

      const list = document.createElement("ul");
      list.className = "list-unstyled mb-3";

      const base = document.createElement("li");
      base.innerHTML = `<strong>Saveur:</strong> ${order.base || "—"}`;
      list.appendChild(base);

      const glacage = document.createElement("li");
      glacage.innerHTML = `<strong>Glaçage:</strong> ${order.glacage || "—"}`;
      list.appendChild(glacage);

      const creme = document.createElement("li");
      creme.innerHTML = `<strong>Crème fouetée:</strong> ${order.creme || "—"}`;
      list.appendChild(creme);

      const cerise = document.createElement("li");
      cerise.innerHTML = `<strong>Cerise:</strong> ${order.cerise || "—"}`;
      list.appendChild(cerise);

      const addr = document.createElement("li");
      addr.innerHTML = `<strong>Adresse:</strong> ${order.adresse || "—"}`;
      list.appendChild(addr);

      const spacer = document.createElement("div");
      spacer.className = "mt-auto";

      const btnGroup = document.createElement("div");
      btnGroup.className =
        "d-flex justify-content-between align-items-center gap-2 mt-3";

      const del = document.createElement("button");
      del.className = "btn btn-sm btn-danger";
      del.textContent = "Supprimer";
      del.setAttribute("data-id", order.id);

      del.addEventListener("click", async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8001/commande/${order.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          alert("Commande supprimée");
          // console.log(result);
          // location.reload();
        } catch (err) {
          alert(err);
        }
      });

      btnGroup.appendChild(del);

      cardBody.appendChild(list);
      cardBody.appendChild(spacer);
      cardBody.appendChild(btnGroup);

      card.appendChild(header);
      card.appendChild(cardBody);
      col.appendChild(card);
      return col;
    }

    function checkEmpty() {
      noOrders.style.display = ordersRow.children.length ? "none" : "block";
    }

    function loadOrders() {
      allOrders.forEach((o) => ordersRow.appendChild(createCard(o)));
      checkEmpty();
    }

    loadOrders();
  } catch (err) {
    alert(err);
  }
});
