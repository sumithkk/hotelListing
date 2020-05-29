import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import ErrorBoundary from './components/ErrorBoundry';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../helpers/global';

import Header from './pages/HotelHeader';
// import Footer from './components/Footer';

const App = ({ route }) => {
  return (
    // <ThemeProvider theme={themeMode}>
    //   <GlobalStyles />
    //   <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
    // </ThemeProvider>
    <div>
      {/* <GlobalStyles /> */}
      <Header />
      <div className="container">
        <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
      </div>
      {/* <Footer /> */}
    </div>
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
