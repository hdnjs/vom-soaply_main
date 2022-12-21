//  jQuery logic
$(function () {
  $(".upload-hidden").on("change", function () {
    // on: addEventlistener 역할함

    let filename;

    if (window.FileReader) {
      filename = $(this)[0].files[0].name;
      console.log(filename);
    }

    $(this).siblings().val(filename);
  });
  $("#main-image").on("change", imgFileSelect);
});

const imgFileSelect = (event) => {
  const input = event.target;
  const reader = new FileReader(); //  FileReader 기능 저장

  reader.onload = function () {
    const dataURL = reader.result;
    const output = document.querySelector("#img");
    output.src = dataURL;
  };

  reader.readAsDataURL(input.files[0]);
  //   파일 입력이 저장된 객체의 files 배열에 FileReader 기능 실행
};

//  tab code
const btns = document.querySelectorAll(".admin-btns button");
const panels = document.querySelectorAll(".admin-panels .panel");

btns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    btns.forEach((item) => {
      item.classList.remove("active");
    });

    panels.forEach((panel) => {
      panel.style.display = "none";
    });

    btns[idx].classList.add("active");
    panels[idx].style.display = "flex";
  });
});
