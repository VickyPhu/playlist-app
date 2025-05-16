const form = document.getElementById('playlist-form');
const songCheckboxes = document.getElementById('song-checkboxes');
const cancelBtn = document.getElementById('cancel-btn');

const playlists = [];
let songs = [];

fetch('songs.json')
	.then((response) => response.json())
	.then((data) => {
		songs = data.songs;
		populateCheckboxes(songs);
	})
	.catch((error) => console.error('Error loading songs', error));

function populateCheckboxes(songs) {
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

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const name = document.getElementById('playlist-name').value;
	const selectedIndices = Array.from(
		document.querySelectorAll('input[name="song"]:checked')
	).map((checkbox) => parseInt(checkbox.value));

	const selectedSongs = selectedIndices.map((i) => songs[i]);

	console.log(playlists);

	playlists.push({
		name: name,
		songs: selectedSongs,
	});

	form.reset();
});

cancelBtn.addEventListener('click', () => {
	form.reset();
});
