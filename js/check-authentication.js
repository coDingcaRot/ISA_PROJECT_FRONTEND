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
    xhttp.open('GET', 'https://isa-project-backend-ultkx.ondigitalocean.app/authenticate', true);
    xhttp.withCredentials = true; // includes cookies in response
    xhttp.send();
});
