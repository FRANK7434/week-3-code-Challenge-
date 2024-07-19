document.addEventListener('DOMContentLoaded', () => {
    const filmsUrl = 'http://localhost:3000/films';
    const filmsList = document.getElementById('films');
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const ticketNum = document.getElementById('ticket-num');
    const buyTicketButton = document.getElementById('buy-ticket');

    let currentFilm = null;

    // Fetch all films
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(films => {
            // Display the list of all films
            filmsList.innerHTML = '';
            films.forEach(film => {
                const li = document.createElement('li');
                li.className = 'film item';
                li.textContent = film.title;
                li.addEventListener('click', () => {
                    displayFilmDetails(film);
                });
                filmsList.appendChild(li);
            });

            // Display the first film's details
            if (films.length > 0) {
                displayFilmDetails(films[0]);
            }
        });

    // Function to display film details
    function displayFilmDetails(film) {
        currentFilm = film;
        poster.src = film.poster;
        title.textContent = film.title;
        runtime.textContent = `${film.runtime} minutes`;
        showtime.textContent = film.showtime;
        ticketNum.textContent = film.capacity - film.tickets_sold;

        if (film.capacity - film.tickets_sold === 0) {
            buyTicketButton.disabled = true;
        } else {
            buyTicketButton.disabled = false;
        }
    }

    // Event listener for buy ticket button
    buyTicketButton.addEventListener('click', () => {
        if (currentFilm && currentFilm.capacity - currentFilm.tickets_sold > 0) {
            currentFilm.tickets_sold++;
            ticketNum.textContent = currentFilm.capacity - currentFilm.tickets_sold;

            if (currentFilm.capacity - currentFilm.tickets_sold === 0) {
                buyTicketButton.disabled = true;
            }
        }
    });
});
