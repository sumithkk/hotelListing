import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';
import { ServerStyleSheet } from 'styled-components';

export default (req, store, context) => {
  const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
  const styles = sheet.getStyleTags();
  // console.log(context);
  const content = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    )
  );
  const helmet = Helmet.renderStatic();

  return `<!DOCTYPE html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script src="https://kit.fontawesome.com/a68111132e.js" crossorigin="anonymous"></script>
                <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                <style>
                  body {
                    font-family: 'Rajdhani', sans-serif;
                  }
                </style>
                ${styles}
            </head>
            <body>
                <div id="root">${content}</div>
                <div class="cursor"></div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
                      /</g,
                      '\\u003c'
                    )}
                </script>
                <script src="/bundle.js"></script>
            </body>
    </html>`;
};
