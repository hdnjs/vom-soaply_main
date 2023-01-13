fetch("/main_backend/etc/accessDeny.php")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data.acs_code === 0) {
      location.href = "/main_project/index.html";
    }
    // console.log(typeof data.acs_code);
  })
  .catch((err) => {
    console.log(err);
  });
