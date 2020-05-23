import axios from 'axios';
import config from '../../../config';

export const FETCH_ARTICLES = 'fetch_articles';

export const fetchArticles = (source) => async (dispatch) => {
  // const res = await axios.get(url);

  const config = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/properties/list',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      'x-rapidapi-key': '4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8',
      useQueryString: true,
    },
    params: {
      currency: 'USD',
      locale: 'en_US',
      sortOrder: 'PRICE',
      destinationId: '1506246',
      pageNumber: '1',
      checkIn: '2020-01-08',
      checkOut: '2020-01-15',
      pageSize: '25',
      adults1: '1',
    },
  };

  // let res = await axios(config);

  // console.log(res.data);

  dispatch({
    type: FETCH_ARTICLES,
    payload: config,
  });
};
