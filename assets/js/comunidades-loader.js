document.addEventListener("DOMContentLoaded", () => {
  // PONTO DE VERIFICAÇÃO 1: O SCRIPT COMEÇOU?
  console.log("1. Script comunidades-loader.js iniciado.");

  const gridContainer = document.getElementById("comunidades-grid");

  // PONTO DE VERIFICAÇÃO 2: ACHOU O CONTAINER HTML?
  console.log("2. Container 'comunidades-grid' encontrado:", gridContainer);

  if (!gridContainer) {
    console.error(
      "ERRO CRÍTICO: Não encontrei o <div id='comunidades-grid'> na sua página. Verifique o arquivo HTML."
    );
    return;
  }

  // TENTATIVA DE CAMINHO: Usando '../' para subir um nível da pasta 'pages'
  const caminhoDoJson = "../data/comunidades.json";
  console.log(`3. Tentando buscar o JSON em: ${caminhoDoJson}`);

  fetch(caminhoDoJson)
    .then((response) => {
      console.log("4. Resposta do fetch recebida:", response);
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar o arquivo (${response.status}): ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((comunidades) => {
      console.log("5. JSON parseado com sucesso. Dados:", comunidades);
      if (!Array.isArray(comunidades)) {
        throw new Error(
          "O arquivo JSON não é um array. Verifique se ele começa com '['."
        );
      }

      let cardsHTML = "";
      comunidades.forEach((comunidade) => {
        cardsHTML += `
                    <div class="comunidade-card">
                        <img src=".${comunidade.imagemCard}" alt="Fachada da ${comunidade.nome}">
                        <div class="card-content">
                            <h3>${comunidade.nome}</h3>
                            <p>${comunidade.resumo}</p>
                            <a href="comunidade.html?id=${comunidade.id}" class="btn">Conheça Mais</a>
                        </div>
                    </div>
                `;
      });

      console.log("6. HTML dos cards gerado. Inserindo na página...");
      gridContainer.innerHTML = cardsHTML;
    })
    .catch((error) => {
      console.error("ERRO GRAVE NO PROCESSO:", error);
      gridContainer.innerHTML =
        "<p style='color: red;'>Falha ao carregar comunidades. Verifique o console (F12) para detalhes do erro.</p>";
    });
});
