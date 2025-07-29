document.addEventListener("DOMContentLoaded", function() {

    const homeNewsContainer = document.getElementById("latest-news-grid");
    const newsPageContainer = document.querySelector("#all-news-page .news-grid");

    /**
     * Cria o HTML para o card COMPLETO (usado na página /pages/noticias.html).
     */
    function createFullNewsCard(newsItem) {
        return `
            <article class="news-card">
                <a href="${newsItem.link}" class="news-card-link">
                    <img src="${newsItem.image}" alt="Imagem da notícia: ${newsItem.title}">
                    <div class="news-card-content">
                        <p class="news-date">${newsItem.date}</p>
                        <h2 class="news-title">${newsItem.title}</h2>
                        <p class="news-excerpt">${newsItem.excerpt}</p>
                        <span class="btn">Leia Mais</span>
                    </div>
                </a>
            </article>
        `;
    }

    /**
     * Cria o HTML para o card COMPACTO (usado na página inicial).
     * Este card contém apenas imagem, data e título.
     */
    function createHomeNewsCard(newsItem) {
        return `
            <article class="home-news-card">
                <a href="${newsItem.link}">
                    <img src="${newsItem.image}" alt="Imagem da notícia: ${newsItem.title}">
                    <div class="home-news-content">
                        <p class="home-news-date">${newsItem.date}</p>
                        <h3 class="home-news-title">${newsItem.title}</h3>
                    </div>
                </a>
            </article>
        `;
    }

    /**
     * Busca os dados do JSON e exibe as notícias no local correto.
     */
    async function fetchAndDisplayNews() {
        try {
            const response = await fetch('/data/eventos.json');
            if (!response.ok) throw new Error(`Erro na rede: ${response.statusText}`);
            const allNews = await response.json();

            // Se estiver na HOME, usa o card compacto.
            if (homeNewsContainer) {
                const latestNews = allNews.slice(0, 3);
                homeNewsContainer.innerHTML = latestNews.map(createHomeNewsCard).join('');
            }

            // Se estiver na PÁGINA DE NOTÍCIAS, usa o card completo.
            if (newsPageContainer) {
                newsPageContainer.innerHTML = allNews.map(createFullNewsCard).join('');
            }

        } catch (error) {
            console.error('Falha ao carregar notícias:', error);
            const errorMessage = '<p>Não foi possível carregar as notícias.</p>';
            if (homeNewsContainer) homeNewsContainer.innerHTML = errorMessage;
            if (newsPageContainer) newsPageContainer.innerHTML = errorMessage;
        }
    }

    fetchAndDisplayNews();
});