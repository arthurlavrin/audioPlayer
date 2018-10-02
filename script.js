
	let songs = [
		'grigorij_leps_-_odinokij_volk_(zf.fm).mp3',
		'grigorij_leps_-_opjat_metel_(zvukoff.ru).mp3',
		'grigorij_leps_-_rjumka_vodki_na_stole_(zvukoff.ru).mp3',
		'grigorij_leps_-_samij_luchshij_den_(zvukoff.ru).mp3',
		'grigorij_leps_-_snega_(zf.fm).mp3',
		'grigorij_leps_-_ti_prishla_(zvukoff.ru).mp3',
		'grigorij_leps_-_ti_znaesh__tak_hochetsja_zhit_(zf.fm).mp3'
	];

	let songTitle = document.getElementById('song-title');
	let songSlider = document.getElementById('song-slider');
	let currentTimeEl = document.getElementById('current-time');
	let durationTime = document.getElementById('duration-time');
	let volumeSlider = document.getElementById('volume-slider');
	let nextSongTitle = document.getElementById('next-song-title');

	let song = new Audio();
	let currentSong = 0;

	window.onload = loadSong;

	function loadSong() {
		song.src = 'songs/' + songs[currentSong];
		songTitle.textContent = (currentSong + 1) + '. ' + songs[currentSong];
		nextSongTitle.innerHTML = '<b>Next Song: </b>' + songs[currentSong + 1 % songs.length];
		song.playbackRate = 1;
		song.volume = volumeSlider.value;
		song.play();
		setTimeout(showDuration, 1000);
	}

	setInterval(updateSongSlider, 1000);

	function updateSongSlider() {
		let c = Math.round(song.currentTime);
		songSlider.value = c;
		currentTimeEl.textContent = convertTime(c);
		if (song.ended) {
			next();
		}
	}
	
	function convertTime(secs) {
		let min = Math.floor(secs/60);
		let sec = secs % 60;
		min = (min < 10) ? '0' + min : min;
		sec = (sec < 10) ? '0' + sec : sec;
		return (min + ':' + sec);
	}
	
	function showDuration() {
		let d = Math.floor(song.duration);
		songSlider.setAttribute('max', d);
		durationTime.textContent = convertTime(d);
	}
	
	function playOrPauseSong(img) {
		song.playbackRate = 1;
		if (song.paused) {
			song.play();
			img.src = 'pause.png';
		} else {
			song.pause();
			img.src = 'play.png';
		}
	}

	function next() {
		currentSong = currentSong + 1 % songs.length;
		loadSong();
	}

	function previous() {
		currentSong -= 1;
		currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
		loadSong();
	}

	// songSlider.addEventListener('input', seekSong, false);



	function seekSong() {
		song.currentTime = songSlider.value;
		currentTimeEl.textContent = convertTime(songSlider.value);
	}

	function adjustVolume() {
		song.volume = volumeSlider.value;
	}

	function increasePlaybackRate() {
		songs.playbackRate += 0.5;
	}

	function decreasePlaybackRate() {
		songs.playbackRate -= 0.5;
	}

	// document.getElementById('slider').addEventListener('input', function () {
	// 	console.log(document.getElementById('slider').value);
	// 	let er = document.getElementById('slider').value;
	// 	document.getElementById('slider-div').innerHTML = er;
	// });



