let playlists = [];
let songs = [];

function setSongs(songList) {
	songs = songList;
}

function getSongs() {
	return songs;
}

function addPlaylist(name, selectedIndices) {
	const selectedSongs = selectedIndices.map((index) => songs[index]);
	const newPlaylist = { name, songs: selectedSongs };
	playlists.push(newPlaylist);
}

function getPlaylists() {
	return playlists;
}

export { addPlaylist, getPlaylists, getSongs, setSongs };
