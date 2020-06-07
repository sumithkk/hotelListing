import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';

import Header from './pages/HotelHeader';
// import Footer from './components/Footer';

const App = ({ route }) => {
  return (
    <React.Fragment>
      <Header />
      <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  route: null,
};

export default {
  component: App,
};
