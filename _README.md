# Project Name

> Vime

## Team

  - Development Team Members: Billy Lan, Michael De La Cruz, Edmund To, Clay Han

## Table of Contents

1. [Usage](#Usage)
1. [Required Applications](#Required-Applications)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Required Applications

- Node 4.4.7
- PostgreSQL, http://postgresapp.com/

## Development

### Installing Dependencies

From within the root directory:

```sh
touch .env
```
inside of the .env file, provide the ACCESS_KEY_ID, SECRET_ACCESS_KEY, and AWS_BUCKET
```sh
npm install
```
Inside of Postgres, create a database for the project (we call it greenfield):
```sh
CREATE DATABASE greenfield;
```
this will populate database with the questions
```sh
npm run seed
```

this will start webpack
```sh
npm run build:dev
```
opens server
```sh
npm start
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
