## Application Routes
This folder is the "traffic controller" 🚦 for our app. It takes incoming requests from the browser (like `GET /listings` or `POST /login`) and makes sure they go to the right place in our code to get a response.

Each file here is an `Express.Router` that bundles together all the routes for a specific feature.

---

### `listings.js`

* **What it does:** This is the main router for our listings. It handles all the routes related to **Listings**.
* **Examples:**
    * `GET /listings` (Show all listings)
    * `GET /listings/:id` (Show one listing's details)
    * `POST /listings` (Create a new listing)
    * `PUT /listings/:id` (Update a listing)
    * `DELETE /listings/:id` (Delete a listing)

---

### `Routes.js` (Reviews)

*Note: This file is named `Routes.js`, but it most likely handles all the routes for **Reviews**.*

* **What it does:** This router manages creating and deleting reviews for a *specific* listing.
* **Examples:**
    * `POST /listings/:id/reviews` (Create a new review for a listing)
    * `DELETE /listings/:id/reviews/:reviewId` (Delete a specific review)

---

### `Users.js`

* **What it does:** This handles all our **User** authentication routes.
* **Examples:**
    * `GET /signup` (Show the signup form)
    * `POST /signup` (Handle new user registration)
    * `GET /login` (Show the login form)
    * `POST /login` (Handle user login)
    * `GET /logout` (Handle user logout)