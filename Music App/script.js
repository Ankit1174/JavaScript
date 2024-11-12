console.log("connected");

let song = new Audio();
let playBtn = document.getElementById("playBtn");
let backwardBtn = document.getElementById("backwardBtn");
let forwardBtn = document.getElementById("forwardBtn");
let gif = document.getElementById("gif");
let progressBar = document.getElementById("progressBar");
let songContainer = document.getElementsByClassName("songsContainer");
let icons = document.getElementsByClassName("fa-circle-play");
let songInfo = Array.from(document.getElementsByClassName("songInfo"));
let songIndex = 0;

let  songs = [
    {songName: "Shiv-Tandav(PagalNew.Com.Se)", songPath: "songs\\Shiv-Tandav(PagalNew.Com.Se).mp3"},
    {songName: "Shri Hanuman Chalisa", songPath: "songs\\Shri Hanuman Chalisa.mp3"},
    {songName: "Achyutam-Keshavam(PagalNew.Com.Se)", songPath: "songs\\Achyutam-Keshavam(PagalNew.Com.Se).mp3"},
    {songName: "Shri Krishna Govind Hare Murari_320(PagalWorld.com.sb)", songPath: "songs\\Shri Krishna Govind Hare Murari_320(PagalWorld.com.sb).mp3"},
    {songName: "Ram Siya Ram - Adipurush 320 Kbps", songPath: "songs\\Ram Siya Ram - Adipurush 320 Kbps.mp3"},
    {songName: "Aayi Nai_64(PagalWorld.com.sb)", songPath: "songs\\Aayi Nai_64(PagalWorld.com.sb).mp3"},
    {songName: "Aaj Ki Raat_64(PagalWorld.com.sb)", songPath: "songs\\Aaj Ki Raat_64(PagalWorld.com.sb).mp3"},
    {songName: "Bhool Bhulaiyaa 3_64(PagalWorld.com.sb)", songPath: "songs\\Bhool Bhulaiyaa 3_64(PagalWorld.com.sb).mp3"},
    {songName: "Jaana Samjho Na_64(PagalWorld.com.sb)", songPath: "songs\\Jaana Samjho Na_64(PagalWorld.com.sb).mp3"},
    {songName: "Kesariya (Dance Mix)_64(PagalWorld.com.sb)", songPath: "songs\\Kesariya (Dance Mix)_64(PagalWorld.com.sb).mp3"},
]
songInfo.forEach((element,i) => {
    // console.log(element,i);
    element.getElementsByClassName("songName")[songIndex].innerText = songs[i].songName;

})

playBtn.addEventListener('click', () => {
    
    if(song.paused || song.currentTime <= 0) {
        song.play();
        playBtn.classList.remove("fa-circle-play");
        playBtn.classList.add("fa-circle-pause");
        gif.style.opacity =  1;
    }
    else {
        song.pause();
        playBtn.classList.add("fa-circle-play");
        playBtn.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
    }
})

forwardBtn.addEventListener('click', () => {
   songIndex = (songIndex + 1) % songs.length;
   song.src =  songs[songIndex].songPath;
   document.querySelector(".songInfo .songName").innerText = songs[songIndex].songName;
   playBtn.classList.remove("fa-circle-play");
   playBtn.classList.add("fa-circle-pause");
   gif.style.opacity =  1;
   song.play();
})

backwardBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1) % songs.length;
    song.src =  songs[songIndex].songPath;
    document.querySelector(".songInfo .songName").innerText = songs[songIndex].songName;
    song.play();
 }) 


 Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        const songName = e.target.getAttribute("data-songname"); // Get song name from data attribute
        const songData = songs.find(s => s.songName === songName); // Find song by name in array

        if (songData) {
            // If the clicked icon is already showing "pause", then pause the song
            if (e.target.classList.contains("fa-circle-pause")) {
                song.pause();
                e.target.classList.remove("fa-circle-pause");
                e.target.classList.add("fa-circle-play");
                gif.style.opacity = 0; // Hide gif when paused

                // Change the main play button to "play"
                playBtn.classList.remove("fa-circle-pause");
                playBtn.classList.add("fa-circle-play");
            } else {
                // Reset all play/pause icons to "play" for other songs
                Array.from(document.getElementsByClassName("songItemPlay")).forEach(icon => {
                    icon.classList.remove("fa-circle-pause");
                    icon.classList.add("fa-circle-play");
                });

                // Update the clicked icon to "pause"
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");

                // Play the selected song
                song.src = songData.songPath;
                song.currentTime = 0;
                song.play();

                // Update song info display
                document.querySelector(".songInfo .songName").innerText = songData.songName;

                // Change the main play button to "pause"
                playBtn.classList.remove("fa-circle-play");
                playBtn.classList.add("fa-circle-pause");

                gif.style.opacity = 1; // Show the gif while playing
            }
        } else {
            console.error("Song not found:", songName);
        }
    });
});




song.addEventListener('timeupdate', () => {
    progress = parseInt((song.currentTime/song.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    song.currentTime = progressBar.value*song.duration/100;
})