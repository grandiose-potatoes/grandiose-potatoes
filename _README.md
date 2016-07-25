# Project Name

> Pithy project description

## Team

  - __Product Owner__: teamMember
  - __Scrum Master__: teamMember
  - __Development Team Members__: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 4.4.7
- PostgreSQL, http://postgresapp.com/

## Development

### Installing Dependencies

From within the root directory:

```sh
touch .env
//inside of the .env file, provide the ACCESS_KEY_ID, SECRET_ACCESS_KEY, and AWS_BUCKET
npm install

Inside of Postgres, create a database for the project (we call it greenfield):
CREATE DATABASE greenfield;

//this will populate database with the questions
npm run seed

//this will start webpack
npm run build:dev

//opens server
npm start


```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
