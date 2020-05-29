import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../client/Routes';
import { ServerStyleSheet } from 'styled-components';
// import RajdhaniLite from '../fonts/Rajdhani-Light.ttf';

export default (req, store, context) => {
  const sheet = new ServerStyleSheet();
  const styles = sheet.getStyleTags();
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
            <html lang="en">
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <meta charset="utf-8">
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=0">
                <meta name="theme-color" content="#f2f2f2">
                <meta name="description" content="Sumith's Portfolio website" />
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap" rel="stylesheet">
                <link rel="apple-touch-icon" href="logo192.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="stylesheet" type="text/css" href="main.css">
                ${styles}
                <style>
                body, input {
                  margin:0;
                  font-family: 'Ubuntu', sans-serif;
                }
                h1, h2, h3 {
                  font-weight: 400;
                }
                ::-webkit-input-placeholder {
                  color: rgb(188, 190, 192);
                }
              
                :-ms-input-placeholder {
                  color: rgb(188, 190, 192);
                }
              
                ::placeholder {
                  color: rgb(188, 190, 192);
                }
                </style>
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
