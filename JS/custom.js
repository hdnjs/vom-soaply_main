/* ========== Get Products Json Data ========== */
const productsBox = document.querySelector(".products");

const getData = async () => {
  await fetch("/main_backend/model/get_products.php")
    .then((response) => response.json())
    .then((data) => {
      let dataEl;

      data.map((item) => {
        // console.log(item);
        dataEl = `
              <div class="product-frame">
                <div class="product-item">
                  <img src="/main_project/images/products/${
                    item.pro_img
                  }" alt="" />
                  <div class="product-text">
                    <h4>${item.pro_name}</h4>
                    <strong>${item.pro_pri
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                    <p>
                      ${item.pro_desc}
                    </p>
                    <a href="/main_project/pages/details.html?idx=${
                      item.pro_idx
                    }" class="common-btn">자세히 보기</a>
                  </div>
                </div>
              </div>`;
        productsBox.innerHTML += dataEl;
      });
    })
    .catch((err) => console.log(err));
};

getData();

/* ========== Fit Insta Image Height ========== */
const instaImgHeight = document.querySelector("#h").scrollHeight;
document.querySelector("#fh").style.height = instaImgHeight + "px";

window.addEventListener("resize", () => {
  const instaImgHeight = document.querySelector("#h").scrollHeight;
  document.querySelector("#fh").style.height = instaImgHeight + "px";
});

/* ========== Scroll reveal Effect ========== */
window.addEventListener("load", function () {
  const sr = ScrollReveal({
    reset: false,
  });

  sr.reveal(".wrapper", { duration: 1000 });
  sr.reveal(".landing-text-box", {
    duration: 1000,
    origin: "right",
    distance: "80px",
  });

  sr.reveal(".meet-text-box, .swiper, .products", {
    duration: 1000,
    origin: "bottom",
    distance: "40px",
  });

  sr.reveal(
    ".meet-wrapper img, .feature, .product-frame, .review-frame, .grid-item",
    {
      duration: 1000,
      origin: "bottom",
      distance: "40px",
      interval: 300,
    }
  );
});

/* ========== Swiper Slider Effect ========== */
const swiper = new Swiper(".swiper", {
  loop: true, //  슬라이더 무한 반복
  navigation: {
    //  네비게이션
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    //  슬라이더 인디케이터
    el: ".swiper-pagination",
    clickable: true,
  },
});
