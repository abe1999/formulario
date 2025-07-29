document.addEventListener("DOMContentLoaded", function() {
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
                }
            })
            .catch(error => console.error(`Erro ao carregar ${elementId}:`, error));
    };

    loadHTML('header-placeholder', '/partials/header.html');
    loadHTML('footer-placeholder', '/partials/footer.html');
});