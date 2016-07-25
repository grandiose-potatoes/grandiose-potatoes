# Project Name

> Vime

## Team

  - Development Team Members: Billy Lan, Michael De La Cruz, Edmund To, Clay Han

## Table of Contents

<!-- 1. [Usage](#Usage) -->
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

<!-- ## Usage

> Some usage instructions -->

## Requirements

- Node 4.4.7
- PostgreSQL, http://postgresapp.com/

## Development

### Installing Dependencies

From within the root directory:

First, create a .env file. Inside of the .env file, provide the ACCESS_KEY_ID, SECRET_ACCESS_KEY, and AWS_BUCKET.
```sh
touch .env
```

Install all npm dependencies.
```sh
npm install
```

Inside of Postgres, create a database for the project (we call it greenfield):
```sh
CREATE DATABASE greenfield;
```

This will populate database with questions.
```sh
npm run seed
```

This will start webpack.
```sh
npm run build:dev
```

Open the server with Nodemon.
```sh
npm start
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
