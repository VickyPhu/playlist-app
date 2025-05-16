import { addPlaylist, getPlaylists, setSongs } from '../model/model.js';
import { renderPlaylists, renderSongCheckboxes } from '../view/view.js';

const form = document.getElementById('playlist-form');
const cancelBtn = document.getElementById('cancel-btn');

function initApp() {
	fetch('data/songs.json')
		.then((response) => response.json())
		.then((data) => {
			setSongs(data.songs);
			renderSongCheckboxes(data.songs);
		})
		.catch((error) => console.error('Error loading songs', error));

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const name = document.getElementById('playlist-name').value;
		const selectedIndices = Array.from(
			document.querySelectorAll('input[name="song"]:checked')
		).map((checkbox) => parseInt(checkbox.value));

		addPlaylist(name, selectedIndices);
		form.reset();
		renderPlaylists(getPlaylists());
	});

	cancelBtn.addEventListener('click', () => {
		form.reset();
	});
}

export { initApp };
