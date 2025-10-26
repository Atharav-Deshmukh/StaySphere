# StaySphere
StaySphere is a full-stack web application inspired by Airbnb. It allows users to browse, create, edit, delete, and review property listings. This project is built on the MVC (Model-View-Controller) architecture and integrates multiple services for a complete user experience, including authentication, image hosting, and interactive maps.

This project is live and deployed on Render. (Note: Link is from your Render logs, it may be different if you redeployed.)

---

## Features

* Full CRUD Functionality: Users can Create, Read, Update, and Delete property listings.
* User Authentication: Secure user sign-up, log-in, and log-out functionality using Passport.js.
* Authorization: Users must be logged in to create listings and can only edit or delete their own properties
* Reviews: Logged-in users can post reviews (one per user, per listing) and delete their own reviews.
* Image Uploads: Property images are uploaded and hosted securely on Cloudinary.
* Interactive Maps: Integrates the Mapbox API to display the location of each listing on a map.
* Server-Side Validation: Uses Joi to validate data for new listings and reviews, preventing bad data from being saved.
* Flash Messages: Provides user feedback for actions like successful login, errors, or new reviews.
* Responsive Design: Styled with Bootstrap for a consistent look across all devices.

---

## Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (with Mongoose)
* View Engine: EJS (Embedded JavaScript) with ejs-mate for layouts.
* Authentication: Passport.js with the passport-local strategy.
* Image Hosting: Cloudinary (using multer-storage-cloudinary).
* Maps: Mapbox API
* Validation: Joi
* Deployment: Render

---
