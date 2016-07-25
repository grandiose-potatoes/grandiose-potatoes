# Project Name

> Vime

## Team

  - Development Team Members: Billy Lan, Michael De La Cruz, Edmund To, Clay Han

## Table of Contents

<!-- 1. [Usage](#Usage) -->
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
<!--     1. [Tasks](#tasks) -->
1. [Team](#team)
<!-- 1. [Contributing](#contributing) -->

<!-- ## Usage

> Some usage instructions -->

## Requirements

- Node 4.4.7
- PostgreSQL, http://postgresapp.com/

## Development

### Installing Dependencies

From within the root directory:

Install all npm dependencies.
```sh
npm install
```

Inside of Postgres (the terminal if you are using PostgresApp), create a database for the project (we call it greenfield):
```sh
CREATE DATABASE greenfield;
```

Populate the database with questions for the user.
```sh
npm run seed
```

Allows WebRTC's (the video player) adapter.js to stay updated.
```sh
npm run postinstall
```

Initiate webpack.
```sh
npm run build:dev
```

Open the server with Nodemon.
```sh
npm start
```

Once the app is up and running, you will need to create an Amazon S3 account to host recorded videos. https://aws.amazon.com/s3/

In your root directory, create a .env file.
```sh
touch .env
```

Inside of the .env file, provide the ACCESS_KEY_ID, SECRET_ACCESS_KEY, and AWS_BUCKET. You can create an AWS bucket inside of the S3 account. You .env file should look like this:
```sh
ACCESS_KEY_ID=<your-access-key-id>
SECRET_ACCESS_KEY=<your-secret-access-key>
AWS_BUCKET=<your-aws-bucket>
```

<!-- ### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines. -->
