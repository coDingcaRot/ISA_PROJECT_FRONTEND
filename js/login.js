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
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    //authenticate its cookie and based on the result of that cookie we can either go through or not.
                    const data = JSON.parse(this.responseText);
                    // Swal.fire({
                    //     title : `Login Successful`,
                    //     icon : `success`
                    // })
                    if (data.admin === true) {
                        window.location.href = 'admin-homepage.html';
                        return
                    } else {
                        window.location.href = 'user-homepage.html';
                        return
                    }
                } else {
                    try {
                        Swal.fire({
                            title : `Login Failed. Please Check Credentials`,
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

        // xhttp.open('POST', 'https://isa-project-backend-ultkx.ondigitalocean.app/checkUser', true);
        xhttp.open('POST', 'http://localhost:3000/checkUser', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.withCredentials = true;
        
        const data = JSON.stringify({
            email, 
            password
        });

        xhttp.send(data);
    }, 5000)
});

