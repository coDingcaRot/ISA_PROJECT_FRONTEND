document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createQuestionForm');
    document.getElementById("back-button").addEventListener("click", () => {
        window.location.href = '/user-homepage.html';
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const question = document.getElementById('question').value.trim();
        const answer = document.getElementById('answer').value.trim();
        const category = document.getElementById('category').value.trim();

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 201) {
                    const data = JSON.parse(this.responseText);
                    const message = `${data.message} \nQuestion ID : ${data.questionId}`
                    Swal.fire({
                        title: `${message}`,
                        icon: "success",
                      });
                } else {
                    try {
                        Swal.fire({
                            title : `${data.message}`,
                            icon : 'error'
                        })
                    } catch (error) {
                        Swal.fire({
                            title : `500 \nInternal Server Error`,
                            icon : `error`
                        })
                    }
                }
            }
        };

        xhttp.open('POST', 'https://isa-project-backend-ultkx.ondigitalocean.app/createQuestion', true);
        // xhttp.open('POST', 'http://localhost:3000/createQuestion');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.withCredentials = true;
        const data = JSON.stringify({
            category,
            question,
            answer,
        });

        xhttp.send(data);
    });
}); 