document.addEventListener("DOMContentLoaded", function () {
  // =================================================================
  // FUNÇÕES AUXILIARES (Definimos as "ferramentas" primeiro)
  // =================================================================

  /**
   * Ativa o efeito de encolher o header ao rolar a página.
   */
  const initializeHeaderScrollEffect = () => {
    const header = document.getElementById("main-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  };

  /**
   * Ativa a funcionalidade do menu hambúrguer (versão melhorada com overlay).
   */
  const initializeMobileMenu = () => {
    const body = document.body;
    const hamburgerButton = document.getElementById("hamburger-menu-button");
    const closeButton = document.getElementById("close-menu-button");
    const mainNav = document.getElementById("main-nav");

    if (!body || !hamburgerButton || !closeButton || !mainNav) {
      console.error("Elementos do menu mobile não foram encontrados.");
      return;
    }

    // Evento para abrir o menu
    hamburgerButton.addEventListener("click", () => {
      body.classList.add("menu-open");
    });

    // Evento para fechar o menu
    closeButton.addEventListener("click", () => {
      body.classList.remove("menu-open");
    });

    // Lógica para o dropdown no mobile
    const dropdowns = mainNav.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      const dropBtn = dropdown.querySelector(".drop-btn");
      dropBtn.addEventListener("click", (event) => {
        if (window.innerWidth <= 992) {
          event.preventDefault();
          dropdown.classList.toggle("active");
        }
      });
    });
  };

  // =================================================================
  // FUNÇÃO PRINCIPAL (O "motor" que carrega as partes do site)
  // =================================================================

  /**
   * Carrega conteúdo HTML de um arquivo em um elemento da página.
   */
  const loadHTML = (elementId, filePath) => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
        return response.text();
      })
      .then((data) => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = data;

          // *** PONTO CHAVE DE INTEGRAÇÃO ***
          // Se o elemento que acabamos de carregar for o header,
          // ativamos TODAS as suas funcionalidades de uma vez.
          if (elementId === "header-placeholder") {
            initializeHeaderScrollEffect();
            initializeMobileMenu();
          }
        }
      })
      .catch((error) => console.error(`Erro ao carregar ${elementId}:`, error));
  };

  // =================================================================
  // EXECUÇÃO INICIAL (Onde tudo começa)
  // =================================================================

  // Carrega as partes principais do layout.
  // =================================================================
  // EXECUÇÃO CORRIGIDA
  // =================================================================

  // Carrega as partes principais do layout.
  loadHTML("header-placeholder", "partials/header.html");
  loadHTML("footer-placeholder", "partials/footer.html");
});
