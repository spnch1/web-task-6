document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    let totalSlides = 0;
    let lastDataHash = '';

    async function fetchData() {
        try {
            const response = await fetch('api/get_data.php');
            const text = await response.text();

            if (text !== lastDataHash) {
                lastDataHash = text;
                const data = JSON.parse(text);
                renderCarousel(data.items);
                const statusMsg = document.getElementById('status-message');
                if (statusMsg) {
                    statusMsg.textContent = 'Updated: ' + new Date().toLocaleTimeString();
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            const statusMsg = document.getElementById('status-message');
            if (statusMsg) {
                statusMsg.textContent = 'Error fetching data.';
            }
        }
    }

    function renderCarousel(items) {
        const container = document.getElementById('carousel-inner');
        if (!container) return;

        container.innerHTML = '';

        if (!items || items.length === 0) {
            container.innerHTML = '<div class="carousel-item"><p>No slides configured.</p></div>';
            totalSlides = 0;
            return;
        }

        items.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-item';
            slide.innerHTML = `
                <img src="${item.image}" alt="${item.caption}">
                <div class="carousel-caption">${item.caption}</div>
            `;
            container.appendChild(slide);
        });

        totalSlides = items.length;
        currentSlide = 0;
        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        const container = document.getElementById('carousel-inner');
        if (container) {
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    window.moveSlide = function (step) {
        if (totalSlides === 0) return;
        currentSlide = (currentSlide + step + totalSlides) % totalSlides;
        updateCarouselPosition();
    };
    fetchData();
    setInterval(fetchData, 5000);
});
