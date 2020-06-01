import NotFoundPage from './pages/NotFoundPage';
import ArticleListPage from './pages/ArticleListPage';
import HotelListing from './pages/hotelListing';
import App from './App';
import hotelDetails from './pages/hotelDetails';

// Params for hotel List
//     currency: 'USD',
//     locale: 'en_US',
//     sortOrder: 'PRICE',
//     destinationId: '678196',
//     pageNumber: '1',
//     checkIn: '2020-01-08',
//     checkOut: '2020-01-15',
//     pageSize: '25',
//     adults1: '1',
// *****************************
// Params for hotel details
//     locale: 'en_US',
//     currency: 'USD',
//     checkOut: '2020-01-15',
//     adults1: '1',uhiu
//     checkIn: '2020-01-08',
//     id: '898940032',

export default [
  {
    ...App,
    routes: [
      {
        ...ArticleListPage,
        path: '/',
        exact: true,
      },
      {
        path: '/articles/:id',
        ...ArticleListPage,
      },
      {
        path: '/hotels/:destinationId/:sortOrder/:checkIn/:checkOut/:adults/:page/',
        ...HotelListing,
      },
      {
        path: '/hotel-details/:id/:checkIn/:checkOut/:adults',
        ...hotelDetails,
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
