// $(document).ready(function () {
//     //  do something
// });
// //  not recommend

$(function () {
  // Navigation Moving to Target Section
  $(".nav-lists li").on("click", function (e) {
    e.preventDefault(); //  a에 적용된 기능 제거
    const targetIdx = $(this).index();
    // console.log(targetIdx);
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;

    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); //  recommend
