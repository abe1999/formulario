document.addEventListener("DOMContentLoaded", function() {

    // Função para pegar o ID do evento da URL
    function getEventId() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'), 10);
    }

    // Função principal para buscar e exibir os detalhes do evento
    async function loadEventDetail() {
        const eventId = getEventId();
        // Seletor de classe atualizado para 'event-detail-page'
        const container = document.querySelector('.event-detail-page .container');

        if (isNaN(eventId)) {
            container.innerHTML = '<h1>Evento não encontrado</h1><p>O ID fornecido na URL é inválido.</p>';
            return;
        }

        try {
            // Caminho do arquivo JSON corrigido para 'eventos.json'
            const response = await fetch('/data/eventos.json');
            if (!response.ok) throw new Error('Não foi possível carregar os dados dos eventos.');
            
            const allEvents = await response.json();
            // Variáveis atualizadas para 'event'
            const eventItem = allEvents.find(item => item.id === eventId);

            if (!eventItem) {
                throw new Error('O evento com este ID não foi encontrado.');
            }

            // --- Preenchendo a página com os dados ---
            // IDs dos elementos atualizados para 'event-*'
            document.title = `${eventItem.title} - Paróquia N. S. de Nazaré`;
            document.getElementById('event-title-full').textContent = eventItem.title;
            document.getElementById('event-date-full').textContent = `Data do evento: ${eventItem.date}`;
            
            const mainImage = document.getElementById('event-image-large');
            mainImage.src = eventItem.image;
            mainImage.alt = eventItem.title;
            
            document.getElementById('event-text-full').innerHTML = eventItem.fullText;

            // --- Montando a galeria de fotos ---
            if (eventItem.galleryImages && eventItem.galleryImages.length > 0) {
                document.getElementById('event-gallery-container').style.display = 'block';
                const gallery = document.getElementById('event-gallery');
                gallery.innerHTML = eventItem.galleryImages.map(imgUrl => `
                    <a href="${imgUrl}" target="_blank" title="Clique para ampliar">
                        <img src="${imgUrl}" alt="Foto da galeria do evento">
                    </a>
                `).join('');
            }
            
            // --- Montando o link do Google Drive ---
            if (eventItem.driveLink) {
                const driveContainer = document.getElementById('event-drive-link-container');
                driveContainer.innerHTML = `<a href="${eventItem.driveLink}" class="btn" target="_blank">Ver álbum completo ou baixar fotos</a>`;
            }

        } catch (error) {
            console.error("Erro detalhado:", error);
            container.innerHTML = `<h1>Erro ao Carregar Evento</h1><p>${error.message}</p>`;
        }
    }

    loadEventDetail();
});