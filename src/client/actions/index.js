import axios from 'axios';
import config from '../../../config';

import LocationData from '../../stubs/hotels/location-search.json';
import HotelListData from '../../stubs/hotels/property-list.json';
import HotelDetailsData from '../../stubs/hotels/property-get-details.json';
import HotelPhotosData from '../../stubs/hotels/hotel-photos.json';
import { formatHotelData } from '../../helpers/transformers';

export const FETCH_LOCATION = 'fetch_locatioin';
export const FETCH_HOTELS = 'fetch_hotels';
export const FETCH_HOTEL_DETAILS = 'fetch_hotel_details';
export const FETCH_HOTEL_PHOTOS = 'fetch_hotel_photos';
export const FETCHING_HOTELS = 'fetching_hotels';
export const ADVANCE_PAGE = 'advance_page';

export const NextPage = () => (dispatch) => {
  dispatch({ type: ADVANCE_PAGE });
};

// export const FETCH_ARTICLES = 'fetch_articles';

// export const fetchArticles = (source) => async (dispatch) => {
//   let url;
//   if (source) {
//     url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${config.apikey}`;
//   } else {
//     url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apikey}`;
//   }

//   const res = await axios.get(url);

//   dispatch({
//     type: FETCH_ARTICLES,
//     payload: res.data.articles,
//   });
// };

export const locationSearch = (source) => async (dispatch) => {
  // const axios = require('axios');

  // axios({
  //   method: 'GET',
  //   url: 'https://hotels4.p.rapidapi.com/locations/search',
  //   headers: {
  //     'content-type': 'application/octet-stream',
  //     'x-rapidapi-host': 'hotels4.p.rapidapi.com',
  //     'x-rapidapi-key': '4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8',
  //     useQueryString: true,
  //   },
  //   params: {
  //     locale: 'en_US',
  //     query: 'new york',
  //   },
  // })
  //   .then((response) => {
  //     console.log(response);
  //     dispatch({
  //       type: FETCH_LOCATION,
  //       payload: response,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  console.log(LocationData);
  dispatch({
    type: FETCH_LOCATION,
    payload: LocationData,
  });
};

export const getPropertyList = (source) => async (dispatch) => {
  // const axios = require('axios');

  // axios({
  //   method: 'GET',
  //   url: 'https://hotels4.p.rapidapi.com/properties/list',
  //   headers: {
  //     'content-type': 'application/octet-stream',
  //     'x-rapidapi-host': 'hotels4.p.rapidapi.com',
  //     'x-rapidapi-key': '4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8',
  //     useQueryString: true,
  //   },
  //   params: {
  //     currency: 'USD',
  //     locale: 'en_US',
  //     sortOrder: 'PRICE',
  //     destinationId: '678196',
  //     pageNumber: '1',
  //     checkIn: '2020-01-08',
  //     checkOut: '2020-01-15',
  //     pageSize: '25',
  //     adults1: '1',
  //   },
  // })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  dispatch({
    type: FETCHING_HOTELS,
    fetching: true,
  });
  const getData = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        let formatedData = formatHotelData(HotelListData.data);
        console.log(formatedData);
        resolve(formatedData);
      }, 1000)
    );
  let res = await getData();
  dispatch({
    type: FETCHING_HOTELS,
    fetching: false,
  });

  dispatch({ type: 'FETCHING_IMAGES', fetching: false });

  dispatch({
    type: FETCH_HOTELS,
    payload: res,
  });
};

export const getHotelDetails = (source) => async (dispatch) => {
  // const axios = require('axios');

  // axios({
  //   method: 'GET',
  //   url: 'https://hotels4.p.rapidapi.com/properties/get-details',
  //   headers: {
  //     'content-type': 'application/octet-stream',
  //     'x-rapidapi-host': 'hotels4.p.rapidapi.com',
  //     'x-rapidapi-key': '4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8',
  //     useQueryString: true,
  //   },
  //   params: {
  //     locale: 'en_US',
  //     currency: 'USD',
  //     checkOut: '2020-01-15',
  //     adults1: '1',
  //     checkIn: '2020-01-08',
  //     id: '898940032',
  //   },
  // })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  dispatch({
    type: FETCHING_HOTELS,
    fetching: true,
  });
  const getHotelData = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        // let formatedData = formatHotelData(HotelListData.data);
        // console.log(formatedData);
        resolve(HotelDetailsData);
      }, 1000)
    );
  let res = await getHotelData();

  dispatch({
    type: FETCH_HOTEL_DETAILS,
    payload: res,
  });

  dispatch({
    type: FETCHING_HOTELS,
    fetching: false,
  });
};

export const getHotelPhotos = (source) => async (dispatch) => {
  // const axios = require('axios');

  // axios({
  //   method: 'GET',
  //   url: 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos',
  //   headers: {
  //     'content-type': 'application/octet-stream',
  //     'x-rapidapi-host': 'hotels4.p.rapidapi.com',
  //     'x-rapidapi-key': '4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8',
  //     useQueryString: true,
  //   },
  //   params: {
  //     id: '898940032',
  //   },
  // })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  dispatch({
    type: FETCHING_HOTELS,
    fetching: true,
  });
  const getHotelData = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        // let formatedData = formatHotelData(HotelListData.data);
        // console.log(formatedData);
        resolve(HotelPhotosData);
      }, 1000)
    );
  let res = await getHotelData();

  dispatch({
    type: FETCH_HOTEL_PHOTOS,
    payload: res,
  });

  dispatch({
    type: FETCHING_HOTELS,
    fetching: false,
  });
};
