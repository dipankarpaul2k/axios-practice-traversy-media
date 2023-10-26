// GET REQUEST
async function getTodos() {
  console.log("GET Request");

  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   params: {
  //     _limit: 5,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.error(err));

  await axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => showOutput(res))
    .catch((err) => showError(err));
}

// POST REQUEST
async function addTodo() {
  console.log("POST Request");

  // await axios({
  //   method: "post",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   data: {
  //     title: "New Todo",
  //     completed: false,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.error(err));

  await axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => showError(err));
}

// PUT REQUEST
async function updatePutTodo() {
  console.log("PUT Request");

  await axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated Todo using PUT",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => showError(err));
}

// PATCH REQUEST
async function updatePatchTodo() {
  console.log("PATCH Request");

  await axios
    .patch("https://jsonplaceholder.typicode.com/todos/2", {
      title: "Updated Todo using PATCH",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => showError(err));
}

// DELETE REQUEST
async function removeTodo() {
  console.log("DELETE Request");

  await axios
    .delete("https://jsonplaceholder.typicode.com/todos/3")
    .then((res) => showOutput(res))
    .catch((err) => showError(err));
}

// SIMULTANEOUS DATA
async function getData() {
  console.log("Simultaneous Request");

  // await axios
  //   .all([
  //     axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
  //     axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
  //   ])
  //   .then((res) => {
  //     console.log("todos response :>> ", res[0].data);
  //     console.log("posts response :>> ", res[1].data);
  //     showOutput(res[1]);
  //   })
  //   .catch((err) => showError(err));

  await axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(
      axios.spread((todos, posts) => {
        console.log("todos response :>> ", todos.data);
        console.log("posts response :>> ", posts.data);
        showOutput(posts);
      })
    )
    .catch((err) => showError(err));
}

// CUSTOM HEADERS
async function customHeaders() {
  console.log("Custom Headers");
}

// ERROR HANDLING
async function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
async function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date()}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Show error in console and browser
function showError(err) {
  // Show error in console
  console.error(`An error occured: ${err}`);

  // show error in browser
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4  text-center">
      <h5>Status: 404</h5>
      <h4>Something went wrong. Please try again leter.</h4>
    </div>
  `;
}
// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("put").addEventListener("click", updatePutTodo);
document.getElementById("patch").addEventListener("click", updatePatchTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
