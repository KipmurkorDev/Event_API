# EventHive Backend

**EventHive** is a web application for managing events and user accounts.

## Event and User API

This Node.js API provides functionality for managing events and user accounts. It is built on the Express framework for routing and handling HTTP requests. The API includes endpoints for creating, retrieving, updating, and deleting events, as well as user registration and authentication.

## Deployment on AWS EC2

This project is hosted on an AWS EC2 instance and can be accessed via the following URL: [EventHive on AWS EC2](http://ec2-51-20-84-219.eu-north-1.compute.amazonaws.com)

## Image Deployment with Cloudinary

EventHive uses Cloudinary for managing and serving images. Cloudinary is a cloud-based image and video management service that offers features for uploading, storing, transforming, and delivering media assets. To enable Cloudinary image deployment, configure the required environment variable:

- `CLOUDINARY_URL`: Your Cloudinary URL containing API key, secret, and cloud name.

EventHive is seamlessly integrated with Cloudinary for efficient image management and delivery.

## Getting Started

To begin using this project, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies using `npm install` or `yarn install`.

3. Configure environment variables for your application, including database connection details and any other sensitive information.

4. Start the application with `npm start` or `yarn start`.

5. Access the API at the deployed AWS EC2 URL.

## Project Structure

The project is structured as follows:

- `GET "/events/"`: Retrieve all events.
- `GET "events/:eventId"`: Retrieve a specific event.
- `POST "/events/category"`: Get the category of an event.
- Middleware: `.use(authMiddleware)`. Authentication is required for the routes below.
- `GET "/events/my-events"`: Retrieve events created by the user.
- `POST "/events/"`: Create a new event.
- `DELETE "/events/:eventId"`: Users can delete events they have created.
- `PUT "/events/:eventId"`: Users can update events they have created.

- `POST "/users/signup"`: User registration.
- `POST "/users/login"`: User login to obtain an authentication token.

## Dependencies

Ensure you have installed the necessary dependencies using `npm install` or `yarn install`. The key dependencies include:

- Express: A minimal and flexible Node.js web application framework.
- Multer: Middleware for handling file uploads (used for event images).

## Environment Variables

Make sure to set up the required environment variables for your project. Common environment variables include:

- `DB_CONNECTION`: Database connection string.
- `JWT_SECRET`: Secret key for JSON Web Tokens.
- `PORT`: The port on which the server should listen.

## Contribute

You are encouraged to contribute to this project by creating issues or pull requests. Your input and suggestions for improvement are highly appreciated.

## License

This project is licensed under the MIT License. Refer to the [LICENSE](LICENSE) file for more details.
