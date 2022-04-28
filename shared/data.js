const music1 = "wellerman";
const music2 = "muffinSong";
const music3 = "runaway";
const music4 = "weCantStop";
const music5 = "running";

// mock api for the music uploads
export const SONGS = [
  {
    id: 1,
    src: `/musics/${music1}.m4a`,
    picture: `/musicPicture/${music1}.jpg`,
    text: "Wellerman",
    artist: "Nathan Evans",
  },
  {
    id: 2,
    src: `/musics/${music2}.m4a`,
    picture: `/musicPicture/${music2}.jpg`,
    text: "Muffin Song",
    artist: "asdfmovie",
  },
  {
    id: 3,
    src: `/musics/${music3}.m4a`,
    picture: `/musicPicture/${music3}.jpg`,
    text: "runaway",
    artist: "Aurora",
  },
  {
    id: 4,
    src: `/musics/${music4}.m4a`,
    picture: `/musicPicture/${music4}.jpg`,
    text: "We Can't Stop",
    artist: "Miley Cyrus",
  },
  {
    id: 5,
    src: `/musics/${music5}.m4a`,
    picture: `/musicPicture/${music5}.jpg`,
    text: "running",
    artist: "Naughty boy ft Beyonce",
  },
];
