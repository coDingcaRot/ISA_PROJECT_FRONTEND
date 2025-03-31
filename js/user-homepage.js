async function loadUserData() {
    try {
        document.getElementById("api-usage-count").innerText = "Loading...";
        
        const response = await fetch('http://localhost:3000/getUser', {
            method: 'GET',
            credentials: 'include' // Sends cookies automatically
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        // Update profile picture with initials
        const profilePic = document.querySelector('.profile-pic');
        profilePic.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.username)}&background=ff7eb3&color=fff`;
                        
        // Simply use the count from the response body
        document.getElementById("api-usage-count").innerText = data.user.apiUsage.requestsLeft;
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("api-usage-count").innerText = "Error";
    }
}

document.addEventListener('DOMContentLoaded', loadUserData);
document.addEventListener('DOMContentLoaded', () => {
    const apiDocElement = document.getElementById('api-doc');

    if (apiDocElement) {
        apiDocElement.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:3000/api-docs'); // Replace with your actual URL

            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) { // Request is complete
                    if (xhr.status >= 200 && xhr.status < 300) { // Success
                        window.location.href = 'http://localhost:3000/api-docs';
                    } else { // Server error
                        window.location.href = '/unavailable.html';
                    }
                } else if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED && xhr.status === 0) {
                    window.location.href = '/unavailable.html'; //Potential network error.
                }

            };

            xhr.onerror = function () {
                window.location.href = '/unavailable.html' //Network error.
            }

            xhr.send();
        });
    } else {
        console.error('Element with ID "api-doc" not found.');
    }
});

async function hidAdmin() {
    try {
        const response = await fetch('https://isa-project-frontend-yvfn.onrender.com/getUser', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        if (data.user && !data.user.admin) {
            const adminButton = document.getElementById("adminButton"); 
            if (adminButton) {
                adminButton.style.display = "none"; 
            }
        } else if (data.user && data.user.admin){
            const adminButton = document.getElementById("adminButton");
            if (adminButton) {
                adminButton.style.display = "block";
            }
        }
        if (data.user && data.user.apiUsage && data.user.apiUsage.requestsLeft !== undefined) {
            document.getElementById("api-usage-count").innerText = data.user.apiUsage.requestsLeft;
        } else {
            document.getElementById("api-usage-count").innerText = "API usage data not available";
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById("api-usage-count").innerText = "Error";
    }
}

// Call the function when the page loads (or when appropriate)
hidAdmin();
