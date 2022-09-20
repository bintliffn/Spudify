//MUST PASS IN A SINGLE SONG FOR CODE TO WORK
//THIS IS DIFFERENT FOR DIFFERENT ENDPOINTS
//For recommendations/top tracks endpoints simply pass returnedArray[indexOfSongYouWantDataFor]
//For recently played tracks pass returnedArray[indexOfSongYouWantDataFor].track

const song = (SingleJsonSong) => {
    //extract the song name, album name, and artist name for a track
    songName = SingleJsonSong.name;
    artistName = SingleJsonSong.artists[0].name;
    albumName = SingleJsonSong.album.name;

    //extract album cover image of 300 x 300 size
    albumCoverUrl = SingleJsonSong.album.images[2].url;
    console.log(albumCoverUrl)
}

export default song;