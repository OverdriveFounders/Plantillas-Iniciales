function renderMenu() {
  const root = document.getElementById("menu-root");
  const toc = document.getElementById("menu-toc");

  if (!root || !toc || !window.menuData) {
    return;
  }

  const renderSkeletons = () => {
    root.innerHTML = `
      <div class="grid grid-3">
        <article class="card skeleton" style="height:220px;"></article>
        <article class="card skeleton" style="height:220px;"></article>
        <article class="card skeleton" style="height:220px;"></article>
      </div>
    `;
  };

  const formatPrice = (value) => {
    if (value.includes("€")) {
      return value;
    }
    if (value.toLowerCase().includes("copa") || value.toLowerCase().includes("botella")) {
      return value;
    }
    return `${value}€`;
  };

  renderSkeletons();

  setTimeout(() => {
    toc.innerHTML = window.menuData
      .map(
        (category, index) =>
          `<a class="chip ${index === 0 ? "active" : ""}" href="#${category.id}">${category.title}</a>`
      )
      .join("");

    root.innerHTML = window.menuData
      .map(
        (category) => `
        <section class="menu-category" id="${category.id}">
          <h2>${category.title}</h2>
          <p class="muted">${category.intro}</p>
          <div class="menu-items">
            ${category.items
              .map(
                (item) => `
                <article class="menu-item dish-card">
                  <div class="dish-image" aria-hidden="true"></div>
                  <div class="badges">
                    <span class="badge ${category.id === "sin-gluten" ? "good" : category.id === "favoritas" ? "hot" : ""}">
                      ${category.id === "sin-gluten" ? "Sin gluten" : category.id === "favoritas" ? "Favorita" : category.title}
                    </span>
                  </div>
                  <div class="card-content">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p class="upsell">${item.upsell}</p>
                    <p class="price">${formatPrice(item.price)}</p>
                  </div>
                </article>
              `
              )
              .join("")}
          </div>
          <p class="small"><strong>${category.closing}</strong></p>
        </section>
      `
      )
      .join("");

    const chips = toc.querySelectorAll(".chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((el) => el.classList.remove("active"));
        chip.classList.add("active");
      });
    });
  }, 350);
}

document.addEventListener("DOMContentLoaded", renderMenu);
