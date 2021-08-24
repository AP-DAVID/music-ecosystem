let currentlyPlaying = null;

const play = (name) => {
    if (currentlyPlaying) {
        audios[currentlyPlaying].pause();
    }
    audios[name].play();
    currentlyPlaying = name;
};

const pause = (name) => {
    currentlyPlaying = null;
    audios[name].pause();
};

export default {
    pause,
    play
};