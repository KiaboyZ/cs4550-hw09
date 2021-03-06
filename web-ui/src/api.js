import store from './store';

export async function api_get(path) {
  let text = await fetch("http://localhost:4000/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

export async function api_post(path, data) {
  let opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  let text = await fetch(
    "http://localhost:4000/api/v1" + path, opts);
  return await text.json();
}

export function fetch_users() {
  api_get("/users").then((data) => store.dispatch({
    type: 'users/set',
    data: data,
  }));
}

export function fetch_events() {
  api_get("/events").then((data) => store.dispatch({
    type: 'events/set',
    data: data,
  }));
}

export function load_defaults() {
  fetch_users();
  fetch_events();
}

export function api_login(email, password) {
  api_post("/session", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: 'session/set',
        data: data.session,
      }
      store.dispatch(action);
    }
    else if (data.error) {
      let action = {
        type: 'error/set',
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

export function create_user(user) {
  return api_post("/users", {user});
}

export function create_event(event) {
  let data = new FormData();
  data.append("event[name]", event.name);
  data.append("event[time]", event.time);
  data.append("event[description]", event.description);
  fetch("http://localhost:4000/api/v1/events", {
    method: 'POST',
    // Fetch will handle reading the file object and
    // submitting this as a multipart/form-data request.
    body: data,
  }).then((resp) => {
    console.log(resp);
  });
}