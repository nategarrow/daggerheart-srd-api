# Daggerheart SRD API

A GraphQL API built with Express and Apollo Server to provide structured access to the contents of the Core Rulebook. This project enables clients to query rulebook data efficiently for use in web apps, tools, or integrations.

## Features

- GraphQL endpoint for flexible queries
- Built with Express and Apollo Server
- Organized data from the Core Rulebook

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/), [npm](https://www.npmjs.com/), or [yarn](https://yarnpkg.com/)

### Installation

```bash
pnpm install
# OR
npm install
# OR
yarn install
```

### Running the Server

```bash
pnpm start
# OR
npm start
# OR
yarn start
```

The server will start and the GraphQL playground will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql).

## Project Structure

```
.
├── src/
│   ├── index.js
│   └── routes/
│       ├── ancestry/
│       ├── classes/
│       ├── community/
│       └── subclasses/
├── package.json
└── README.md
```

## License

Daggerheart is licensed under its own Open Gaming License (OGL). For full details, see the official [Darrington Press Community Gaming License](https://darringtonpress.com/license/).

## Content Attribution

The contents used in this project are all freely available as part of the Daggerheart System Reference Document (SRD), which can be found [here](https://www.daggerheart.com/wp-content/uploads/2025/05/DH-SRD-May202025.pdf).