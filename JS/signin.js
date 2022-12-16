const signin = document.querySelector('input[type="submit"]');
const idInput = document.querySelector(".id");
const pwdInput = document.querySelector(".pwd");

let status;

signin.addEventListener("click", () => {
  //  입력창 작성 체크
  if (!idInput.value) {
    alert("아이디를 입력해주세요");
    idInput.focus();
    return;
  }

  if (!pwdInput.value) {
    alert("비밀번호를 입력해주세요");
    pwdInput.focus();
    return;
  }

  const formData = new FormData(document.querySelector("form"));

  fetch("/main_backend/model/register.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
