/* Get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll(".player__button");
const fullscreenToggle = player.querySelector(".fullscreen");
const ranges = player.querySelectorAll(".player__slider");

/* Build out functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayButton() {
  toggle.textContent = this.paused ? "▮▮" : "▶";
}

function skip() {
  const skipAmount = this.dataset.skip || 0;
  video.currentTime += parseFloat(skipAmount);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up event listeners */
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);

skipButtons.forEach((button) => button.addEventListener("click", skip));

fullscreenToggle.addEventListener("click", toggleFullscreen);

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

video.addEventListener("timeupdate", handleProgress);

let progressMouseDown = false;
progress.addEventListener("mousedown", () => (progressMouseDown = true));
progress.addEventListener("mouseup", () => (progressMouseDown = false));
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => progressMouseDown && scrub(e));
