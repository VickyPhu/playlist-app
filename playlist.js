fetch('songs.json')
	.then((response) => response.json())
	.then((data) => {
		songs = data.songs;
		populateSelect(songs);
	})
	.catch((error) => console.error('Error loading songs', error));


