const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const url = document.location.href;

// split 메소드 참조: https://hianna.tistory.com/377
const urlIndex = Number(url.split("=")[1]);

// 상품평 작성
cmtBtn.addEventListener("click", () => {
  //  입력창 작성 체크
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요");
    cmtInputBox.focus();
    return;
  }

  //    입력창 체크 끝: 위 부분이 완료되면 다음 코드로 진행

  //    formdata 참조: https://ko.javascript.info/formdata
  const formData = new FormData(document.querySelector(".comment-form form"));
  fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=post_cmt`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      // console.log(res);
      // status = res.status;
      return res.json();
    })
    .then((resData) => {
      alert(resData.msg);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

const cmtWrapper = document.querySelector(".comment-wrapper");
const listCount = document.querySelector(".comment-info strong");

// Get Comments
const getCmtLists = async () => {
  await fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=get_cmt`
  )
    .then((res) => res.json())
    .then((lists) => {
      // console.log(lists);
      if (lists.msg) {
        cmtWrapper.innerHTML = `<p class="no-list">${lists.msg}</p>`;
        return;
      }

      listCount.textContent = lists.length;
      let listsElmt;
      lists.map((list, idx) => {
        if (list.user_id === "guest") {
          listsElmt = `
            <div class="comment-lists">
              <div class="list-info">
                <p>${list.user_id} |</p>
                <em>${list.cmt_reg}</em>
              </div>
              <div class="list-content" id="list-${idx}">
                <p>
                ${list.cmt_cont}
                </p>
              </div>
            </div>`;
        } else {
          if (list.user_id === list.session_id) {
            listsElmt = `
              <div class="comment-lists">
                <div class="list-info">
                  <p>${list.user_id} |</p>
                  <em>${list.cmt_reg} | </em>
                  <button type="button" class="cmt-update">수정하기</button>
                </div>
                <div class="list-content" id="list-${idx}">
                  <p>${list.cmt_cont}</p>
                </div>
              </div>
          `;
          } else {
            listsElmt = `
            <div class="comment-lists">
              <div class="list-info">
                <p>${list.user_id} |</p>
                <em>${list.cmt_reg}</em>
              </div>
              <div class="list-content" id="list-${idx}">
                <p>
                ${list.cmt_cont}
                </p>
              </div>
            </div>`;
          }
        }

        cmtWrapper.innerHTML += listsElmt;
      });

      // 수정하기 기능 분리 선언
      updateCmt(lists);
    })
    .catch((err) => {
      console.log(err);
    });
};

getCmtLists();

// 수정하기 기능 함수 선언
function updateCmt(cmtObjs) {
  console.log(cmtObjs);
  const cmtUpBtns = document.querySelectorAll("button.cmt-update");
  // console.log(cmtUpBtns);

  if (cmtObjs.length !== 0 && cmtUpBtns) {
    cmtUpBtns.forEach((btn) => {
      // console.log(btn);
      btn.addEventListener("click", function () {
        // console.log(this);
        // 노드 추적은 공백을 포함한다.
        const changeInput = this.parentNode.nextSibling.nextSibling;
        const thisIdx = changeInput.getAttribute("id").split("-")[1];
        console.log(thisIdx);
        // console.log(changeInput);
        console.log(cmtObjs[0].cmt_cont);

        this.classList.toggle("active");
        if (btn.classList.contains("active")) {
          this.textContent = "취소하기";
          changeInput.innerHTML = `
          <form onsubmit="return false;" class="update-form-${thisIdx}">
            <input type="text" name="update_cont" value="${cmtObjs[thisIdx].cmt_cont}">
            <button type="submit">수정입력</button>
          </form>`;

          const udSubmitBtn = document.querySelector(
            `.update-form-${thisIdx} button`
          );

          udSubmitBtn.addEventListener("click", function () {
            const formData = new FormData(
              document.querySelector(`.update-form-${thisIdx}`)
            );
            fetch(
              `/main_backend/model/cmt_ctrl.php?cmt_idx=${cmtObjs[thisIdx].cmt_idx}&req_sign=patch_cmt`,
              {
                method: "PATCH",
                body: formData,
              }
            )
              .then((res) => {
                // console.log(res);
                // status = res.status;
                return res.json();
              })
              .then((resData) => {
                alert(resData.msg);
                location.reload();
                // console.log(resData);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else {
          this.textContent = "수정하기";
          changeInput.innerHTML = `
          <p>${cmtObjs[thisIdx].cmt_cont}</p>`;
        }
      });
    });
  } else {
  }
}
