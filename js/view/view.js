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

function renderPlaylists(playlists) {
	playlistList.innerHTML = '';

	playlists.forEach((playlist, index) => {
		const li = document.createElement('li');
		li.style.cursor = 'pointer';
		li.style.marginBottom = '10px';

		const title = document.createElement('strong');
		title.textContent = playlist.name;

		const songTable = document.createElement('table');
		songTable.style.display = 'none';
		songTable.border = 1;
		songTable.cellPadding = '5';

		const thead = document.createElement('thead');
		const headerRow = document.createElement('tr');

		const thTitle = document.createElement('th');
		thTitle.textContent = 'Title';
		const thArtist = document.createElement('th');
		thArtist.textContent = 'Artist';
		const thGenre = document.createElement('th');
		thGenre.textContent = 'Genre';

		headerRow.append(thTitle, thArtist, thGenre);
		thead.appendChild(headerRow);
		songTable.appendChild(thead);

		const tbody = document.createElement('tbody');
		playlist.songs.forEach((song) => {
			const row = document.createElement('tr');

			const tdTitle = document.createElement('td');
			tdTitle.textContent = song.title;

			const tdArtist = document.createElement('td');
			tdArtist.textContent = song.artist;

			const tdGenre = document.createElement('td');
			tdGenre.textContent = song.genre;

			row.append(tdTitle, tdArtist, tdGenre);
			tbody.appendChild(row);
		});
		songTable.appendChild(tbody);

		li.addEventListener('click', () => {
			songTable.style.display =
				songTable.style.display === 'none' ? 'table' : 'none';
		});

		li.appendChild(title);
		li.appendChild(songTable);
		playlistList.appendChild(li);
	});
}

export { renderPlaylists, renderSongCheckboxes };
