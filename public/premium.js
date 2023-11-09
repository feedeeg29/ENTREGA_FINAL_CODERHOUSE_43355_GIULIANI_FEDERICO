const premiumButton = document.getElementById('premiumButton')

premiumButton.addEventListener('click', async () => {
    try {
        const userPremium = {
            "role": "premiumUser"
        }
        const urll = await fetch('api/users/premium/:email')
        console.log(urll)
        const response = await fetch('api/users/premium/:email', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userPremium)
        })
        console.log(response)
        if (response.status === 200) {
            window.location.replace('/')
        }
    } catch (err) {
        console.error("dinero insuficiente")
    }
})