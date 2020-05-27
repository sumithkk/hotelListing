import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ArticleListPage from './pages/ArticleListPage';
import HotelListing from './pages/hotelListing';
import App from './App';
import hotelDetails from './pages/hotelDetails';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        path: '/articles/:id',
        ...ArticleListPage,
      },
      {
        path: '/hotels/:id',
        ...HotelListing,
      },
      {
        path: '/hotel-details/:id',
        ...hotelDetails,
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
