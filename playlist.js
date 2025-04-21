const playlists = [];
let selectedSongs = [];

const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playlistContainer = document.getElementById('playlist-container');
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
	playlistContainer.innerHTML = '';

	const form = document.createElement('form');

	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'Playlist name';
	input.required = true;

	const songListElement = createSongList();
	form.appendChild(songListElement);

	const createBtn = document.createElement('button');
	createBtn.type = 'button';
	createBtn.textContent = 'Create playlist';
    createBtn.addEventListener('click', () => {
        createPlaylist(input)
    } )

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.textContent = 'Cancel';
	// add click to cancel creation of a playlist

	form.append(input, songListElement, createBtn, cancelBtn);
	playlistContainer.appendChild(form);
}

function createSongList() {
	const songList = document.createElement('ul');

	songs.forEach((song) => {
		const songItem = document.createElement('li');
		const addButton = document.createElement('button');

		const isSelected = selectedSongs.some((s) => s.id === song.id);
		addButton.textContent = isSelected ? 'Remove' : 'Add';

		addButton.addEventListener('click', (e) => {
			e.preventDefault();

			const index = selectedSongs.findIndex((s) => s.id === song.id);

			if (index === -1) {
				selectedSongs.push(song);
				addButton.textContent = 'Remove';
			} else {
				selectedSongs.splice(index, 1);
				addButton.textContent = 'Add';
			}
		});

		songItem.textContent = `${song.title} – ${song.artist} - ${song.genre} `;
		songItem.appendChild(addButton);
		songList.appendChild(songItem);
	});

	return songList;
}

function createPlaylist(inputElement) {
    const playlistName = inputElement.value.trim();
    if (!playlistName) return;

    const newPlaylist = {
        name: playlistName,
        songs: [...selectedSongs],
    };

    playlists.push(newPlaylist);
    selectedSongs = [];
    // renderPlayLists();

    playlistContainer.innerHTML = '';
}
