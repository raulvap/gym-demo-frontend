import { basePath, apiVersion } from "./config";

// --- Get Messages ---
export function getMessagesApi(token, limit, page) {
  const url = `${basePath}/${apiVersion}/get-messages?limit=${limit}&page=${page}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

// --- Delete Messages ---
export function deleteMessagesApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-message/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

// --- Add Message ---
export function addMessageApi(message) {
  const url = `${basePath}/${apiVersion}/add-message`;

  const params = {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

// --- Get Message ---
export function getMessageApi(token, id) {
  const url = `${basePath}/${apiVersion}/get-message/${id}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

// --- Read/Unread Message ---
export function updateMessageApi(token, message, messageId) {
  const url = `${basePath}/${apiVersion}/update-message/${messageId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(message),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
