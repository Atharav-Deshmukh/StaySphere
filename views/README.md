## Views (EJS Templates)

This folder holds all the EJS files for our project. It's the "front-end" part of our server-side code.

These files are the HTML templates that we fill with data (like listing info or user details) before sending them to the user's browser. 🖥️

---

### `includes/`

* **What's inside?** This is for small, reusable pieces of HTML, often called "partials."
* **Examples:**
    * `navbar.ejs` (The navigation bar at the top of every page)
    * `footer.ejs` (The footer at the bottom of every page)
    * `flash.ejs` (The alert messages for success or errors)

---

### `layouts/`

* **What's inside?** This contains our main "boilerplate" template, probably called `boilerplate.ejs`.
* **How it works:** Instead of writing the `<head>`, `<body>`, and linking all our CSS and JS files in *every single* EJS file, we just do it once here. All our other pages (like `index.ejs` or `show.ejs`) are injected into this main layout.

---

### `listings/`

* **What's inside?** This holds all the EJS pages related to **Listings**.
* **Examples:**
    * `index.ejs` (The main page that shows all listings)
    * `show.ejs` (The details page for one listing)
    * `new.ejs` (The form to create a new listing)
    * `edit.ejs` (The form to edit an existing listing)

---

### `users/`

* **What's inside?** All the EJS pages related to **Users**.
* **Examples:**
    * `login.ejs` (The login form)
    * `signup.ejs` (The registration form)

---

### `err.ejs`

* **What's inside?** This is a single, top-level error page.
* **How it works:** When our main error-handling middleware catches a major error (like a 404 "Not Found" or a 500 "Server Error"), it renders this page to show a friendly error message to the user instead of a scary default error.