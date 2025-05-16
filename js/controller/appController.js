import { renderSongCheckboxes } from '../view/view';

fetch('data/songs.json')
	.then((response) => response.json())
	.then((data) => {
		songs = data.songs;
		renderSongCheckboxes(songs);
	})
	.catch((error) => console.error('Error loading songs', error));
