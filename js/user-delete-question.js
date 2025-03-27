document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('deleteAccountForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById("user-question-id").value;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert('Deleted Question Successfully.');
                } else {
                    try {
                        const data = JSON.parse(this.responseText);
                        alert(data.message || 'Error deleting question. Please try again');
                    } catch (error) {
                        alert('Error deleting question. Please try again');
                    }
                }
            }
        };

        xhttp.open('DELETE',`https://isa-project-backend-ultkx.ondigitalocean.app/deleteQuestion/${id}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    });
}); 