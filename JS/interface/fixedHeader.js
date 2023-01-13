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
