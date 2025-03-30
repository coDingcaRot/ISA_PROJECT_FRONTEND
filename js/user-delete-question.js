document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('deleteQuestionForm');

    document.getElementById('back-button').addEventListener('click', () => {
        try {
            window.location.href = '/user-homepage.html';
        } catch (e) {
            window.location.reload();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById("questionId").value.trim();

        if (!id) {
            alert("Please enter a valid Question ID.");
            return;
        }

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);
                console.log(data)
                if (this.status === 200) {
                    alert(data.message || "Question deleted successfully!");
                } else {
                    alert(data.message || "An error occurred while deleting the question.");
                }
            }
        };

        // xhttp.open('DELETE', `https://isa-project-backend-ultkx.ondigitalocean.app/deleteQuestion/${id}`, true); // production
        xhttp.open('DELETE', `http://localhost:3000/deleteQuestion/${id}`, true); // testing
        xhttp.withCredentials = true;
        xhttp.send();
    });
});
