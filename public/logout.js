const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch('api/users/logout', {
            method: 'POST'
        });

        if (response.status === 200) {
            window.location.replace('/login');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error.message);
    }
});
