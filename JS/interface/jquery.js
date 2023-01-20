// $(document).ready(function () {
//     //  do something
// });
// //  not recommend

$(function () {
  // Navigation Moving to Target Section
  $(document).ajaxComplete(function () {
    $(".nav-lists li").on("click", function (e) {
      e.preventDefault(); //  a에 적용된 기능 제거
      const targetIdx = $(this).index();
      const pagePosition = $(".nav-target").eq(targetIdx).offset().top;

      $("html, body").animate({ scrollTop: pagePosition - 30 }, 100);
    });
  });
}); //  recommend
