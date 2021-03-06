const updateUserLikes = (updatedLikes) => {
  const updatedUser = {
    likes: updatedLikes,
  };
  return new Promise(function (resolve, reject) {
    const token = localStorage.getItem("snippet-auth");
    if (token) {
      fetch("/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            resolve(res.data);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.error(err.message);
          reject(err);
        });
    }
  });
};

module.exports = updateUserLikes;
