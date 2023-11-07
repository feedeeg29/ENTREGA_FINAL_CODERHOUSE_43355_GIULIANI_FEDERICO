/* 
const addProductButton = document.getElementById('addProductButton');

addProductButton.addEventListener('click', () => {
    const productId = addProductButton.dataset.productId;

    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            fetch(`api/carts/64b070dbd76af4abf7a2a797/product/${productId}`, {
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
 */
const addProductButton = document.getElementById('addProductButton');

addProductButton.addEventListener('click', async () => {
    try {
        const productId = addProductButton.dataset.productId;

        const response = await fetch('/api/users/current');
        const userData = await response.json();

        const userId = userData.user.id;

        const addToCartResponse = await fetch(`api/carts/${userId}/cart/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (addToCartResponse.ok) {
            const addedProduct = await addToCartResponse.json();
            console.log(addedProduct);
        } else {
            console.error('No se pudo agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
    }
})