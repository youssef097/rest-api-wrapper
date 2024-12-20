# Locaria Challenge

## Overview

The **Locaria Challenge** project bridges two powerful platforms, **FINANCERO** (a financial billing system) and **ODERINO** (an order processing system), to aggregate and present a unified customer summary. The system allows operations teams to seamlessly query customer data by aggregating information from both platforms, including billing, invoices, orders, and delivery statuses.

This project provides a REST API wrapper that fetches data from the **FINANCERO** and **ODERINO** services and returns a summary of the customer's information.

## Table of Contents
1. [Setup](#setup)
2. [Environment Configuration](#environment-configuration)
3. [Project Structure](#project-structure)
4. [Scripts](#scripts)
5. [API Endpoints](#api-endpoints)
6. [Docker Setup](#docker-setup)

## Setup

To get started with the Locaria Challenge project, follow these steps:

### 1. Clone the repository
```bash
git clone git@github.com:youssef097/rest-api-wrapper.git
cd rest-api-wrapper
```
### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a .env file at the root of your project and add the following environment variables:

```env
FINANCERO_BASE_URL=https://financero.api.com/v1
ODERINO_BASE_URL=https://oderino.mockapi.com/v1
FINANCERO_MOCK_BASE_URL=https://financero.mockapi.com/v3-1
CACHE_TTL=300
```
For running the project with mock data, use the .env.mock configuration.

### 4. Start the project
You can start the project in different modes:

#### Run with Mock Data:

```bash
npm run dev-mock
```
#### Run the API:

```bash
npm run dev
```
### Build the Project:

```bash
npm run build
```
#### Start the Server:
```bash
npm start
```


Environment Configuration
.env (Production)
The .env file contains the base URLs for the services and the cache TTL configuration.
```env

FINANCERO_BASE_URL=https://financero.api.com/v1
ODERINO_BASE_URL=https://oderino.mockapi.com/v1
FINANCERO_MOCK_BASE_URL=https://financero.mockapi.com/v3-1
CACHE_TTL=300


```.env.mock``` (Mock Configuration)
This configuration file is used for running the project with mock data. It provides mock base URLs for the FINANCERO and ODERINO services and also runs the Wrapper API.
```env
FINANCERO_BASE_URL = http://localhost:4000/financero/v1
ODERINO_BASE_URL =  http://localhost:4001/orderino/v1

FINANCERO_MOCK_BASE_URL = http://localhost:4000/financero/mockapi/v3-1

CACHE_TTL = 300

PORT_FINANCERO = 4000
PORT_ORDERINO = 4001
```

## Project Structure
### The project consists of the following key directories and files:
```graphql

locaria-challenge/
│
├── dist/                   # Transpiled JavaScript files (output of `tsc`)
├── src/                    # TypeScript source code
│   ├── controllers/        # Customer API Controllers
│   ├── services/           # Services to interact with FINANCERO and ODERINO
│   ├── utils/              # Utility functions like caching
│   ├── mock_api_server.ts  # Mock API server for testing
│   ├── index.ts            # Main entry file for the application
│
├── .env                    # Environment variables for production
├── .env.mock               # Environment variables for mock data
├── Dockerfile              # Docker configuration for containerized deployment
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```
## Scripts
The package.json file contains the following scripts:

```dev-mock```: Runs the project with mock services using dotenv for environment variable configuration. This script runs the mock API server and the application.

```bash

npm run dev-mock
```
```dev```: Runs the application using nodemon to automatically reload when files change.

```bash
npm run dev
```
```build```: Builds the TypeScript project into JavaScript using tsc.

```bash
npm run build
```
```start```: Starts the project after building, running the transpiled JavaScript code.

```bash
npm start
```

### API Endpoints
### ```GET /customers/:customer_id/summary```
This endpoint returns a summary of a customer's information, including address, billing info, invoices, and orders.

Parameters:
```customer_id (path parameter): The unique identifier of the customer.```
Response:
```json

{
  "customer_id": "12345",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "billing_info": {
    "payment_terms": "Net 30",
    "credit_limit": 10000,
    "currency": "USD"
  },
  "invoices": [
    {
      "invoice_id": "INV-001",
      "amount": 5000,
      "currency": "USD",
      "status": "Paid",
      "due_date": "2024-12-31"
    },
    {
      "invoice_id": "INV-002",
      "amount": 3000,
      "currency": "USD",
      "status": "Pending",
      "due_date": "2024-11-30"
    }
  ],
  "orders": [
    {
      "order_id": "ORD-001",
      "status": "Delivered",
      "total_value": 2000,
      "currency": "USD"
    }
  ]
}
```
## Docker Setup
### Dockerfile
The Dockerfile defines the containerized setup for the application.

```dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
```
The Dockerfile installs the necessary dependencies, builds the project, and starts the application in a production environment.
To build and run the Docker container:
```bash

docker build -t locaria-challenge .
docker run -p 3000:3000 locaria-challenge
```
## Mock API Server
For testing purposes, the Mock API Server simulates the responses from the FINANCERO and ODERINO services.

### FINANCERO Mock Endpoints:

``` /financero/v1/customers/:customer_id/address
/financero/v1/customers/:customer_id/billing-info
/financero/mockapi/v3-1/customers/:customer_id/invoices
```
### ODERINO Mock Endpoints:
```
/oderino/v1/customers/:customer_id/orders
/oderino/v2/orders/:order_id
/oderino/v2/orders/:order_id/jobs
/oderino/v1/orders/:order_id/delivery
```
The mock API server runs locally on ports 4000 for FINANCERO and 4001 for ODERINO.

Start Mock API Server
Run the following command to start the mock servers:

```bash
npm run dev-mock
```