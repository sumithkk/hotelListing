import NotFoundPage from './pages/NotFoundPage';
import Homepage from './pages/Homepage';
import HotelListing from './pages/hotelListing';
import App from './App';
import hotelDetails from './pages/hotelDetails';

export default [
  {
    ...App,
    routes: [
      {
        ...Homepage,
        path: '/',
        exact: true,
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
