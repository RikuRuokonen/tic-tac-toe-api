# TIC-TAC-TOE-API

Tic-Tac-Toe-Api is web-api for playing tic-tac-toe

## Installation

Clone repository
From the reppository, use the package manager NPM to install dependencies.

```bash
npm install
nodemon index.js
```
Add .env file with "PORT" key and desired value. App should run on localhost:{PORT}. Env.sample file should help you.

## Usage

Use Postman/Insomnia/similar software to ping api
Api has 4 endpoints
- /api/start:
  Starts new game
- /api/do-move
  After starting the game, you can use this endpoint to actually place X/O to 2D-array.
  Example of JSON-body of the request:
  {
    "move": {
      "row": "1",
      "column": "1"
    }
  }
  Example request places mark in center of board.
- /api/status
  Returns status of current game
- /api/reset
  Resets the game. Currently works exactly like start endpoint, but could be more easily expandable in future.

## TODO

-Move data to database
-Add additional checks to request body
-Add tests to validators

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
