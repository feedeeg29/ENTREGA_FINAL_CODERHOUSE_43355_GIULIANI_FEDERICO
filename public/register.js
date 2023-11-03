const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(registerForm);
    const formData = {};
    data.forEach((value, key) => {
        formData[key] = value;
    });
    const jsonData = JSON.stringify(formData);
    console.log(jsonData)
    try {
        const response = await fetch('api/users/register', {
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
        console.log(responseData);
        if (responseData.status === 'success') {
            window.location.replace('/profile');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error.message);
    }
});
