document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('inputEmail').value.trim();
        const password = document.getElementById('inputPassword').value;

        if (!email || !password) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            const response = await fetch('https://isa-project-backend-ultkx.ondigitalocean.app/checkUser', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // Wait for the response and parse JSON
            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                if (data.admin === true) {
                    window.location.href = 'admin-homepage.html';
                } else {
                    window.location.href = 'user-homepage.html';
                }
            } else {
                // Handle error messages from the server
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            // Handle network errors or unexpected issues
            console.error('Error:', error);
            alert('Login failed. Please try again.');
        }
    });
});
