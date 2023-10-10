// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// // react-testing-library renders your components to document.body,
// // this adds jest-dom's custom assertions
// import '@testing-library/jest-dom/extend-expect';

// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
// import 'jest-styled-components';

//DUNG ENZYME
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
