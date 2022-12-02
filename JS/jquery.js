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
  console.log(gridBox);

  const getGalleryData = (data) => {
    let items = [];
    $.each(data, function (i, item) {
      //   console.log(i);
      //   console.log(item);

      const galleryItems = `
        <div class="grid-item">
        <img src="/images/${item.datamain}" alt="" />
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

  $.getJSON("/data/gallery.json", getGalleryData);
}); //  recommend
