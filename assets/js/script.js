document.addEventListener("DOMContentLoaded", function() {

    /**
     * Função para inicializar o efeito de encolher o header ao rolar a página.
     * Ela só deve ser chamada DEPOIS que o header estiver carregado no DOM.
     */
    const initializeHeaderScrollEffect = () => {
        const header = document.getElementById('main-header');

        // Se o elemento do header não for encontrado, a função para.
        if (!header) {
            console.error("Elemento do header com id 'main-header' não encontrado. O efeito de rolagem não funcionará.");
            return;
        }

        const handleScroll = () => {
            // Se a rolagem vertical for maior que 50 pixels...
            if (window.scrollY > 50) {
                // ...adiciona a classe 'scrolled' ao header
                header.classList.add('scrolled');
            } else {
                // ...senão, remove a classe 'scrolled'
                header.classList.remove('scrolled');
            }
        };

        // Adiciona um "ouvinte" que chama a função handleScroll toda vez que o usuário rolar a página
        window.addEventListener('scroll', handleScroll);
    };

    /**
     * Função que carrega conteúdo HTML de um arquivo em um elemento da página.
     */
    const loadHTML = (elementId, filePath) => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Não foi possível carregar o arquivo: ${filePath}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;

                    // *** PONTO CHAVE ***
                    // Se o elemento que acabamos de carregar for o header,
                    // chamamos a função para ativar o efeito de rolagem.
                    if (elementId === 'header-placeholder') {
                        initializeHeaderScrollEffect();
                    }
                }
            })
            .catch(error => console.error(`Erro ao carregar ${elementId}:`, error));
    };

    // Carrega o header e o footer
    loadHTML('header-placeholder', '/partials/header.html');
    loadHTML('footer-placeholder', '/partials/footer.html');

});