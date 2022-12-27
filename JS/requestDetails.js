const url = document.location.href;
// split 메소드 참조: https://hianna.tistory.com/377
const urlIndex = Number(url.split("=")[1]);

const detailBox = document.querySelector(".details");

const getDetailData = async () => {
  await fetch(`/main_backend/model/get_details.php?idx=${urlIndex}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let dataEl;

      //   data.map((item) => {
      // console.log(item);
      // dataEl = `
      //         <div class="product-frame">
      //           <div class="product-item">
      //             <img src="/main_project/images/products/${item.pro_img}" alt="" />
      //             <div class="product-text">
      //               <h4>${item.pro_name}</h4>
      //               <strong>${item.pro_pri}</strong>
      //               <p>
      //                 ${item.pro_desc}
      //               </p>
      //               <a href="/main_project/pages/details.html?idx=${item.pro_idx}" class="common-btn">자세히 보기</a>
      //             </div>
      //           </div>
      //         </div>`;
      // detailBox.innerHTML += dataEl;
      //   });
    })
    .catch((err) => console.log(err));
};

getDetailData();
