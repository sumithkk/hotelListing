import { FETCH_LOCATION } from '../actions/index';
import { FETCH_HOTELS } from '../actions/index';
import { FETCH_HOTEL_DETAILS } from '../actions/index';
import { FETCH_HOTEL_PHOTOS } from '../actions/index';
import { FETCHING_IMAGES } from '../actions/index';
import { FETCHING_HOTELS } from '../actions/index';
import { ADVANCE_PAGE } from '../actions/index';
import { SET_HEADER } from '../actions/index';

let initialState = {
  userLocation: {},
  searchSuggestions: [],
  hotelList: [],
  hotelDetails: [],
  hotelPhotos: [],
  page: 0,
  fetchingimages: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HEADER:
      return {
        ...state,
        headerData: action.payload,
      };
    case FETCH_LOCATION:
      return {
        ...state,
        searchSuggestions: action.payload,
      };
    case FETCH_HOTELS:
      if (state.page === 0) {
        return {
          ...state,
          hotelList: action.payload,
        };
      } else {
        return {
          ...state,
          hotelList: {
            ...state.hotelList,
            hotels: { ...state.hotelList.hotel.concat(action.payload.hotels) },
          },
        };
      }

    case FETCH_HOTEL_DETAILS:
      return {
        ...state,
        hotelDetails: action.payload,
      };
    case FETCH_HOTEL_PHOTOS:
      return {
        ...state,
        hotelPhotos: action.payload,
      };
    case FETCHING_HOTELS:
      return {
        ...state,
        fetchingHotels: action.fetching,
      };
    case FETCHING_IMAGES:
      return { ...state, fetching: action.fetching };
    case ADVANCE_PAGE:
      return { ...state, page: state.page + 1 };

    default:
      return state;
  }
};
