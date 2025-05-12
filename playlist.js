let songs = [];
const playlists = [];
let selectedSongs = [];

const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playlistContainer = document.getElementById('playlist-container');
const playlistForm = document.getElementById('playlist-form');
const container = document.getElementById('main-container');

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
	createPlaylistBtn.style.display = 'none';
	playlistForm.innerHTML = '';
	playlistForm.style.display = 'block';

	const form = document.createElement('form');

	const input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'Playlist name';
	input.required = true;

	const songListElement = createSongList();
	form.appendChild(songListElement);

	const createBtn = document.createElement('button');
	createBtn.type = 'button';
	createBtn.textContent = 'Save playlist';
	createBtn.addEventListener('click', () => {
		createPlaylist(input);
	});

	const cancelBtn = document.createElement('button');
	cancelBtn.type = 'button';
	cancelBtn.textContent = 'Cancel';
	cancelBtn.addEventListener('click', () => {
		playlistForm.innerHTML = '';
		selectedSongs = [];
		document.getElementById('create-playlist-btn').style.display =
			'inline-block';
		playlistForm.style.display = 'none';
	});

	form.append(input, songListElement, createBtn, cancelBtn);
	playlistForm.appendChild(form);
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
		songList.appendChild(songItem);
		songItem.appendChild(addButton);
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
	console.log('Skapar spellista:', newPlaylist);

	playlists.push(newPlaylist);
	selectedSongs = [];
	renderPlaylists();

	playlistForm.innerHTML = '';
}

function renderPlaylists() {
	console.log('Rendering playlists:', playlists);
	playlistContainer.innerHTML = '';

	playlists.forEach((playlist) => {
		const playlistElement = document.createElement('div');
		const playlistTitle = document.createElement('h3');
		playlistTitle.textContent = playlist.name;

		playlistElement.appendChild(playlistTitle);
		playlistContainer.appendChild(playlistElement);
		playlistElement.addEventListener('click', () =>
			showPlaylistSongs(playlist)
		);
	});
}

function showPlaylistSongs(playlist) {
	container.innerHTML = '';

	const playlistTitle = document.createElement('h1');
	playlistTitle.textContent = playlist.name;

	const songList = document.createElement('ul');
	playlist.songs.forEach((song) => {
		const li = document.createElement('li');
		li.textContent = `${song.title} - ${song.artist} - ${song.genre}`;
		songList.appendChild(li);
	});
	container.appendChild(playlistTitle);
	container.appendChild(songList);
}
