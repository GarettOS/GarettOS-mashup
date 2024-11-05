// Functionality for the back button
function goback() {
    window.history.back();
}

// Audio stuff
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('background-audio');

    // Play/Pause functionality, now globally accessible
    window.toggleAudio = function () {
        if (bgMusic.paused) {
            bgMusic.play().catch(error => console.log("Error playing audio:", error));
        } else {
            bgMusic.pause();
        }
    };

    // Volume control functionality, also globally accessible
    window.changeVolume = function (value) {
        bgMusic.volume = value;
    };

    // Auto-play the audio on page load if allowed
    bgMusic.play().catch(error => {
        console.log("Autoplay blocked or other issue:", error);
    });
});