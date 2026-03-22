
import { ScoreCard } from './ScoreCard.js'

const savedData = localStorage.getItem('LeaderboardData');
const savedId = localStorage.getItem('ID');

const inputField = document.querySelector('.input_field');
const inputs = document.querySelectorAll('.input_bar');
const leaderboard = document.querySelector('.leaderboard');
const button = document.querySelector('.btn');
const errorMsg = document.createElement('h1');
const scoreCards = savedData ? JSON.parse(savedData).map((data) => new ScoreCard(data.firstName, data.lastName, data.time, data.id, data.country, data.points)) : [];


let id = savedId ? JSON.parse(savedId) : 0;
button.addEventListener('click', () => {
  let eligible = true;
    inputs.forEach((input) => {
      if (input.value.trim() === '') {
        errorMsg.textContent = 'All Fields are required';
        errorMsg.classList.add('error_message');
        inputField.appendChild(errorMsg);
        eligible = false;
      }
    })
    if (eligible == true) {
      errorMsg.textContent = ''; 
      const newCard = new ScoreCard(inputs[0].value, inputs[1].value, getCurrentDate(), id, inputs[2].value, Number(inputs[3].value))
      scoreCards.push(newCard);
      id++;
      sortRender();
      inputs.forEach((input) => input.value = '');
    }
})

leaderboard.addEventListener('click', (e) => {
  const delBtn = e.target.closest('.delete');
  if (delBtn) {
    const deleteC = delBtn.closest('.score_card');
    const player = scoreCards.find((player) => player.id === +deleteC.dataset.id);
    const delIndex = scoreCards.indexOf(player);
    if(player) {
     scoreCards.splice(delIndex, 1);
     sortRender();
    }
  }

  const plusBtn = e.target.closest('.plus');
  if (plusBtn) {
    const card = plusBtn.closest('.score_card');
    const player = scoreCards.find((player) => player.id === +card.dataset.id);

    if (player) {
    player.plusPoints();
    sortRender();
    }
  }

  const minusBtn = e.target.closest('.minus');
  if (minusBtn) {
    const card = minusBtn.closest('.score_card');
    const player = scoreCards.find((player) => player.id === +card.dataset.id);

    if (player) {
    player.minusPoints();
    sortRender();
    }
  }
})

const sortRender = () => {
  scoreCards.sort((a, b) => b.points - a.points);

  leaderboard.innerHTML = '';

  scoreCards.forEach((cards) => {
    const card = document.createElement('div');
    card.classList.add('score_card');
    card.innerHTML = cards.createCard();
    card.dataset.id = cards.id;
    leaderboard.appendChild(card);
  });

  localStorage.setItem('LeaderboardData', JSON.stringify(scoreCards));
  localStorage.setItem('ID', JSON.stringify(id));
}

const getCurrentDate = () => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  const now = new Date();
  const formattedDate = now.toLocaleString('en-US', options)
  .toUpperCase()
  .replace(',', '');

  return formattedDate
}

sortRender();



