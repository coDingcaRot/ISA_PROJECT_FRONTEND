document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateQuestionForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById("user-question-id").value;
        const question = document.getElementById("user-question").value;
        const answer = document.getElementById("user-answer").value;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert('Updated Question Successfully.');
                } else {
                    try {
                        const data = JSON.parse(this.responseText);
                        alert(data.message || 'Error updating question. Please try again');
                    } catch (error) {
                        alert('Error updating question. Please try again');
                    }
                }
            }
        };

        xhttp.open('PUT', 'https://isa-project-backend-ultkx.ondigitalocean.app/putQuestion', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');

        const data = JSON.stringify({
            id,
            question,
            answer
        });

        xhttp.send(data);
    });
}); 