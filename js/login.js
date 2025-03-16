document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!username || !password) {
            alert('Please fill in all fields!');
            return;
        }
        
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const data = JSON.parse(this.responseText);
                    // Store the token in localStorage for future authenticated requests
                    localStorage.setItem('token', data.token);
                    alert('Login successful!');
                    window.location.href = 'index.html'; // Redirect to main page after login
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
        
        // TODO: change to the correct endpoint, should be making the request to the backend (MongoDB)
        xhttp.open('POST', 'http://localhost:3000/api/users/login', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        
        const data = JSON.stringify({
            username,
            password
        });
        
        xhttp.send(data);
    });
});