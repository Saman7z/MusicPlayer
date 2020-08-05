// always declare vars first :|
const prevBtn = document.querySelector(".prev-btn");
const palyBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".next-btn");
const imgIndex = document.querySelector(".img-container");
const songTitle = document.querySelector(".info");
const audio = document.getElementById("audio");
const img = document.getElementById("music-img");
//
let playlist = ["hey", "Summer", "ukulele"];
let songIndex = 0;
const playTheSong = () => {
  imgIndex.classList.add("play");
  palyBtn.innerHTML = "<i class='fa fa-pause fa-2x'></i>";
  // document.querySelector(".music-info-container").style.display = "flex";
  // document.querySelector(".progress-container").style.display = "flex";
  document.querySelector(".music-info-container").style.opacity = 1;
  document.querySelector(".progress-container").style.opacity = 1;
  audio.play();
};
const pauseTheSong = () => {
  imgIndex.classList.remove("play");
  palyBtn.innerHTML = "<i class='fa fa-play fa-2x'></i>";
  // document.querySelector(".music-info-container").style.display = "none";
  // document.querySelector(".progress-container").style.display = "none";
  document.querySelector(".music-info-container").style.opacity = 0;
  document.querySelector(".progress-container").style.opacity = 0;
  audio.pause();
};
const loadTheApp = (name, changeByClick= false) => {
  songTitle.innerText = name;
  img.src = `./images/${name}.jpg`;
  audio.src = `./music/${name}.mp3`;
  // todo : create playlist visual
  if(changeByClick){
    playTheSong()
  }
  //document.querySelector(".duration-time").innerText = audio.srcElement.duration;
  // console.log(audio.srcElement.duration)
  // console.log(Math.floor(audio.duration))
};
palyBtn.addEventListener("click", () => {
  let isPlaying = imgIndex.classList.contains("play");
  if (isPlaying) {
    pauseTheSong();
  } else {
    playTheSong();
  }
});
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = playlist.length - 1;
  }
  loadTheApp(playlist[songIndex]);
  playTheSong();
};
const nextSong = () => {
  songIndex++;
  if (songIndex > playlist.length - 1) {
    songIndex = 0;
  }
  loadTheApp(playlist[songIndex]);
  playTheSong();
};
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  let percentPassed = (currentTime / duration) * 100;
  document.querySelector(".progrees").style.width = `${percentPassed}%`;
  
  if (isNaN(duration)) {
    
    durationMins = "00";
    durationSecs = "00";
  } else {
   
     durationMins = Math.floor(duration / 60);
    if (durationMins < 10) {
      durationMins = "0" + String(durationMins);
    }
     durationSecs = Math.floor(duration % 60);
    if (durationSecs < 10) {
      durationSecs = "0" + String(durationSecs);
    }
    
  }
  let mins = Math.floor(audio.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  let secs = Math.floor(audio.currentTime % 60);
  if (secs < 10) {
    secs = "0" + secs;
  }
  document.querySelector(".current-time").innerText = `${mins}:${secs}`;

  document.querySelector(
    ".duration-time"
  ).innerText = `${durationMins}:${durationSecs}`;
};
const setProgress = (e) => {
  //console.log(e.offsetX)
  let totalWidth = e.srcElement.clientWidth;
  let clickedWidth = e.offsetX;
  let duration = audio.duration;
  audio.currentTime = (clickedWidth / totalWidth) * duration;
};
//prevBTn
prevBtn.addEventListener("click", prevSong);
//nextBTn
nextBtn.addEventListener("click", nextSong);

//init
loadTheApp(playlist[songIndex]);

audio.addEventListener("timeupdate", updateProgress);
document.querySelector(".progress-bar").addEventListener("click", setProgress);

//song ends
audio.addEventListener("ended", nextSong);

//load the playlist
const loadPlaylist = (list) => {

document.querySelector(".playlist-container").innerHTML = `${list.map(item => `<div class="item" onclick="loadTheApp('${item}',true)">
<img class="item-img" src="./images/${item}.jpg">
<p class="item-title">${item}</p>
</div>`).join("")}`

/*`${list.map(item => `<div class="item" style="background: url(./images/${item}.jpg) no-repeat center/cover;" onclick="loadTheApp('${item}',true)">
${item}
</div>`)
.join("")}`
}*/
}
loadPlaylist(playlist)