document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createQuestionForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const question = document.getElementById('user-question').value.trim();
        const answer = document.getElementById('user-answer').value.trim();

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert('Added Question Successfully.');
                } else {
                    try {
                        const data = JSON.parse(this.responseText);
                        alert(data.message || 'Error adding question. Please try again');
                    } catch (error) {
                        alert('Error adding question. Please try again');
                    }
                }
            }
        };

        xhttp.open('POST', 'https://isa-project-backend-ultkx.ondigitalocean.app/addQuestion', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        const data = JSON.stringify({
            question,
            answer,
        });

        xhttp.send(data);
    });
}); 