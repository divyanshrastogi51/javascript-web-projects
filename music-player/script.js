const playerContainer = document.getElementById('player-container');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Check if playing
let isPlaying = false;

//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'JD',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'JD',
    },
    {
        name: 'jacinto-3',
        displayName: 'Good Night Disco Queen',
        artist: 'JD',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row(Remix)',
        artist: 'JD',
    },          
];

// Play
function playSong(){
    isPlaying = true;
    playerContainer.classList.add('play');
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong() {
    isPlaying = false;
    playerContainer.classList.remove('play');
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play/Pause Event Listner
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex =songs.length - 1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
};

//Current Song
let songIndex = 0;


//Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex =0;
    }
    loadSong(songs[songIndex]);
    playSong();
};

//On Load- Select first Song
loadSong(songs[songIndex]);


//Update progressbar and time
function updateProgressBar(e) {
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;  
        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        //Calculate Display for duration
        let durationMinutes = Math.floor(duration / 60);
        if (durationMinutes < 10) {
            durationMinutes = `0${durationMinutes}`;

        }

         let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;

        }
        
        //Delay switching Element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
        }  

        //Calculate display for current time
        let currentMinutes = Math.floor (currentTime / 60);
        if (currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;

        }
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;

        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;

}

// Event Listners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);