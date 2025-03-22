document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createAccountForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const data = JSON.parse(this.responseText);
                    alert('Account created successfully!');
                    window.location.href = 'user-homepage.html';
                } else {
                    try {
                        const data = JSON.parse(this.responseText);
                        alert(data.message || 'Error creating account. Please try again.');
                    } catch (error) {
                        alert('Error creating account. Please try again.');
                    }
                }
            }
        };

        xhttp.open('POST', 'http://localhost:3000/createUser', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        const data = JSON.stringify({
            username,
            email,
            password
        });

        xhttp.send(data);
    });
}); 