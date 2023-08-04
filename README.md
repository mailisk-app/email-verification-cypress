# Cypress email verification - Mailisk

This is an example app that shows how to use Cypress to test email verification functionality. It uses [Mailisk](https://mailisk.com) and it's [Cypress library](https://github.com/mailisk-app/cypress-mailisk).

This example includes a simple full stack React (NextJs) and Express application. The Express server uses [Mailisk SMTP](https://mailisk.com/blog/blog/smtp-now-available) to send emails, these emails can only be sent to an address that ends in `@{namespace}.mailisk.net`.

## Install packages

You will need to install packages in all directories. Run the following command in the root directory:

```shell
npm --prefix ./server install ./server \
npm --prefix ./app install ./app
```

## Setup

### Get namespace and api key

The Api Key and namespace can be found in your dashboard. See the [Getting Started](https://docs.mailisk.com) guide for detailed steps

Create a `.env` file in the root project directory. Add the following lines from your settings:

```ini
API_KEY=<api key>
NAMESPACE=<yournamespace>
```

### Setup Cypress env

To be able to use the API you will need to add your [API key](http://docs.mailisk.com/#getting-your-api-key) to `cypress.config.js`. You will also need to set your namespace:

```js
module.exports = defineConfig({
  env: {
    MAILISK_API_KEY: "YOUR_API_KEY",
    MAILISK_NAMESPACE: "YOUR_NAMESPACE",
  },
});
```

## Running the app and server

Head into the `app` folder and run:

```shell
npm run dev
```

Then go into the `server` folder and run:

```shell
npm run dev
```

## Running tests

To run the test open Cypress by running the following command in the `app` folder:

```shell
npx cypress run
```

Alternatively you can run the tests using the GUI version by running the following command and going under E2E tests:

```shell
npx cypress open
```
