document.addEventListener('DOMContentLoaded', () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            // alert(`Authenticating`)
            const data = JSON.parse(this.responseText);

            if (this.status == 200) {
                if(window.location.pathname == '/user-homepage.html')
                    alert(`Welcome ${data.username}`);
            } else {
                window.location.href = '/unauthorized.html'
            }
        }
    };
    // xhttp.open('GET', 'https://isa-project-backend-ultkx.ondigitalocean.app/authenticate', true);
    xhttp.open('GET', 'http://localhost:3000/authenticate', true);
    xhttp.withCredentials = true; 
    xhttp.send();
});
