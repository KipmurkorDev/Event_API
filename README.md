# eventhive_backed

It is an event web application.

# Event and User API

This is a simple Node.js API for managing events and user accounts. It uses the Express framework for routing and handling HTTP requests. The API provides endpoints for creating, retrieving, updating, and deleting events, as well as user registration and authentication.

## Deployment on AWS EC2

This project has been deployed on an AWS EC2 instance and is accessible at the following URL:

[http://ec2-51-20-84-219.eu-north-1.compute.amazonaws.com](http://ec2-51-20-84-219.eu-north-1.compute.amazonaws.com)

## Image Deployment with Cloudinary

Images used in this application are managed and served using [Cloudinary](https://cloudinary.com). Cloudinary is a cloud-based image and video management service that provides features for uploading, storing, transforming, and delivering media assets.

To utilize Cloudinary for image deployment, make sure your application has the necessary environment variables configured for Cloudinary, including:

- `CLOUDINARY_URL`: Your Cloudinary URL containing API key, secret, and cloud name.

This project is set up to work seamlessly with Cloudinary to enhance image management and delivery.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies using `npm install` or `yarn install`.

3. Set up environment variables for your application. You should have environment variables for your database connection and any other sensitive information.

4. Run the application using `npm start` or `yarn start`.

5. The API will be available at the deployed AWS EC2 URL.

## Project Structure

The project is structured as follows:

- `eventRouter.js`: This module exports an Express router for handling event-related endpoints.

  - `eventRouter.use(authMiddleware)`: Middleware for authentication.
  - `eventRouter.get("/", getAllEvents)`: Get all events.
  - `eventRouter.post("/", upload.single("image"), addEvent)`: Create a new event.
  - `eventRouter.delete("/:eventId", deleteEvent)`: Delete an event by ID.
  - `eventRouter.put("/:eventId", upload.single("image"), editEvent)`: Update an event by ID.

- `userRouter.js`: This module exports an Express router for handling user-related endpoints.
  - `userRouter.post("/signup", userSignup)`: User registration.
  - `userRouter.post("/login", userLogin)`: User login to obtain an authentication token.

## Dependencies

Make sure to install the necessary dependencies by running `npm install` or `yarn install`:

- Express: A minimal and flexible Node.js web application framework.
- Multer: Middleware for handling file uploads (used for event images).

## Environment Variables

Ensure you have set up the necessary environment variables for your project. Common environment variables include:

- `DB_CONNECTION`: Database connection string.
- `JWT_SECRET`: Secret key for JSON Web Tokens.
- `PORT`: Port on which the server should listen.

## Contribute

Feel free to contribute to this project by creating issues or pull requests. We appreciate your input and suggestions for improvement.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
