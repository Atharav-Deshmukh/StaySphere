## Utility Functions

This folder holds helper files and functions that we use across the entire project. Think of it as our toolbox 🧰.

Instead of writing the same code over and over (like error handling), we write it once here and just import it wherever we need it.

---

### `ExpressError.js`

* **What it does:** This is our own custom error class.
* **Why we use it:** The basic `Error` in JavaScript doesn't have a spot for an HTTP status code (like 404 or 500). We built this class so we can create errors that *do* have a status code.
* **Example:** Instead of just `throw new Error("Page not found")`, we can do `throw new ExpressError(404, "Page not found")`. Our error-handling middleware can then read the `.statusCode` and send the correct response.

---

### `wrapAsync.js`

* **What it does:** This is a "wrapper" function for our `async` route handlers.
* **Why we use it:** `async` functions in Express have a small "gotcha." If they throw an error, the app will crash unless you manually add a `try...catch` block *in every single route*.
* **How it works:** This function takes our `async` route function, runs it, and adds a `.catch(next)` to the end. This "catches" any errors that happen and automatically passes them to our main error handler, keeping the app from crashing. It's a huge time-saver!