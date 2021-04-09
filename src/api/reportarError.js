import { basePath, apiVersion } from "./config";

export function reportErrorApi(message) {
  const url = `${basePath}/${apiVersion}/contacto-eclesia`;

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
