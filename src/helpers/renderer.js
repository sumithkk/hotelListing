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
import { renderToNodeStream } from 'react-dom/server';

export default async (req, res, store, context) => {
  const sheet = new ServerStyleSheet();

  // const styles = sheet.getStyleTags();
  console.log('================REQ=====================');
  console.log(req);
  res.write(`<!DOCTYPE html>
  <html lang="en">
  <head>
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
      <meta charset="utf-8">
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=0">
      <meta name="theme-color" content="#f2f2f2">
      <meta name="description" content="Sumith's Portfolio website" />
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap" rel="stylesheet">
      <link rel="apple-touch-icon" href="logo192.png" />
      <link rel="manifest" href="/manifest.json" /></head><body><div id="root">`);

  const content = sheet.collectStyles(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <React.Fragment>{renderRoutes(Routes)}</React.Fragment>
      </StaticRouter>
    </Provider>
  );
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(content));
  const helmet = Helmet.renderStatic();

  //   const { beforeHead, afterHead } = await getIndexHtmlParts;
  //   res.write(`${beforeHead}
  //     ${helmet.title.toString()}
  //     ${helmet.meta.toString()}
  //     ${helmet.link.toString()}
  //     ${afterHead}<div id="root">
  // `);

  stream.pipe(res, { end: false });
  stream.on('end', () => res.end('</div></body></html>'));

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
                ${stream}
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

// const renderReactApp = (app, stylesheet, res) =>
//   new Promise((resolve, reject) => {
//     const stream = stylesheet.interleaveWithNodeStream(renderToNodeStream(app));
//     stream.on('data', (chunk) => res.write(chunk));
//     stream.on('end', () => resolve());
//     stream.on('error', reject);
//   });
// const { beforeHead, afterHead } = await getIndexHtmlParts;
// res.write(`${beforeHead}
//     ${helmetContext.helmet.title.toString()}
//     ${helmetContext.helmet.meta.toString()}
//     ${helmetContext.helmet.link.toString()}
//     ${helmetContext.helmet.script.toString()}
//     ${afterHead}<div id="root">
// `);
// await renderReactApp(reactApp, styledComponents, res);
// const finalState = store.getState();
// res.status(200);
// res.end(`</div>
// ${chunkExtractor.getScriptTags()}
//   <script type="text/javascript">window.INITIAL_STATE = ${JSON.stringify(finalState).replace(
//     /</g,
//     '\\u003c'
//   )}</script>
// </div>
// `);
