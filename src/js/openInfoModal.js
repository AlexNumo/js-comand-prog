import { getTrailerUrl } from './Trailer/getTrailerUrl';
import { refs } from './refs';
let currentId = 0;
export function openInfoModal(e) {
  // e.preventDefault()
  const modalName = refs.modalLink.getAttribute('data-info-modal');
  const modal = document.querySelector('.js-info-modal');
  const modalInfoWrapper = document.querySelector('.info-modal-wrapper');

  modal.classList.add('is-shown');
  refs.modalOverlay.classList.add('is-shown');
  const data = {
    popularity: e.target.dataset.popularity,
    url: e.target.dataset.url,
    title: e.target.alt,
    id: e.target.dataset.id,
    overview: e.target.dataset.overview,
    rating: e.target.dataset.rating,
    votes: e.target.dataset.count,
    original: e.target.dataset.original,
    genres: e.target.dataset.genres,
  };
  console.log(e.target.dataset.original);
  const { popularity, url, title, id, overview, rating, votes, original, genres } = data;
  currentId = data.id;
  console.log(data.url);
  const infoModalContent = `     <div class="modal__card-img">
    <img src="${url}" alt="${title}" width="200px" class="modal__img" />
  </div>
  <div class="modal__table-wrap">
    <table class="modal__table">
      <tbody>
        <tr>
          <th colspan="2">${title}</th>
        </tr>
        <tr>
          <th>Vote / Votes</th>
          <td><span>${rating}</span>/ ${votes}</td>
        </tr>
        <tr>
          <th>Popularity</th>
          <td>${popularity}</td>
        </tr>
        <tr>
          <th>Original Title</th>
          <td>${original}</td>
        </tr>
        <tr>
        
          <th>Genres</th>
          <td>${genres}</td>
        </tr>
      </tbody>
    </table>
    <div class="about">
      <h3>About</h3>
      <p>${overview}</p>
    </div>
  </div>
  
  `;
  modalInfoWrapper.innerHTML = infoModalContent;
  getTrailerUrl(id);
  refs.openTrailerBtn.setAttribute('data-id', id);
}
refs.modalClose.addEventListener('click', function () {
  refs.modalClose.parentNode.classList.remove('is-shown');
  refs.modalOverlay.classList.remove('is-shown');
});

refs.modalOverlay.addEventListener('click', function () {
  refs.modalClose.parentNode.classList.remove('is-shown');
  refs.modalOverlay.classList.remove('is-shown');
});
let savedFilms = [];
let watchedFilms = [];
// let targetID = e.target.dataset.id;
refs.addWatched.addEventListener('click', e => {
  // const currentId = e.target.dataset.id;
  // console.log(currentId);
  if (!watchedFilms.includes(currentId)) {
    watchedFilms.push(currentId);
    return console.log('watched add', watchedFilms);
  }
  const index = watchedFilms.indexOf(currentId);
  watchedFilms.splice(index, 1);
  return console.log('watched remove', watchedFilms);
});
refs.addQueue.addEventListener('click', e => {
  if (!savedFilms.includes(currentId)) {
    savedFilms.push(currentId);
    return console.log('saved add', savedFilms);
  }
  const index = savedFilms.indexOf(currentId);
  savedFilms.splice(index, 1);
  return console.log('saved remove', savedFilms);
});

// let targetID = e.target.dataset.id;
refs.watchedBtn.addEventListener('click', e => {
  // const currentId = e.target.dataset.id;
  // console.log(currentId);
  if (!watchedFilms.includes(currentId)) {
    watchedFilms.push(currentId);
    return console.log('watched add', watchedFilms);
  }
  const index = watchedFilms.indexOf(currentId);
  watchedFilms.splice(index, 1);
  return console.log('watched remove', watchedFilms);
});
refs.queueBtn.addEventListener('click', e => {
  if (!savedFilms.includes(currentId)) {
    savedFilms.push(currentId);
    return console.log('saved add', savedFilms);
  }
  const index = savedFilms.indexOf(currentId);
  savedFilms.splice(index, 1);
  return console.log('saved remove', savedFilms);
});

// function addInQueue(id) {
//   if (!savedFilms.includes(id)) {
//     savedFilms.push(id);
//     return;
//   }
//   index = savedFilms.indexOf(id);
//   savedFilms.splice(index, 1)
//   return
// }
// function addInWatched(id) {
//   if (!watchedFilms.includes(id)) {
//     return watchedFilms.push(id);
//   }
//   index = watchedFilms.indexOf(id);
//   watchedFilms.splice(index, 1)
//   return
// }
console.log('saved', savedFilms);
console.log('watched', watchedFilms);