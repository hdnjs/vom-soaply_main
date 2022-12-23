// 1. 클릭(submit) 요소 선택
const submitBtn = document.querySelector('input[type="submit"]');

// 3. 제출 버튼 클릭했을 때 서버로 데이터 요청 후 응답값 출력
submitBtn.addEventListener("click", () => {
  // 2. form에 작성한 데이터와 프로그램이 읽어들인 파일 데이터 저장
  const formData = new FormData(document.querySelector("form"));

  fetch("/main_backend/model/product_upload.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert(data.msg);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});
