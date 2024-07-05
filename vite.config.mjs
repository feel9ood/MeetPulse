import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const pageData = {
  '/index.html': {
    title: 'MeetPulse',
  },
  '/404.html': {
    title: '404',
  },
};

export default {
  root: resolve(__dirname, 'src'),
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
  base: 'MeetPulse',
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        collection: resolve(__dirname, 'src/collection.html'),
        events: resolve(__dirname, 'src/events.html'),
        places: resolve(__dirname, 'src/places.html'),
        search: resolve(__dirname, 'src/search.html'),
        eventItem: resolve(__dirname, 'src/event-item.html'),
        placeItem: resolve(__dirname, 'src/place-item.html'),
        collectionItem: resolve(__dirname, 'src/collection-item.html'),
        404: resolve(__dirname, 'src/404.html'),
      }
    }
  }
};