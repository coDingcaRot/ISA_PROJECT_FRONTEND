document.addEventListener('DOMContentLoaded', () => {
    console.log("client origin: " + window.location.origin);
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 403 || this.status == 401) {
                window.location.href = 'unauthorized.html'
                alert(data.message || 'Login failed. Please check your credentials.');
            } else {
                try {
                    // const data = JSON.parse(this.responseText);
                    // localStorage.setItem('token', data.token);
                   if (data.admin === true) {
                       window.location.href = 'admin-homepage.html';
                   } else {
                       window.location.href = 'user-homepage.html';
                   }
                } catch (error) {
                }
            }
        }
    };
    xhttp.open('GET', 'http://localhost:3000/authenticate', true);
    xhttp.withCredentials = true; // includes cookies in response
    xhttp.send();
});
