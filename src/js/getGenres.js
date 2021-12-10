import axios from 'axios';
import Notiflix from 'notiflix';
import { BASE_URL, RELEVANT_GENRES_LIST, KEY, LANGUAGE } from './constants';

let relevantGenresList = [];
const getRelevantGenresIds = async () => {
  try {
    Notiflix.Loading.pulse({ svgColor: '#ff6b08' });

    const res = await axios.get(
      `${BASE_URL}${RELEVANT_GENRES_LIST}?api_key=${KEY}&language=${LANGUAGE}`,
    );
    const relevantGenresObj = await res.data;
    relevantGenresList = relevantGenresObj.genres;
    Notiflix.Loading.remove();
    return relevantGenresList;
  } catch (error) {
    console.log(error.message);
    Notiflix.Loading.remove();
  }
};

const convertIdsToGenres = arrayOfIds => {
  let arrOfGenres = [];
  arrayOfIds.forEach(number => {
    const genre = relevantGenresList.filter(obj => obj.id === number);
    if (!genre[0]) {
      arrOfGenres.push('Other');
      return;
    }
    arrOfGenres.push(genre[0].name);
  });
  if (arrOfGenres.length >= 3) {
    arrOfGenres.splice(2, arrOfGenres.length - 2, 'Other');
  }
  return arrOfGenres.join(', ');
};

export { getRelevantGenresIds, convertIdsToGenres };
