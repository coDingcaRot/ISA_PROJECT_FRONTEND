document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createAccountForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            Swal.fire({
                title : `Passwords do not match!`,
                icon : `error`
            })
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                title : `Password must be at least 6 characters long!`,
                icon : `error`
            })
            return;
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    const data = JSON.parse(this.responseText);

                    Swal.fire({
                        title: `${data.message}`,
                        icon: 'success',
                    }).then(() => {
                        // Swal.fire animation and popup is finished here
                    
                        setTimeout(() => {
                            window.location.href = '/login.html';
                        }, 1000); // 1000 milliseconds (1 second) delay
                    });
                } else {
                    try {
                        const data = JSON.parse(this.responseText);
                        
                        Swal.fire({
                            title : `${data.message}`,
                            icon : `error`
                        })
                    } catch (error) {
                        Swal.fire({
                            title : `500 Internal Server Error`,
                            icon : `error`
                        })
                    }
                }
            }
        };

        xhttp.open('POST', 'https://isa-project-backend-ultkx.ondigitalocean.app/createUser', true);
        // xhttp.open('POST', 'http://localhost:3000/createUser', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        const data = JSON.stringify({
            username,
            email,
            password
        });

        xhttp.send(data);
    });
}); 