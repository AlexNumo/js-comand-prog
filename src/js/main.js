import { getRelevantGenresIds } from './getGenres';
import { fetchFilms, clearQueryString } from './fetchFilms';
import { refs } from './refs';
import { KEY, BASE_URL, POPULAR_FILM_FETCH, SEARCH__MOVIE, LANGUAGE } from './constants';
import { openInfoModal } from './openInfoModal';
import { onMyLibraryClick, onHomeClick } from './header';
import { pagination } from './pagination';
import { renderFilmsMarkup } from './renderFilmsMarkup';
import './Trailer/onTrailerBtnClick';
import './snow';

getRelevantGenresIds();

async function onHomePageHandler(e) {
  e.preventDefault();
  clearQueryString();
  refs.form.reset();
  sessionStorage.removeItem('mainPage');
  buildMarkup(await fetchFilms({ page: 1 }));
}

refs.homeLink.addEventListener('click', onHomePageHandler);
refs.homeLogo.addEventListener('click', onHomePageHandler);

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  sessionStorage.removeItem('mainPage');
  let searchValue = e.target.elements.search.value.trim();
  if (!searchValue) {
    //TODO!!!!!!!!!!!!!!!!!!!!подключить NOTYFLIX!!!!!!!!!!!!!!!!
    console.error('query string can not be empty');
  }
  buildMarkup(await fetchFilms({ query: searchValue, type: SEARCH__MOVIE }));
});

refs.container.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const filmId = e.target.dataset.id;
  openInfoModal(e);
});

refs.myLibrary.addEventListener('click', onMyLibraryClick);
refs.homeLink.addEventListener('click', onHomeClick);
refs.homeLogo.addEventListener('click', onHomeClick);

refs.showWatchedBtn.addEventListener('click', e => {
  if (!refs.showWatchedBtn.classList.contains('header__button--active')) {
    refs.showWatchedBtn.classList.add('header__button--active');
    refs.showQueueBtn.classList.remove('header__button--active');
    // Серёга, добавляй свою функцию после этой строчки :)
  }
});
refs.showQueueBtn.addEventListener('click', e => {
  if (refs.showWatchedBtn.classList.contains('header__button--active')) {
    refs.showWatchedBtn.classList.remove('header__button--active');
    refs.showQueueBtn.classList.add('header__button--active');
    // Серёга, добавляй свою функцию после этой строчки :)
  }
});

function buildMarkup({ results, total_results, page }) {
  renderFilmsMarkup(results);
  pagination({ totalItems: total_results, page }, onClickPagePagination);
}

async function onClickPagePagination(eventData) {
  sessionStorage.setItem('mainPage', eventData.page);
  buildMarkup(await fetchFilms({ page: eventData.page }));
}

(async function () {
  let page = Number(sessionStorage.getItem('mainPage')) || 1;
  buildMarkup(await fetchFilms({ page }));
})();
