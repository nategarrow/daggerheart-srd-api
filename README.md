# Daggerheart API

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

See [LICENSE](./LICENSE) for details.
