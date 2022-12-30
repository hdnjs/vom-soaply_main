// $(document).ready(function () {
//     //  do something
// });
// //  not recommend

$(function () {
  //   // Masonry Effect
  //   $(".grid").masonry({
  //     // options
  //     itemSelector: ".grid-item",
  //   });

  const gridBox = $(".grid");

  const getGalleryData = (data) => {
    let items = [];
    $.each(data, function (i, item) {
      //   console.log(i);
      // console.log(item);

      const galleryItems = `
        <div class="grid-item">
          <a href="/main_project/pages/details.html?idx=${item.pro_idx}">
            <img src="/main_project/images/products/${item.pro_img}" alt="" />
            <span class="overlay">
              <em class="common-btn">제품보기</em>
            </span>
          </a>
        </div>
        `;

      items.push($(galleryItems).get(0));
    });

    $(".grid").append(items);

    $(".grid").imagesLoaded(function () {
      // Masonry Effect
      $(".grid").masonry({
        // options
        itemSelector: ".grid-item",
      });
    });
  };

  $.getJSON("/main_backend/model/get_products.php?qnt=9", getGalleryData);

  // Navigation Moving to Target Section
  $(".nav-lists li").on("click", function () {
    const targetIdx = $(this).index();
    // console.log(targetIdx);
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;

    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); //  recommend
