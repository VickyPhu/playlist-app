import { renderSongCheckboxes } from '../view/view.js';

const form = document.getElementById('playlist-form');
const cancelBtn = document.getElementById('cancel-btn');

function initApp() {
	fetch('data/songs.json')
		.then((response) => response.json())
		.then((data) => {
			songs = data.songs;
			renderSongCheckboxes(songs);
		})
		.catch((error) => console.error('Error loading songs', error));

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
		renderPlaylists();
	});

	cancelBtn.addEventListener('click', () => {
		form.reset();
	});
}

export { initApp };
