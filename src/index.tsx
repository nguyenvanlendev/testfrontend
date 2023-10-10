import React, { useEffect } from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// import FontFaceObserver from 'fontfaceobserver';

import { Provider } from 'react-redux';
import store from './redux/store';
import './index.scss';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'react-image-crop/dist/ReactCrop.css';

if (window.navigator.appVersion.includes('Mac')) {
  require('./indexMac.scss');
} else {
  require('./indexWin.scss');
}

require('./index.scss');

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
// const openSansObserver = new FontFaceObserver('Inter', {});

// // When Inter is loaded, add a font-family using Inter to the body
// openSansObserver.load().then(() => {
//   document.body.classList.add('fontLoaded');
// });

const root = createRoot(document.getElementById('root') as HTMLElement);

// bo strict mode thi gio chi load 1 lan
// <React.StrictMode> </React.StrictMode>,

root.render(
  //provider --> redux
  <Provider store={store}>
    <App />
  </Provider>,
);
