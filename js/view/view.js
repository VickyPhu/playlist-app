const songCheckboxes = document.getElementById('song-checkboxes');
const playlistList = document.getElementById('playlist-list');

function renderSongCheckboxes(songs) {
	songCheckboxes.innerHTML = '';

    songs.forEach((song, index) => {
		const label = document.createElement('label');
		label.style.display = 'block';

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.value = index;
		checkbox.name = 'song';

		label.appendChild(checkbox);
		label.appendChild(
			document.createTextNode(`${song.title} - ${song.artist}`)
		);
		songCheckboxes.appendChild(label);
	});
}
