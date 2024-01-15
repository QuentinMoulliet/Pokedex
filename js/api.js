const api = {
  init: function () {
    api.requestAPI();
  },

  requestAPI: function (url) {

    return new Promise((resolve) => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};