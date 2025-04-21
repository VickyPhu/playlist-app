const playlists = [];

const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playListContainer = document.getElementById('playlist-container');
const playlistForm = document.getElementById('playlist-form');

fetch('songs.json')
	.then((res) => res.json())
	.then((data) => {
		songs = data.songs;
	})
	.catch((err) => console.error('Could not get songs', err));

createPlaylistBtn.addEventListener('click', () => {
	showPlaylistForm();
});

function showPlaylistForm() {
	playListContainer.innerHTML = '';

	const form = document.createElement('form');

	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'Playlist name';
	input.required = true;

	const createBtn = document.createElement('button');
	createBtn.type = 'button';
	createBtn.textContent = 'Create playlist';
	// add click to add playlist function

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.textContent = 'Cancel';
	// add click to cancel creation of a playlist

	form.append(input, songListElement, createBtn, cancelBtn);
	playListContainer.appendChild(form);
}
