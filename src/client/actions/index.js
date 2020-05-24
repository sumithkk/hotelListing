import axios from 'axios';
import config from '../../../config';

import RestaurantList from '../../stubs/attractionList.json';

export const FETCH_ARTICLES = 'fetch_articles';

export const fetchArticles = (data) => async (dispatch) => {
  // const res = await axios.get(url);

  // const axios = require('axios');
  let res = {};

  new Promise((resolve, reject) => {
    //do something
    if (data) {
      resolve(RestaurantList);
    }
  })
    .then((response) => {
      console.log(response);
      res = response.data;
      dispatch({
        type: FETCH_ARTICLES,
        payload: res,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // let res = await axios(data);

  // console.log(res.data);

  // dispatch({
  //   type: FETCH_ARTICLES,
  //   payload: res,
  // });
};
