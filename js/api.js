const api = {
  init: function () {
    // You need to provide a URL here, e.g., api.requestAPI('https://api.example.com/data');
    api.requestAPI('https://tyradex.vercel.app/api/v1/pokemon')
      .then(data => {
      })
      .catch(error => {
        console.error('Error fetching API:', error);
        // Properly handle the error, e.g., show a message to the user
      });
  },

  requestAPI: function (url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error); // Pass the error to the reject function
        });
    });
  },
};
