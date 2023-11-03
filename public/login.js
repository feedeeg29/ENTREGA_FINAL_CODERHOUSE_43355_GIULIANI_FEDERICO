const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(loginForm);
    const formData = {};
    data.forEach((value, key) => {
        formData[key] = value;
    });
    const jsonData = JSON.stringify(formData);

    try {
        const response = await fetch('api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });

        if (!response) {
            throw new Error('Error en la solicitud al servidor');
        }

        const responseData = await response.json();
        if (responseData.status === 'success') {
            window.location.replace('/login');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error.message);
    }
});
