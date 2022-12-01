/* ========== Elements Clone For Mobile ========== */
const mobileMenus = document.querySelector(".mobile-menus");
const navs = document.querySelector(".nav-lists").cloneNode(true);
const info = document.querySelector(".info").cloneNode(true);

mobileMenus.appendChild(navs);
mobileMenus.appendChild(info);

/* ========== Mobile Menu Toggle ========== */
const mobileBtn = document.querySelector(".mobile-btn");

toggleMobileBtn = (e) => {
  const target = e.currentTarget;
  const menuHeight = mobileMenus.scrollHeight;
  //  scrollHeight : 지정 대상의 높이값을 읽어오는 메소드
  target.classList.toggle("active");

  if (target.classList.contains("active")) {
    target.classList.remove("not-active");
    mobileMenus.style.height = menuHeight + "px"; // `${mobileMenus}px`
    //  단위없을 경우 메뉴 동작하지 않으므로 단위 설정 필요
  } else {
    target.classList.add("not-active");
    mobileMenus.style.height = 0;
  }
};

mobileBtn.addEventListener("click", toggleMobileBtn);

/* ========== Header Change Effect ========== */
const header = document.querySelector("#header");
const stickyHeader = () => {
  const scrY = window.scrollY;
  if (scrY > 0) header.classList.add("active");
  else header.classList.remove("active");
};

window.addEventListener("scroll", stickyHeader);

/* ========== Get Products Json Data ========== */
const productsBox = document.querySelector(".products");

const getData = async () => {
  await fetch("/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      let dataEl;
      data.map((item) => {
        console.log(item);
        dataEl = `
              <div class="product-frame">
                <div class="product-item">
                  <img src="${item.prodPath}" alt="" />
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

sr.reveal(".meet-text-box, .swiper", {
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
