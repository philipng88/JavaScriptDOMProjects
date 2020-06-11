const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  const seatsText = document.getElementById('seats-text');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  seatsText.innerText = selectedSeatsCount === 1 ? 'seat' : 'seats';
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add('selected');
    });
  }
  if (selectedMovieIndex !== null)
    movieSelect.selectedIndex = selectedMovieIndex;
}

movieSelect.addEventListener('change', event => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

container.addEventListener('click', event => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    event.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

populateUI();
updateSelectedCount();
