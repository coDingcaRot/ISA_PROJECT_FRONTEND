// Load user data when page loads
document.addEventListener('DOMContentLoaded', async () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //tries to check if ports are correct
        try{
            if (this.readyState == 4) {
                const data = JSON.parse(this.responseText);
                if (this.status == 200) {
                    // alert(data.message);
                    const user = data.user;
                    // Update profile information   
                    document.getElementById('username').textContent = user.username;
                    document.getElementById('user-email').textContent = user.email;
                    document.getElementById('user-id').textContent = user.id;
                    document.getElementById('account-type').textContent = user.admin ? 'Admin' : 'Standard User';
                    document.getElementById('api-usage-count').textContent = data.user.apiUsage.requestsLeft;
                    
                    // Update profile picture with initials
                    const profilePic = document.querySelector('.profile-pic');
                    profilePic.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=ff7eb3&color=fff`;
                } else {
                    try {
                        Swal.fire({
                            title : data.message,
                            icon : 'error'
                        })
                    } catch (error) {
                        Swal.fire({
                            title : `500 Internal Server Error`,
                            icon : 'error'
                        })                    
                    }
                }
            }
        } catch (e) {
            Swal.fire({
                title : `500 Internal Server Error`,
                icon : 'error'
            })            
        }
    };

    // add production 
    xhttp.open('GET', 'isa-project-backend-ultkx.ondigitalocean.app/getUser', true);
    xhttp.withCredentials = true;
    xhttp.send();
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('isa-project-backend-ultkx.ondigitalocean.app/logout', { //make a production call
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            window.location.href = '../login.html';
        } else {
            throw new Error();
        }
    } catch (error) {
        alert('Failed to logout');
    }
});

