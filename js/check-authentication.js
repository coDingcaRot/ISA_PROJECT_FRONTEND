document.addEventListener('DOMContentLoaded', () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            // alert(`Authenticating`)
            const data = JSON.parse(this.responseText);

            if (this.status == 200) {
                if(window.location.pathname == '/user-homepage.html'){
                    // Check if the user has been welcomed
                    const hasBeenWelcomed = localStorage.getItem('welcomedUser');

                    if (!hasBeenWelcomed) {
                        alert(`Welcome ${data.username}`);
                        localStorage.setItem('welcomedUser', 'true'); // Set the flag
                    }
                }
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
