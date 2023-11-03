
const addProductButton = document.getElementById('addProductButton');

addProductButton.addEventListener('click', () => {
    const productId = addProductButton.dataset.productId;

    fetch(`/apimongo/${productId}`)
        .then(response => response.json())
        .then(data => {
            fetch(`/cartmongo/64af8f67aaf957168dee2c8f/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
});
