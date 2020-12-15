const callApi = () => {
  console.log("Real callAPI was invoked");
  return fetch(
    "https://rancid-tomatillos.herokuapp.com/api/v2/movies"
  ).then((response) => response.json());
};

const callSingleApi = (id) => {
  return fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
  ).then((response) => response.json());
};

const callSingleApiVideo = (id) => {
  return fetch(
    `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}/videos`
  ).then((response) => response.json());
};

export { callApi, callSingleApi, callSingleApiVideo };
