window.addEventListener("load", function () {
  const url = document.location.href;
  const cmtInputBox = document.querySelector("textarea");
  const cmtBtn = document.querySelector("button[type=submit]");
  // split 메소드 참조: https://hianna.tistory.com/377
  const urlIndex = Number(url.split("=")[1]);

  const detailImage = document.querySelector(".detail-image");
  const detailText = document.querySelector(".detail-text");

  const getDetailData = async () => {
    await fetch(`/main_backend/model/get_details.php?idx=${urlIndex}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        let imageEl;
        let textEl;

        imageEl = `
          <img src="/main_project/images/products/${data.pro_img}" alt="" />
                `;

        textEl = `
        <h2>${data.pro_name}</h2>
            <p>
              ${data.pro_desc}
            </p>
            <span class="line"></span>

            <div class="price">
              <div class="price-title">
                <p>가격:</p>
                <p>배송비:</p>
              </div>
              <div class="price-value">
                <p>${data.pro_pri
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                <p>2,500원 (3만원 이상 구매 시 무료배송)</p>
              </div>
            </div>

            <span class="line"></span>

            <div class="qnt-sum">
              <div class="qnts">
                <button class="down">-</button>
                <strong class="count">1</strong>
                <button class="up">+</button>
              </div>
              <div class="sum">합계: <em>${data.pro_pri
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</em>원</div>
            </div>

            <div class="line"></div>

            <div class="detail-btns">
              <button class="common-btn">장바구니</button>
              <button class="common-btn">바로구매</button>
            </div>
\
                `;
        detailImage.innerHTML = imageEl;
        detailText.innerHTML = textEl;

        // 수량 증가 및 합산 가격 출력
        // 1. DOM 객체 선택
        const countBtn = document.querySelectorAll(".qnts button"); //  +, - 버튼
        const countEl = document.querySelector(".count"); //  카운팅 숫자 요소
        const sumEl = document.querySelector(".sum em"); //  가격 합산 요소

        let count = Number(countEl.textContent); //  카운팅 숫자
        let sumPrice = Number(sumEl.textContent.replace(",", "")); //  합산 가격

        countBtn.forEach((btn) => {
          btn.addEventListener("click", function () {
            if (this.classList.contains("up")) {
              count++;
            } else {
              // 삼항 연산자 - 조건 ? 조건 참일 때 : 조건이 거짓일 때
              count <= 1 ? (count = 1) : count--;
              // if (count <= 1) {
              //   count = 1;
              // } else {
              //   count--;
              // }
            }

            countEl.textContent = count;
            sumEl.textContent = (count * sumPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        });
      })
      .catch((err) => console.log(err));
  };

  getDetailData();
});
