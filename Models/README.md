## Mongoose Schemas

This folder holds all the Mongoose schemas for our project. Basically, it's the blueprint for how all our data is structured in the database.

---

### `Listing.js`

This is the big one—it's for the main property listings.

* **What's inside?**
    It holds all the main info for a listing, like its `title`, `description`, `image`, `price`, `location`, `country`, and the `geometry` data for the map.

* **How it's connected:**
    * `owner`: This just links to the `User` who posted the listing.
    * `reviews`: This is an array that keeps track of all the `Review` IDs for this one listing.

* **Special trick:**
    We've added a piece of code (a `post("findOneAndDelete")` middleware) that automatically cleans up the database. If you delete a listing, this code will find all its reviews and delete them too. No orphan reviews left behind!

---

### `Review.js`

* **What's inside?**
    This has the main stuff for a review, like the `body` (the text of the review) and a `rating` (like 1-5 stars).

* **How it's connected:**
    It has an `author` field that links to the `User` who wrote it.

---

### `user.js`

* **What's inside?**
    This file is for user accounts. It has the user's `email` and `username`. The `password` itself is handled by Passport, so we just store the secure, hashed version. This file is what lets users sign up and log in.