## tesseract-demo

A simple Tesseract demo

Supported languages: **English** & **Russian**

Stack: [EJS](https://ejs.co/), [Express](https://expressjs.com/), [Node](https://nodejs.org/), [Tesseract](https://www.npmjs.com/package/node-tesseract-ocr)

DEV: http://localhost:1111

STAGE: https://tesseract-demo.herokuapp.com

### Deploy

Install [`tesseract`](https://formulae.brew.sh/formula/tesseract) first:

```shell script
brew install tesseract
```

Install language pack:

```shell script
brew install tesseract-lang
```

Check the list of supported languages:

```shell script
tesseract --list-langs
```

Deploy the project:

```shell script
git clone https://github.com/peterdee/tesseract-demo.git
cd ./tesseract-demo
nvm use 14
npm i
```

### Launch

```shell script
npm run dev
```

### Heroku

This project uses a custom Heroku buildpack: https://github.com/peterdee/heroku-buildpack-tesseract-en-ru

The `stage` branch is deployed to Heroku automatically.
