document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('getQuestionForm');

    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = '/user-homepage.html';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const qAudioContainer = document.getElementById('questionAudioContainer');
        const aAudioContainer = document.getElementById('questionAudioContainer');
        qAudioContainer.innerHTML = '<div class="loader"></div>';
        aAudioContainer.innerHTML = '<div class="loader"></div>';

        const id = document.getElementById("questionId").value;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);

                if (this.status === 200) {

                    //data message
                    alert(data.message);

                    // converting audio bytes
                    if (data.questionAudio) {
                        convertAudioFromBase64(data.questionAudio, "questionAudioContainer", "audio/mp3");
                    }
                    // converting answer audio bytes
                    if (data.answerAudio) {
                        convertAudioFromBase64(data.answerAudio, "answerAudioContainer", "audio/mp3"); // Change to "audio/wav" if needed
                    }
                } else {
                    alert(data.message);
                }
            }
        };

        xhttp.open('GET', `http://localhost:3000/getQuestion/${id}`, true);
        xhttp.withCredentials = true;
        xhttp.send();
    });
});


function convertAudioFromBase64(base64Audio, containerId, mimeType) {
    document.getElementById(containerId).innerHTML = 'Loading ...';
    // Convert base64 to binary
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from binary data
    const audioBlob = new Blob([bytes], { type: mimeType });

    // Generate a URL for the Blob
    const audioURL = URL.createObjectURL(audioBlob);

    // Create an <audio> element and set the source
    const audioElement = document.createElement("audio");
    audioElement.controls = true;
    audioElement.src = audioURL;

    // Append to the container
    document.getElementById(containerId).innerHTML = ''; // Clear previous audio
    document.getElementById(containerId).appendChild(audioElement);
}

