const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const url = document.location.href;

// split 메소드 참조: https://hianna.tistory.com/377
const urlIndex = Number(url.split("=")[1]);

cmtBtn.addEventListener("click", () => {
  //  입력창 작성 체크
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요");
    cmtInputBox.focus();
    return;
  }

  //    입력창 체크 끝: 위 부분이 완료되면 다음 코드로 진행

  //    formdata 참조: https://ko.javascript.info/formdata
  const formData = new FormData(document.querySelector(".comment-form form"));
  fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=post_cmt`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      // console.log(res);
      // status = res.status;
      return res.json();
    })
    .then((resData) => {
      alert(resData.msg);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});
