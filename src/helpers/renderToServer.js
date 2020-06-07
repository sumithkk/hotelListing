import path from 'path';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ChunkExtractor } from '@loadable/server';
import config, { getClientConfig } from 'server/config';
import Head from 'server/components/Head';
import Body from 'server/components/Body';
import { asyncMiddleware } from 'server/utils/express';
import { createApolloClient } from 'server/graphql/apolloClient';

const nodeStats = path.resolve(config.get('server.publicPath'), 'dist/node/loadable-stats.json');

const webStats = path.resolve(config.get('server.publicPath'), 'dist/web/loadable-stats.json');

const ssr = asyncMiddleware(async (req, res) => {
  const nodeExtractor = new ChunkExtractor({
    statsFile: nodeStats,
    outputPath: path.join(config.get('server.publicPath'), 'dist/node'),
  });
  const { default: App } = nodeExtractor.requireEntrypoint();

  const webExtractor = new ChunkExtractor({ statsFile: webStats });

  const apolloClient = createApolloClient();
  const routerContext = {};

  const helmetContext = {};
  const app = (
    <ApolloProvider client={apolloClient}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </ApolloProvider>
  );

  // Styled components
  const sheet = new ServerStyleSheet();
  let jsx = sheet.collectStyles(app);

  const { helmet } = helmetContext;
  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));
  const head = renderToString(<Head helmet={helmet} extractor={webExtractor} />);
  res.set('content-type', 'text/html');
  res.write(
    `<!DOCTYPE html><html ${helmet.htmlAttributes}><head>${head}</head><body ${helmet.bodyAttributes}><div id="root">`
  );
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    const body = renderToString(<Body helmet={helmet} />);
    res.end(`</div>${body}</body><script>
    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(/</g, '\\u003c')}
</script></html>`);
  });
});

export default ssr;
