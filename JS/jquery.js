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
      //   console.log(item);

      const galleryItems = `
        <div class="grid-item">
        <img src="/main_project/images/${item.datamain}" alt="" />
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

  $.getJSON("/main_project/data/gallery.json", getGalleryData);

  // Navigation Moving to Target Section
  $(".nav-lists li").on("click", function () {
    const targetIdx = $(this).index();
    // console.log(targetIdx);
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;

    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); //  recommend
