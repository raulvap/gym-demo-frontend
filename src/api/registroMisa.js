import { basePath, apiVersion } from "./config";

// --- Registro Web, cada usuario que se registra
export function addRegistroApi(registro) {
  const url = `${basePath}/${apiVersion}/add-registro`;

  const params = {
    method: "POST",
    body: JSON.stringify(registro),
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

// --- Get Registros from Admin
export function getRegistrosAdminApi(token) {
  const url = `${basePath}/${apiVersion}/get-registros`;

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

// --- Delete Previous Registers ---
export function deleteRegistrosAdminApi(token, data) {
  const url = `${basePath}/${apiVersion}/delete-registros`;

  const params = {
    method: "DELETE",
    body: JSON.stringify(data),
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

// --- Registro de Misa Info en Admin
export function addMisaInfoApi(token, misaInfo) {
  const url = `${basePath}/${apiVersion}/add-misa`;

  const params = {
    method: "POST",
    body: JSON.stringify(misaInfo),
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

// --- Get MisaInfo
export function getMisaInfoApi() {
  const url = `${basePath}/${apiVersion}/get-misas`;

  return fetch(url)
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

// --- Update MisaInfo
export function updateMisaInfoApi(token, misaId, data) {
  const url = `${basePath}/${apiVersion}/update-misa/${misaId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
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

// --- Delete MisaInfo
export function deleteMisaInfoApi(token, misaId) {
  const url = `${basePath}/${apiVersion}/delete-misa/${misaId}`;

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

// --- Activate MisaInfo
export function activateMisaInfoApi(token, misaId, status) {
  const url = `${basePath}/${apiVersion}/activate-misa/${misaId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ active: status }),
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
