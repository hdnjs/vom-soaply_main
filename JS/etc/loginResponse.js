window.addEventListener("load", function () {
  const userIcon = document.querySelectorAll(".user");
  // console.log(userIcon); => 2개 배열 요소
  const adminIcon = document.querySelectorAll(".admin");
  const cart = document.querySelectorAll(".cart");

  this.fetch("/main_backend/etc/check_sign.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.userid, data.user_idx, data.cart_count, data.user_lvl);

      const cartItemEl = `
        <a href="/main_project/pages/cart.html">
          <i class="ri-shopping-cart-line"></i>
          <em>(${data.cart_count})</em>
        </a>
      `;

      if (data.userid === "guest") {
        //  로그인 하지 않았을 때
        adminIcon.forEach((item) => {
          item.style.display = "none";
        }); //  어드민 가려줌

        userIcon.forEach((item) => {
          item.innerHTML = `<a href="/main_project/pages/sign-in.html">
          <i class="ri-user-3-fill"></i>
        </a>`;
        }); //  사용자 정보 없는 아이콘

        //   userIcon.innerHTML = `<a href="/main_project/pages/sign-in.html">
        //   <i class="ri-user-3-fill"></i>
        // </a>`;
        cart.forEach((item) => {
          item.innerHTML = cartItemEl;
          // 카트 숫자 아이콘
        });
      } else {
        if (data.user_lvl === 1) {
          adminIcon.forEach((item) => {
            item.style.display = "flex";
          });

          userIcon.forEach((item) => {
            item.innerHTML = `<button class="signout">${data.userid} | <a href="#">Logout</a></button>`;
          });

          //   userIcon.innerHTML = `<a href="/main_project/pages/sign-in.html">
          //   <i class="ri-user-3-fill"></i>
          // </a>`;

          cart.forEach((item) => {
            item.innerHTML = cartItemEl;
          });
        } else {
          adminIcon.forEach((item) => {
            item.style.display = "none";
          });

          userIcon.forEach((item) => {
            item.innerHTML = `<button class="signout">${data.userid} | <a href="#">Logout</a></button>`;
          });

          //   userIcon.innerHTML = `<a href="/main_project/pages/sign-in.html">
          //   <i class="ri-user-3-fill"></i>
          // </a>`;

          cart.forEach((item) => {
            item.innerHTML = cartItemEl;
          });
        }
      }

      const signoutBtn = document.querySelector(".signout a");

      if (signoutBtn) {
        signoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.fetch("/main_backend/model/register.php?q=signout")
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              this.alert("로그아웃 되었습니다");
              this.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
