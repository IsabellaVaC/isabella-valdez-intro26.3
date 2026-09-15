const apiKey = "5d7826d9fb35405aa289baae275f54e8";

fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const games = data.results;
        const gameContainer = document.getElementById('game-container');

        games.slice(0, 30).forEach(gameItem => {
            const gameElement = document.createElement('div');

            gameElement.innerHTML = `
                <h2>${gameItem.name}</h2>
                <img src="${gameItem.background_image}" alt="${gameItem.name}">
                <button data-game-id="${gameItem.id}">View Details</button>
                <p>${gameItem.genres.map(genre => genre.name).join(', ')}</p>
            `;

            gameContainer.appendChild(gameElement);
    
            gameElement.querySelector('button').addEventListener('click', () => {
                const gameId = gameElement.querySelector('button').dataset.gameId;

                fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        const gameDetailsContainer = document.getElementById('game-details');
                        gameDetailsContainer.innerHTML = `
                        <button id="back-button">Back to Games</button>
                            <h2>${data.name}</h2>
                            <img src="${data.background_image}" alt="${data.name}">
                            <p>Released: ${new Date(data.released).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                            <p>Rating: ${data.rating}</p>
                            <p>Genres: ${data.genres.map(genre => genre.name).join(', ')}</p>
                            <p>${data.description_raw}</p>
                        `;

                        const backButton = document.getElementById('back-button');
                        backButton.addEventListener('click', () => {
                            gameDetailsContainer.innerHTML = '';
                            gameContainer.scrollIntoView();
                        });
                        gameDetailsContainer.scrollIntoView();
                    })
                    .catch(error => console.error('Error fetching game details:', error));
            });
        });
    })
    .catch(error => console.error('Error fetching games:', error));

