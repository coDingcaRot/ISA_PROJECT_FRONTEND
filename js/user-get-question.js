document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('getQuestionForm');
    document.getElementById('back-button').addEventListener('click', ()=>{
        window.location.href = '/user-homepage.html';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById("questionId").value;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const data = JSON.parse(this.responseText);
                if (this.status == 200) {
                    alert(data.message);
                } else {
                    try {
                        alert(data.message || 'Error getting question. Please try again');
                    } catch (error) {
                        alert('Error getting question. Please try again');
                    }
                }
            }
        };

        // xhttp.open('GET', `https://isa-project-backend-ultkx.ondigitalocean.app/getQuestion/${id}`, true);
        xhttp.open('GET', `http://localhost:3000/getQuestion/${id}`, true);
        xhttp.withCredentials = true; 
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    });
}); 
