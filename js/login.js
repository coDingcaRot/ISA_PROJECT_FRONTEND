document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('inputEmail').value.trim();
        const password = document.getElementById('inputPassword').value;

        if (!email || !password) {
            alert('Please fill in all fields!');
            return;
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const data = JSON.parse(this.responseText);
                    localStorage.setItem('token', data.token);
                    alert('Login successful!');
                    if (data.admin === true) {
                        window.location.href = 'admin-homepage.html';
                    } else {
                        window.location.href = 'user-homepage.html';
                    }
                } else {
                    try {
                        const data = JSON.parse(this.responseText);
                        alert(data.message || 'Login failed. Please check your credentials.');
                    } catch (error) {
                        alert('Login failed. Please try again.');
                    }
                }
            }
        };

        xhttp.open('POST', 'https://isa-project-backend-ultkx.ondigitalocean.app/checkUser', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        const data = JSON.stringify({
            email,
            password
        });

        xhttp.send(data);
    });
});
