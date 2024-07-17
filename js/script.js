({
  plugins: ["jsdom-quokka-plugin"],
  jsdom: { file: "index.html" }, // Located in project root
});
const dataResponse = await fetch("http://127.0.0.1:5500/data.json");
const data = await dataResponse.json();
let dialog = document.querySelector("dialog");
const deleteBtn = document.querySelector(".delete-btn");
const cancelBtn = document.querySelector(".no-cancel-btn");
const main = document.querySelector("main");
const currentUser = {
  username: data["currentUser"].username,
  image: data["currentUser"].image,
  replies: [],
  comments: [],
};
const users = {};
function openDialog() {
  dialog.showModal();
}
function closeDialog() {
  dialog.close();
}

const createComment = function () {
  const user = "amyrobson";
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment-container");

  const userDiv = document.createElement("div");
  userDiv.classList.add("username-container");

  const profileImg = document.createElement("img");
  profileImg.classList.add("profile-img");
  profileImg.setAttribute("src", `./images/avatars/image-${user}.webp`);
  profileImg.setAttribute("alt", `${user}`);
  userDiv.appendChild(profileImg);

  const usernamePara = document.createElement("p");
  usernamePara.setAttribute("class", `username rubik-700`);
  usernamePara.insertAdjacentText("afterbegin", `${user}`);
  // const usernameParaText = document.createTextNode(`${user}`);
  // usernamePara.appendChild(usernameParaText);

  // check if current user
  usernamePara.insertAdjacentHTML("beforeend", '<span class="you">you</span>');
  // const youSpan = document.createElement("span");
  // youSpan.setAttribute("you");
  // youSpan.insertAdjacentText("beforeend", "you");
  // usernamePara.appendChild(youSpan);

  userDiv.appendChild(usernamePara);

  const createAtPara = document.createElement("p");
  createAtPara.classList.add("createAt");
  createAtPara.insertAdjacentText("afterbegin", `1 month ago`);
  commentDiv.appendChild(userDiv);

  const contentPara = document.createElement("p");
  contentPara.classList.add("content");
  // check if currect user
  contentPara.setAttribute("contenteditable", "false");

  contentPara.insertAdjacentText("afterbegin", "itemekrmekm");
  // check if replying
  contentPara.insertAdjacentHTML(
    "afterbegin",
    `<span class="replyingTo rubik-700">${user}</span>`
  );

  commentDiv.appendChild(contentPara);

  <div class="comment-container">
    <div class="username-container">
      <img
        class="profile-img"
        src="./images/avatars/image-amyrobson.webp"
        alt="woman with black curly hair"
      />
      <p class="username rubik-700">amyrobson</p>
      <p class="createdAt">1 month ago</p>
    </div>

    <p class="content">
      Impressive! Though it seems the drag feature could be improved. But
      overall it looks incredible. You've nailed the design and the
      responsiveness at various breakpoints works really well.
    </p>

    <div class="score-container">
      <button class="plus-sign-btn">
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="#C5C6EF"
          />
        </svg>
      </button>
      <p class="score rubik-500">12</p>
      <button class="minus-sign-btn">
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="#C5C6EF"
          />
        </svg>
      </button>
    </div>

    <button class="reply-container rubik-700">
      <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
          fill="#5357B6"
        />
      </svg>
      Reply
    </button>
  </div>;
  const scoreDiv = document.createElement("div");
  scoreDiv.classList.add("score-container");
  commentDiv.appendChild(scoreDiv);

  const plusBtn = document.createElement("button");
  plusBtn.classList.add("plus-sign-btn");
  const plusSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  plusSvg.setAttribute("width", 11);
  plusSvg.setAttribute("height", 11);
  const plusPath = document.createElementNS(null, "path");
  plusPath.setAttribute(
    "d",
    "M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
  );
  plusPath.setAttribute("fill", "#C5C6EF");
  plusSvg.appendChild(plusPath);
  plusBtn.appendChild(plusSvg);

  scoreDiv.appendChild(plusBtn);
  const minusBtn = document.createElement("button");
  minusBtn.classList.add("minus-sign-btn");
  const minusSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  minusSvg.setAttribute("width", 11);
  minusSvg.setAttribute("height", 11);
  const minusPath = document.createElementNS(null, "path");
  minusPath.setAttribute(
    "d",
    "M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
  );
  minusPath.setAttribute("fill", "#C5C6EF");
  minusSvg.appendChild(minusPath);
  minusBtn.appendChild(minusSvg);

  scoreDiv.appendChild(minusBtn);
};
for (const [key, val] of Object.entries(data)) {
  if (key === "comments") {
    for (const comment of val) {
      if (users[comment.user.username] == undefined) {
        users[comment.user.username] = {
          replies: [],
          comments: [],
        };
      }

      //   if (users[comment.user.username]?.replies == undefined) {
      //     users[comment.user.username]["replies"] = [];
      //   }
      users[comment.user.username] = {
        image: comment.user.image,
        replies: [...users[comment.user.username].replies, ...comment.replies],
        comments: [
          ...users[comment.user.username].comments,
          {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            score: comment.score,
          },
        ],
      };
    }
  }
}
// console.log(currentUser);
console.log(users);
deleteBtn.addEventListener("click", openDialog);
cancelBtn.addEventListener("click", closeDialog);
