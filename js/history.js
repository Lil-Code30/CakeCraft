document.addEventListener("DOMContentLoaded", () => {
  const ordersRow = document.getElementById("ordersRow");
  const noOrders = document.getElementById("no-orders");

  // Static fallback data so the page works without a server.
  const sampleOrders = [
    {
      id: 1,
      base: "vanille",
      glacage: "chocolat",
      creme: "oui",
      cerise: "non",
      date: "2025-10-20T14:30:00.000Z",
      nom: "Pierre Martin",
      adresse: "1595 boulevard Alphonse-Desjardins, Lévis",
      prix: 32.5,
    },
    {
      id: 2,
      base: "chocolat",
      glacage: "vanille",
      creme: "non",
      cerise: "oui",
      date: "2025-11-05T09:15:00.000Z",
      nom: "Sophie Dubois",
      adresse: "42 rue des Fleurs, Montréal",
      prix: 28.0,
    },
  ];

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch (e) {
      return iso || "";
    }
  }

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
    t2.textContent = formatDate(order.date);

    hTitle.appendChild(t1);
    hTitle.appendChild(t2);

    left.appendChild(thumb);
    left.appendChild(hTitle);

    const priceBadge = document.createElement("div");
    priceBadge.className = "order-price-badge";
    priceBadge.textContent = order.prix !== undefined ? `${order.prix} €` : "—";

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

    del.addEventListener("click", () => {
      // soon..
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
    sampleOrders.forEach((o) => ordersRow.appendChild(createCard(o)));
    checkEmpty();
  }

  loadOrders();
});
