document.addEventListener("DOMContentLoaded", function () {
  const homeNewsContainer = document.getElementById("latest-news-grid");

  // ----- A CORREÇÃO ESTÁ AQUI NESTA LINHA -----
  // Simplificamos o seletor para encontrar o container da lista de eventos.
  const eventosPageContainer = document.querySelector(".eventos-grid");

  function formatarData(dateString) {
    const data = new Date(dateString + "T00:00:00");
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function createFullEventCard(evento) {
    return `
      <a href="${evento.link}" class="evento-card">
        <img src="${evento.image}" alt="Imagem do evento: ${evento.title}">
        <div class="evento-conteudo">
          <p class="evento-data">${formatarData(evento.date)}</p>
          <h3 class="evento-titulo">${evento.title}</h3>
          <p class="evento-resumo">${evento.excerpt}</p>
          <span class="btn">Ver Mais</span>
        </div>
      </a>
    `;
  }

  function createHomeEventCard(evento) {
    return `
      <article class="evento-card-compacto">
        <a href="${evento.link}">
          <img src="${evento.image}" alt="Imagem do evento: ${evento.title}">
          <div class="evento-compacto-conteudo">
            <p class="evento-compacto-data">${formatarData(evento.date)}</p>
            <h3 class="evento-compacto-titulo">${evento.title}</h3>
          </div>
        </a>
      </article>
    `;
  }

  async function fetchAndDisplayEvents() {
    // Se nenhum dos containers (home ou página de eventos) existir, não faz nada.
    if (!homeNewsContainer && !eventosPageContainer) {
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");

      const response = await fetch("/data/eventos.json");
      if (!response.ok) throw new Error(`Erro na rede: ${response.statusText}`);

      let allEvents = await response.json();

      if (category) {
        allEvents = allEvents.filter((evento) => evento.category === category);
        const pageTitleElement = document.querySelector(".page-title");
        if (pageTitleElement) {
          pageTitleElement.textContent = `Eventos: ${
            category.charAt(0).toUpperCase() + category.slice(1)
          }s`;
        }
      }

      allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (homeNewsContainer) {
        const latestEvents = allEvents.slice(0, 3);
        homeNewsContainer.innerHTML = latestEvents
          .map(createHomeEventCard)
          .join("");
      }

      if (eventosPageContainer) {
        if (allEvents.length === 0) {
          eventosPageContainer.innerHTML = `<p class="text-center" style="grid-column: 1 / -1;">Não há eventos nesta categoria no momento.</p>`;
        } else {
          eventosPageContainer.innerHTML = allEvents
            .map(createFullEventCard)
            .join("");
        }
      }
    } catch (error) {
      console.error("Falha ao carregar eventos:", error);
      const errorMessage =
        "<p>Não foi possível carregar os eventos no momento.</p>";
      if (homeNewsContainer) homeNewsContainer.innerHTML = errorMessage;
      if (eventosPageContainer) eventosPageContainer.innerHTML = errorMessage;
    }
  }

  fetchAndDisplayEvents();
});
