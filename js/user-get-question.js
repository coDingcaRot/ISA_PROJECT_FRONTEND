document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('getQuestionForm');

    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = '/user-homepage.html';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const qAudioContainer = document.getElementById('questionAudioContainer');
        const aAudioContainer = document.getElementById('answerAudioContainer');
        qAudioContainer.innerHTML = '<div class="loader"></div>';
        aAudioContainer.innerHTML = '<div class="loader"></div>';

        const id = document.getElementById("questionId").value;

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);
                if (this.status === 200) {
                    Swal.fire({
                        title : data.message,
                        icon : 'success'
                    })

                    // converting audio bytes
                    if (data.questionAudio) {
                        convertAudioFromBase64(data.questionAudio, "questionAudioContainer", "audio/mp3");
                    }
                    // converting answer audio bytes
                    if (data.answerAudio) {
                        convertAudioFromBase64(data.answerAudio, "answerAudioContainer", "audio/mp3");
                    }
                } else {
                    Swal.fire({
                        title : data.message,
                        icon : 'error'
                    })
                }
            }
        };

        // xhttp.open('GET', `https://isa-project-backend-ultkx.ondigitalocean.app/getQuestion/${id}`, true);
        xhttp.open('GET', `http://localhost:3000/getQuestion/${id}`, true);
        xhttp.withCredentials = true;
        xhttp.send();
    });
});

function convertAudioFromBase64(base64Audio, containerId, mimeType) {
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

    // Create download button
    const downloadButton = document.createElement("button");
    downloadButton.innerHTML = `<img src="../img/download-icon.svg" alt="Download" style="width: 24px; height: 24px;">`;
    downloadButton.style.marginLeft = "10px";

    // Add event listener to trigger download
    downloadButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action of refreshing page

        const downloadLink = document.createElement("a");
        downloadLink.href = audioURL;
        downloadLink.download = "audio.mp3";
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(audioURL);
    });

    // Create a container for audio and download button
    const audioContainer = document.createElement("div");
    audioContainer.style.display = "flex";
    audioContainer.style.alignItems = "center";

    // Append audio and download button to the container
    audioContainer.appendChild(audioElement);
    audioContainer.appendChild(downloadButton);

    // Append the container to the parent container
    document.getElementById(containerId).innerHTML = '';
    document.getElementById(containerId).appendChild(audioContainer);
}
