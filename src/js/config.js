document.addEventListener('DOMContentLoaded', () => {
    const itemCountInput = document.getElementById('itemCount');
    const generateBtn = document.getElementById('generateFields');
    const itemsContainer = document.getElementById('itemsContainer');
    const configForm = document.getElementById('configForm');
    const messageDiv = document.getElementById('message');

    function createItemFields(count) {
        itemsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const itemDiv = document.createElement('div');
            itemDiv.style.border = '1px solid #ccc';
            itemDiv.style.padding = '10px';
            itemDiv.style.marginTop = '10px';
            itemDiv.innerHTML = `
                <h4>Slide ${i + 1}</h4>
                <label>Image URL:</label>
                <input type="text" name="image_${i}" required placeholder="src/img/cat${i + 1}.jpg" value="src/img/cat${i + 1}.jpg" style="width: 100%;">
                <br>
                <label>Caption:</label>
                <input type="text" name="caption_${i}" required placeholder="Cat #${i + 1}" value="Cat #${i + 1}" style="width: 100%;">
            `;
            itemsContainer.appendChild(itemDiv);
        }
    }

    generateBtn.addEventListener('click', () => {
        const count = parseInt(itemCountInput.value);
        if (count > 0) {
            createItemFields(count);
        }
    });

    createItemFields(parseInt(itemCountInput.value) || 6);

    configForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(configForm);
        const items = [];
        const count = itemsContainer.children.length;

        for (let i = 0; i < count; i++) {
            items.push({
                image: formData.get(`image_${i}`),
                caption: formData.get(`caption_${i}`)
            });
        }

        try {
            const response = await fetch('api/save_data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items })
            });
            const result = await response.json();
            if (result.status === 'success') {
                messageDiv.textContent = 'Configuration saved successfully!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = 'Error saving configuration: ' + result.message;
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            messageDiv.textContent = 'Network error: ' + error.message;
            messageDiv.style.color = 'red';
        }
    });
});
