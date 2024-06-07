# Real Estate Management API [Rentify Backend | Hackathon]

This is a Node.js application built with Express and MongoDB for managing users and properties. It includes endpoints for user registration, authentication, and property management.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [User Endpoints](#user-endpoints)
  - [Property Endpoints](#property-endpoints)
  - [Email Service](#email-service)
- [Error Handling](#error-handling)
- [License](#license)

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/ashdude14/rentify-back-end.git
    ```

2. Navigate to the project directory:

    ```sh
    cd rentify-back-end

    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

## Environment Variables
Create a `.env` file in the root directory of the project and add your MongoDB URI and other configurations:

```plaintext
MONGO_URI=your_mongodb_uri
PORT=
JWT_SECRET=
EMAIL_USER=madisen.nikolaus@ethereal.email
EMAIL_PASS=WRz1CMEA87xAhFdVYK
HOST=smtp.ethereal.email
```
## Usage
To start the server, run:

```sh
npm start
```
The server will start on the port specified in the .env file or the default port 5000.

## Endpoints
# Health Check
```
GET /
```
Returns a message indicating the server is running.

Response:

```json
{
  "message": "started!!"
}
```
# User Endpoints
```
URL: /api/users
```
Methods: Various methods for user registration, authentication, and management.
File: ./routes/userRoutes.js

# Property Endpoints
```
URL: /api/properties
```
Methods: Various methods for property creation, updating, deletion, and fetching.
File: ./routes/propertyRoutes.js
Example Configuration for Mongoose
The application connects to MongoDB using Mongoose. Here is an example configuration:

```js

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err) {
    console.log('Error while connecting with MongoDb', err);
  }
}
run().catch(console.dir);
```
# Email Service
Email Service
This application uses Nodemailer to send emails. Below is the setup:

Configure Nodemailer:

```js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```
Example usage to send an email:

```js

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'This is a test email from Nodemailer using Ethereal.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
```
## Error Handling
All endpoints return a standard error response in case of failure:

```json

{
  "error": "Error message"
}
```
Common Error Codes
```json
400: Bad Request
404: Not Found
500: Internal Server Error
```
## License
This project is licensed under the MIT License.







