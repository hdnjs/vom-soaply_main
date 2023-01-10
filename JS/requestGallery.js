$(function () {
  //   // Masonry Effect
  //   $(".grid").masonry({
  //     // options
  //     itemSelector: ".grid-item",
  //   });

  const gridBox = $(".grid");

  //   1. 변수 선언
  let initCount = 3; //  초기에 뿌려질 데이터 갯수
  let addCount = 0; //  특정 동작(클릭) 시 추가될 데이터 갯수
  let allData = []; //  전체 데이터 요소가 들어갈 초기 공간

  //   2. 데이터 요청 후 초기 기능 함수(initGalData) 실행
  $.getJSON("/main_backend/model/get_products.php?qnt=all", initGalData);

  //   3. 초기 기능함수 작성
  function initGalData(data) {
    console.log(data);
    allData = data; //  변수 입력 후 함수(getGalleryData) 전달
    getGalleryData(); //  allData 지역 변수를 getGalleryData에서 사용하기 위해 사용될 getGalleryData 함수를 작성하여 연결

    // 4. 로드 모어 클릭 함수 선언
    $(".load-more").on("click", getGalleryData);
  }

  const getGalleryData = () => {
    let items = [];

    // 5. 받아온 전체 데이터 요소 중 0번째 인덱스에서 초기 카운트만큼 잘라서 저장
    let slicedData = allData.slice(addCount, addCount + initCount);

    $.each(slicedData, function (i, item) {
      //   console.log(i);
      console.log(item);

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

    // $(".grid").imagesLoaded(function () {
    //   // Masonry Effect
    //   $(".grid").masonry({
    //     // options
    //     itemSelector: ".grid-item",
    //   });
    // });

    addCount += slicedData.length;
    console.log(addCount);

    if (addCount === allData.length) {
      $(".load-more").hide();
    }
  };

  //   $.getJSON("/main_backend/model/get_products.php?qnt=9", getGalleryData);
});
