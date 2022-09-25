# Nodejs API test examples

Examples of how to test a Node.js API that makes backend calls to external services.

e.g. browser -> [API -> external service]

## Testing Examples

There are examples for running tests using Jest, Nock, Cypress and Playwright.

## TL;DR

Cypress and Playwright alone can't be used as they test at the browser level and so cannot intercept calls node from the backend.

So you're left with two options:

1. Jest mock the module making the backend calls

2. Use a tool like msw to mock the backend calls

## Tests so from

At the moment the examples show mocking calls made to the [Pokemon API](https://pokeapi.co/)