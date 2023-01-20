const signup = document.querySelector('input[type="submit"]');
const nameInput = document.querySelector(".name");
const idInput = document.querySelector(".id");
const emailInput = document.querySelector(".email");
const pwdInput = document.querySelector(".pwd");
const rpwdInput = document.querySelector(".rpwd");

// http response code 참조: https://www.whatap.io/ko/blog/40/

let status;

signup.addEventListener("click", () => {
  //  입력창 작성 체크
  if (!nameInput.value) {
    alert("이름을 입력해주세요");
    nameInput.focus();
    return;
  }

  if (!idInput.value) {
    alert("아이디를 입력해주세요");
    nameInput.focus();
    return;
  }

  if (!emailInput.value) {
    alert("이메일을 입력해주세요");
    nameInput.focus();
    return;
  }

  if (!pwdInput.value) {
    alert("비밀번호를 입력해주세요");
    pwdInput.focus();
    return;
  }

  if (!rpwdInput.value) {
    alert("비밀번호 확인을 입력해주세요");
    rpwdInput.focus();
    return;
  }

  if (pwdInput.value !== rpwdInput.value) {
    alert("작성한 비밀번호가 다릅니다");
    pwdInput.value = ""; //  입력한 비밀번호를 없애줘야함(즉, 작성한 비밀번호는 지워줘야 함)
    rpwdInput.value = "";
    pwdInput.focus();
    return;
  }
  //    입력창 체크 끝: 위 부분이 완료되면 다음 코드로 진행

  //    formdata 참조: https://ko.javascript.info/formdata
  const formData = new FormData(document.querySelector("form"));
  fetch("/main_backend/model/register.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log(res);
      status = res.status;
      return res.json();
    })
    .then((data) => {
      alert(data.msg);
      location.href = "/main_project/index.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
