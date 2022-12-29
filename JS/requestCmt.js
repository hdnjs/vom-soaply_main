const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");

cmtBtn.addEventListener("click", () => {
  //  입력창 작성 체크
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요");
    cmtInputBox.focus();
    return;
  }

  //    입력창 체크 끝: 위 부분이 완료되면 다음 코드로 진행

  //    formdata 참조: https://ko.javascript.info/formdata
  const formData = new FormData(document.querySelector("form"));
  fetch(`/main_backend/model/register.php?p_idx=${urlIndex}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log(res);
      status = res.status;
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      alert(data.msg);
      location.href = "/main_project/index.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
