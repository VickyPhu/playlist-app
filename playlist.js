const selectSong = document.getElementById('select-song');

let songs = [];

fetch('songs.json')
	.then((response) => response.json())
	.then((data) => {
		songs = data.songs;
		populateSelect(songs);
	})
	.catch((error) => console.error('Error loading songs', error));

function populateSelect(songs) {
	songs.forEach((song, index) => {
		const option = document.createElement('option');
		option.value = index;
		option.textContent = `${song.title} - ${song.artist}`
		selectSong.appendChild(option)
	})
}
