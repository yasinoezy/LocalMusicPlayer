const audioPlayer = document.getElementById('audioPlayer');
const playlistContainer = [];
let currentTrack = 0;

// API URL that provides the playlist (replace with your actual API endpoint)
const apiURL = 'http://localhost:3000/playlist';  // Example URL, replace with real API

// Fetch the playlist from the API
async function fetchPlaylist() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        // Assuming the API returns an array of song objects with "title" and "url"
        if (data && Array.isArray(data.songs)) {
            data.songs.forEach(song => {
                playlistContainer.push(song.url);
            });

            // Load the first track
            audioPlayer.src = playlistContainer[currentTrack];
        }
    } catch (error) {
        console.error('Error fetching playlist:', error);
    }
}

document.getElementById('playPauseButton').addEventListener('click', playPause);
document.getElementById('nextButton').addEventListener('click', nextTrack);
document.getElementById('previousButton').addEventListener('click', previousTrack);

// Play/Pause button functionality
function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

// Next track functionality
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlistContainer.length;
    audioPlayer.src = playlistContainer[currentTrack];
    audioPlayer.play();
}

// Previous track functionality
function previousTrack() {
    currentTrack = (currentTrack - 1 + playlistContainer.length) % playlistContainer.length;
    audioPlayer.src = playlistContainer[currentTrack];
    audioPlayer.play();
}

// Initialize playlist on page load
window.onload = () => {
    fetchPlaylist();
};
