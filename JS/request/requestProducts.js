window.addEventListener("load", function () {
  /* ========== Get Products Json Data ========== */
  const productsBox = document.querySelector(".products");

  const pgadr = window.location.href;
  let queryQnt;

  if (pgadr.includes("shop")) {
    queryQnt = "all";
  } else {
    queryQnt = 3;
  }

  const getData = async () => {
    await fetch(`/soaply_backend/model/get_products.php?qnt=${queryQnt}`)
      .then((response) => response.json())
      .then((data) => {
        let dataEl;

        data.map((item) => {
          dataEl = `
                <div class="product-frame">
                  <div class="product-item">
                    <img src="/soaply/images/products/${item.pro_img}" alt="" />
                    <div class="product-text">
                      <h4>${item.pro_name}</h4>
                      <strong>${item.pro_pri
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                      <p>
                        ${item.pro_desc}
                      </p>
                      <a href="/soaply/pages/details.html?idx=${
                        item.pro_idx
                      }" class="common-btn">자세히 보기</a>
                    </div>
                  </div>
                </div>`;
          productsBox.innerHTML += dataEl;
        });
        loadMore();
      })
      .catch((err) => console.log(err));
  };

  getData();
});

function loadMore() {
  const prfr = $(".product-frame");
  prfr.hide();
  prfr.slice(0, 3).show();

  $(".load-more").on("click", function () {
    $(".product-frame:hidden").slice(0, 3).show();
    console.log($(".product-frame:hidden").length);

    if ($(".product-frame:hidden").length === 0) {
      $(".load-more").hide();
    }
  });
}
