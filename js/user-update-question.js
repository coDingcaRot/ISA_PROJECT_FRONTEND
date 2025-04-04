document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateQuestionForm');
    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = '/user-homepage.html'
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById("questionId").value.trim();
        const category = document.getElementById("category").value.trim();
        const question = document.getElementById("question").value.trim();
        const answer = document.getElementById("answer").value.trim();

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const data = JSON.parse(this.responseText);
                if (this.status == 200) {
                    Swal.fire({
                        title : data.message,
                        icon : 'success'
                    })
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
        };

        xhttp.open('PUT', 'https://isa-project-backend-ultkx.ondigitalocean.app/updateQuestion', true);
        // xhttp.open('PUT', 'http://localhost:3000/updateQuestion', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.withCredentials = true;
        const data = JSON.stringify({
            id,
            category,
            question,
            answer
        });

        xhttp.send(data);
    });
}); 