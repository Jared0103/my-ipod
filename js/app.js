const music = document.getElementById('audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

let currentMusic = 0;


playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play()
    } else {
        music.pause()
    }
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play')
});

const setMusic = index => {
    seekBar.value = 0
    let song = songs[index]
    currentMusic = index
    music.src = song.path
    songName.innerHTML = song.name
    artistName.innerHTML = song.artist
    disk.style.backgroundImage = `url(${song.cover})`
    currentTime.innerHTML = '00:00'
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
};

const formatTime = time => {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = `0${secs}`;
    }
    return `${minutes}:${secs}`;
};

setMusic(0);

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    // No es necesario avanzar automáticamente a la siguiente canción aquí.
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
};

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length -1 
    } else {
        currentMusic--
    }
    setMusic(currentMusic);
    playMusic();
})