# YoTuTor

A) Cac extension can co trong VSC can co:

1. Reactjs code snippets
2. JavaScript (ES6) code snippets
   (VD: clg --> console.log())
3. VSCode React Refactor
4. The Bracket Pair Colorizer
5. The change-case extension.
6. The Duplicate Selection extension.
7. The EditorConfig for VS Code extension.
8. The npm Intellisense extension.
9. The ESLint extension.
    npm install -g eslint
    ./node_modules/.bin/eslint --init
10. Prettier – Code formatted
11. Code Spell Checker
12. ESLint (https://viblo.asia/p/tim-hieu-ve-eslint-va-cach-cau-hinh-trong-react-RnB5prb7ZPG)

B) Cau hinh eslintConfig de team cung code theo format:
eslintConfig trong package.json

C) Cai dat & run project:

1. Build node: npm install / yarn install
2. yarn build ( hoac "b")
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

D) Cai dat test:
<!-- yarn add react-test-renderer -->
<!-- npm i --save-dev @types/react-test-renderer -->
<!-- yarn add enzyme enzyme-adapter-react-16 -->
<!-- yarn add  @types/enzyme -->
<!-- https://docs.cypress.io/guides/component-testing/component-framework-configuration#React -->
<!-- https://github.com/cypress-io/cypress-component-testing-apps/blob/main/react-cra5-ts/tsconfig.json -->
npm install -D cypress
npm install cypress --save-dev
npx cypress open

E) Xu ly cac loi thuong gap:
https://thewebdev.info/2022/05/07/how-to-fix-eslint-with-react-giving-no-unused-vars-errors/
