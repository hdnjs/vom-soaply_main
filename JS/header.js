window.addEventListener("load", function () {
  /* ========== Elements Clone For Mobile ========== */
  const mobileMenus = document.querySelector(".mobile-menus");
  const navs = document.querySelector(".nav-lists").cloneNode(true);
  const info = document.querySelector(".info").cloneNode(true);

  mobileMenus.appendChild(navs);
  mobileMenus.appendChild(info);

  /* ========== Mobile Menu Toggle ========== */
  const mobileBtn = document.querySelector(".mobile-btn");
  console.log(mobileBtn);

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
});
