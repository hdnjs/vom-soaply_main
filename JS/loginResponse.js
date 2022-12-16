window.addEventListener("load", function () {
  const signoutBtn = document.querySelector("#so");

  signoutBtn.addEventListener("click", () => {
    this.fetch("/main_backend/model/register.php?q=signout")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
});
