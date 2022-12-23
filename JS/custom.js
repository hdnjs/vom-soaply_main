window.addEventListener("load", function () {
  /* ========== Header Change Effect ========== */
  const header = document.querySelector("#header");
  const stickyHeader = () => {
    const scrY = window.scrollY;
    if (scrY > 0) header.classList.add("active");
    else header.classList.remove("active");
  };
  window.addEventListener("scroll", stickyHeader);
});

/* ========== Get Products Json Data ========== */
const productsBox = document.querySelector(".products");

const getData = async () => {
  await fetch("/main_backend/model/requestProduct.php")
    .then((response) => response.json())
    .then((data) => {
      let dataEl;
      data.map((item) => {
        dataEl = `
              <div class="product-frame">
                <div class="product-item">
                  <img src="/main_project/${item.prodPath}" alt="" />
                  <div class="product-text">
                    <h4>${item.prodTit}</h4>
                    <strong>${item.prodPri}</strong>
                    <p>
                      ${item.prodDes}
                    </p>
                    <a href="#" class="common-btn">자세히 보기</a>
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
const sr = ScrollReveal({
  reset: false,
});

sr.reveal(".wrapper", { duration: 1000 });
sr.reveal(".landing-text-box", {
  duration: 1000,
  origin: "right",
  distance: "80px",
});

sr.reveal(".meet-text-box, .swiper, .products, .review-frame", {
  duration: 1000,
  origin: "bottom",
  distance: "40px",
});

sr.reveal(".meet-wrapper img, .feature", {
  duration: 1000,
  origin: "bottom",
  distance: "40px",
  interval: 200,
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
