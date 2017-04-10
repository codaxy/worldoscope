# Worldoscope

<img src="https://raw.githubusercontent.com/codaxy/worldoscope/master/assets/img/preview.png" alt="report" height="200px" />

This application allows you to create beautiful reports
by combining The World Bank database with a set of predefined section templates.
Use the application to explore thousands of indicators,
observe trends, find the best countries or compare your own country with the rest of the world.

https://wbdr.cxjs.io

## Usage

To run the application on your machine, do the following

```
yarn install
yarn start
```

If you're not using `yarn` yet, `npm` will do too.

## Technology

This is a [CxJS](https://cxjs.io) demo application and it illustrates the capabilites of the framework, its widgets, charts
and Material Design based theme.
Data needed for reports is fetched directly from [The World Bank API](http://data.worldbank.org/) endpoint.
SVG maps are based on free samples provided by [simplemaps.com](http://simplemaps.com/resources/svg-maps).
Besides CxJS, the application is built on top of modern web technologies such as
[React](https://facebook.github.io/react/),
[Babel](https://babeljs.io)
and [Webpack](https://webpack.js.org).
[Google Firebase](https://firebase.google.com/) is used to store report definitions, authentication and hosting.
[Circle CI](https://circleci.com/) is used for continuous deployment.

## License

This application is a part of [the CxJS framework](https://cxjs.io). Please visit our website for more information
on [CxJS licensing](https://cxjs.io).