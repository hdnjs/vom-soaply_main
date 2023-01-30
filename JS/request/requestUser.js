window.addEventListener("load", function () {
  const userLists = document.querySelector(".user-lists");

  const getUserLists = async () => {
    await this.fetch("/soaply_backend/model/user_ctrl.php?req_sign=get_user")
      .then((response) => response.json())
      .then((user) => {
        let userListEl;

        user.map((item, i) => {
          userListEl = `
                  <li>
                    <form onsubmit="return false;" class="update-form-${i}">
                      <span class="num">${item.user_idx}</span>
                      <span class="id">${item.user_id}</span>
                      <span class="name">${item.user_name}</span>
                      <span class="lvl">
                        <input type="text" value="${item.user_lvl}" name="lvl" />
                      </span>
                      <span class="updt">
                        <button type="submit">수정</button>
                      </span>
                      <span class="del">
                        <button type="submit">삭제</button>
                      </span>
                    </form>
                  </li>
                `;
          userLists.innerHTML += userListEl;
        });

        updateUser(user); //  update user 함수 호출
        deleteUser(user); //  delete user 함수 호출
      })
      .catch((err) => console.log(err));
  };

  getUserLists();

  function updateUser(data) {
    const updtBtns = document.querySelectorAll(".updt button");

    updtBtns.forEach((btn, i) => {
      btn.addEventListener("click", async function () {
        const formData = new FormData(
          document.querySelector(`.update-form-${i}`)
        );

        await fetch(
          `/soaply_backend/model/user_ctrl.php?req_sign=patch_user&user_idx=${data[i].user_idx}`,
          {
            method: "PATCH",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((updt) => {
            alert(updt.msg);
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }

  function deleteUser(data) {
    const delBtns = document.querySelectorAll(".del button");

    delBtns.forEach((btn, i) => {
      btn.addEventListener("click", async function () {
        await fetch(
          `/soaply_backend/model/user_ctrl.php?req_sign=del_user&user_idx=${data[i].user_idx}`
        )
          .then((res) => res.json())
          .then((del) => {
            alert(del.msg);
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }
});
