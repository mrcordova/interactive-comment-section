({
  plugins: ["jsdom-quokka-plugin"],
  jsdom: { file: "index.html" }, // Located in project root
});
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  initializeFirestore,
  getDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeJG5i8dzogIqIRzj1q9nnz4VN-5XcCXI",
  authDomain: "interactive-comment-sect-30ec1.firebaseapp.com",
  projectId: "interactive-comment-sect-30ec1",
  storageBucket: "interactive-comment-sect-30ec1.appspot.com",
  messagingSenderId: "313310929521",
  appId: "1:313310929521:web:e52c700cd681d39b3471d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
const commentsRef = doc(db, "data", "uArZxv4FSp9gAPj47FKg");
const currentUserRef = doc(db, "data", "eiu997o5zOIXj0ca2eOY");
const docSnap = await getDoc(commentsRef);

// const dataResponse = await fetch("data.json");
// const data = await dataResponse.json();
const data = { comments: docSnap.data().comments };

let dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector(".no-cancel-btn");
const yesDeleteBtn = document.querySelector(".yes-delete-btn");
const comments = document.querySelector(".comments");
let commentToDelete = null;
let highestId = 0;

const currentUser = (await getDoc(currentUserRef)).data().currentUser;
function openDialog() {
  dialog.showModal();
}
function closeDialog() {
  dialog.close();
}
const createSvg = function (width, height, d, fill) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttributeNS(null, "width", width);
  svg.setAttributeNS(null, "height", height);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttributeNS(null, "d", d);
  path.setAttributeNS(null, "fill", fill);

  svg.appendChild(path);
  return svg;
};

const createReplyBtn = function () {
  const replyBtn = document.createElement("button");
  replyBtn.setAttribute("class", "reply-container rubik-700");
  replyBtn.appendChild(
    createSvg(
      14,
      13,
      "M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z",
      "#5357B6"
    )
  );
  const replyText = document.createTextNode("Reply");
  replyBtn.appendChild(replyText);
  replyBtn.addEventListener("click", replyingToComment);
  return replyBtn;
};
const replyingToComment = (e) => {
  const replyDiv = createReplyElement("REPLY");
  replyDiv.classList.add("comment-container");
  const replyBtn = replyDiv.querySelector("button");
  replyBtn.addEventListener("click", async () => {
    const textArea = replyDiv.querySelector("textarea");

    const comment = {
      id: ++highestId,
      content: textArea.value,
      createdAt: "today",
      score: 0,
      replyingTo: e.target.parentElement.querySelector(".username").textContent,
      user: { image: currentUser["image"], username: currentUser.username },
      username: currentUser.username,
    };

    replyDiv.remove();

    const container =
      e.target.parentElement.parentElement.parentElement.classList.contains(
        "replies"
      )
        ? e.target.parentElement.parentElement.parentElement
        : e.target.parentElement?.nextElementSibling.classList.contains(
            "replies"
          )
        ? e.target.parentElement.nextElementSibling
        : document.createElement("ul");

    if (!container.classList.contains("replies")) {
      container.classList.add("replies");
      e.target.parentElement.insertAdjacentElement("afterend", container);
    }

    createComment(comment, container);
    const idText = container.previousElementSibling.getAttribute("data-id");
    const id = idText.slice(idText.indexOf("-"));
    const dataComment = updateData(id);
    dataComment.replies.push(comment);
    await updateDoc(commentsRef, {
      comments: data.comments,
    });
  });

  e.currentTarget.parentElement.insertAdjacentElement("afterend", replyDiv);
};
const createReplyElement = function (buttonText) {
  const replyDiv = document.createElement("div");
  replyDiv.classList.add("add-comment-container");

  const textArea = document.createElement("textarea");
  textArea.setAttribute("name", "add-comment");
  textArea.setAttribute("class", "add-comment");
  textArea.setAttribute("placeholder", "Add a comment...");

  replyDiv.appendChild(textArea);

  const profileImg = document.createElement("img");
  profileImg.setAttribute("class", "add-comment-pic");
  profileImg.setAttribute("src", `${currentUser.image.webp}`);

  replyDiv.appendChild(profileImg);

  const button = document.createElement("button");
  button.setAttribute("class", "send-btn rubik-500");
  button.insertAdjacentText("afterbegin", `${buttonText}`);
  replyDiv.appendChild(button);
  return replyDiv;
};
const editComment = (e) => {
  const comment = e.currentTarget.parentElement.parentElement;
  const para = comment.querySelector(".content");

  para.setAttribute("contenteditable", "true");
  para.focus({ focusVisible: true });
  para.children[0].classList.toggle("rubik-700");
  para.children[0].classList.toggle("replyingTo");

  const updateBtn = document.createElement("button");
  updateBtn.setAttribute("class", "update-btn rubik-500");
  updateBtn.insertAdjacentText("afterbegin", "UPDATE");

  updateBtn.addEventListener("click", async () => {
    para.setAttribute("contenteditable", "false");
    updateBtn.remove();
    const startIdx = para.firstChild.textContent.indexOf("@");
    const endIdx = para.firstChild.textContent.indexOf(
      " ",
      para.firstChild.textContent.indexOf("@")
    );
    const originalTest = para.firstChild.textContent;
    para.firstChild.textContent = originalTest.slice(startIdx, endIdx);
    para.insertAdjacentText("afterbegin", originalTest.slice(0, startIdx));
    para.children[0].insertAdjacentText("afterend", originalTest.slice(endIdx));
    para.children[0].classList.toggle("rubik-700");
    para.children[0].classList.toggle("replyingTo");
    const idText = para.parentElement.getAttribute("data-id");
    const id = idText.slice(idText.indexOf("-"));
    const comment = updateData(id);
    comment.content = para.textContent;
    await updateDoc(commentsRef, {
      comments: data["comments"],
    });
  });
  comment.appendChild(updateBtn);
};

const updateData = (id) => {
  let comment = data["comments"].find((comment) => comment.id == id);
  if (comment == undefined) {
    for (const c of data["comments"]) {
      for (const reply of c.replies) {
        if (reply.id == id) {
          comment = reply;
        }
      }
    }
  }
  return comment;
};

const createCurrentUserBtns = function () {
  const currentUserBtns = document.createElement("div");
  currentUserBtns.classList.add("current-user-btns");

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete-btn rubik-700");

  deleteBtn.appendChild(
    createSvg(
      12,
      14,
      "M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z",
      "#ED6368"
    )
  );
  const deleteText = document.createTextNode("Delete");
  deleteBtn.appendChild(deleteText);
  deleteBtn.addEventListener("click", (e) => {
    openDialog();

    commentToDelete = e.target.parentElement.parentElement;
  });

  const editBtn = document.createElement("button");
  editBtn.setAttribute("class", "edit-btn rubik-700");

  editBtn.appendChild(
    createSvg(
      14,
      14,
      "M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z",
      "#5357B6"
    )
  );

  const editText = document.createTextNode("Edit");
  editBtn.appendChild(editText);

  editBtn.addEventListener("click", editComment);
  currentUserBtns.appendChild(deleteBtn);
  currentUserBtns.appendChild(editBtn);
  return currentUserBtns;
};

function bound(_number, _min, _max) {
  return Math.max(Math.min(_number, _max), _min);
}

const updateScore = async function (e) {
  const scorePara = e.currentTarget.parentElement.querySelector(".score");
  const content = e.currentTarget.parentElement.parentElement;

  const id = content
    .getAttribute("data-id")
    .slice(content.getAttribute("data-id").indexOf("-"));
  const originalScore =
    e.currentTarget.parentElement.getAttribute("data-score");

  const comment = updateData(id);

  const tempScore =
    parseInt(scorePara.textContent) +
    parseInt(e.currentTarget.getAttribute("data-value"));

  const min = parseInt(originalScore) - 1;
  const max = parseInt(originalScore) + 1;

  let updatedScore = bound(tempScore, min, max);

  e.currentTarget.parentElement.setAttribute(
    "data-choice",
    e.currentTarget.getAttribute("data-value")
  );

  scorePara.textContent = `${updatedScore}`;
  comment.score = parseInt(scorePara.textContent);
  await updateDoc(commentsRef, {
    comments: data["comments"],
  });
};
const createComment = function (
  { content, id, createdAt, score, user, replyingTo = "" },
  originalComment = null
) {
  const username = user.username;
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment-container");
  commentDiv.setAttribute("data-id", `${username}_${id}`);

  if (replyingTo != "" && originalComment != null) {
    const replyLi = document.createElement("li");
    replyLi.classList.add("reply");
    originalComment.appendChild(replyLi);
    replyLi.appendChild(commentDiv);
  }
  const userDiv = document.createElement("div");
  userDiv.classList.add("username-container");

  const profileImg = document.createElement("img");
  profileImg.classList.add("profile-img");
  profileImg.setAttribute("src", `./images/avatars/image-${username}.webp`);
  profileImg.setAttribute("alt", `${username}`);
  userDiv.appendChild(profileImg);

  const usernamePara = document.createElement("p");
  usernamePara.setAttribute("class", `username rubik-700`);
  usernamePara.insertAdjacentText("afterbegin", `${username}`);

  // check if current user
  usernamePara.insertAdjacentHTML(
    "beforeend",
    currentUser.username === username
      ? '<span class="you">you</span>'
      : "<span></span>"
  );

  userDiv.appendChild(usernamePara);

  // time stamp
  const createAtPara = document.createElement("p");
  createAtPara.classList.add("createdAt");
  createAtPara.insertAdjacentText("afterbegin", `${createdAt}`);

  userDiv.appendChild(createAtPara);
  commentDiv.appendChild(userDiv);

  const contentPara = document.createElement("p");
  contentPara.classList.add("content");
  // check if currect user
  contentPara.setAttribute("contenteditable", "false");

  contentPara.insertAdjacentText("afterbegin", `${content}`);
  // check if replying
  contentPara.insertAdjacentHTML(
    "afterbegin",
    replyingTo != ""
      ? `<span class="replyingTo rubik-700" contenteditable="false">@${replyingTo} </span>`
      : "<span></span>"
  );

  commentDiv.appendChild(contentPara);

  const scoreDiv = document.createElement("div");
  scoreDiv.classList.add("score-container");
  scoreDiv.setAttribute("data-score", score || 0);
  commentDiv.appendChild(scoreDiv);

  const plusBtn = document.createElement("button");
  plusBtn.classList.add("plus-sign-btn");
  plusBtn.setAttribute("data-value", 1);
  plusBtn.appendChild(
    createSvg(
      11,
      11,
      "M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z",
      "#C5C6EF"
    )
  );
  plusBtn.addEventListener("click", updateScore);

  scoreDiv.appendChild(plusBtn);

  scoreDiv.insertAdjacentHTML(
    "beforeend",
    `<p class='score rubik-500'> ${score || 0} </p>`
  );

  const minusBtn = document.createElement("button");
  minusBtn.classList.add("minus-sign-btn");
  minusBtn.setAttribute("data-value", -1);
  minusBtn.appendChild(
    createSvg(
      11,
      11,
      "M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z",
      "#C5C6EF"
    )
  );
  minusBtn.addEventListener("click", updateScore);
  scoreDiv.appendChild(minusBtn);

  commentDiv.appendChild(
    currentUser.username === username
      ? createCurrentUserBtns()
      : createReplyBtn()
  );

  if (replyingTo == "") {
    comments.appendChild(commentDiv);
  }
  highestId = id;
};

// code to set up inital data
// try {
//   const docRef = await addDoc(collection(db, "data"), {
//     currentUser,
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
// try {
//   const docRef = await addDoc(collection(db, "data"), {
//     comments: data["comments"],
//   });
//   console.log("Document written with ID:", docRef.id);
// } catch (e) {
//   console.error("error adding document: ", e);
// }

const dataComments = data["comments"].sort((a, b) => a.score > b.score);

for (const comment of dataComments) {
  let i = 0;
  createComment(comment);
  const replies = comment.replies;
  for (const reply of replies) {
    if (i == 0) {
      const repliesUl = document.createElement("ul");
      repliesUl.classList.add("replies");
      comments.lastChild.insertAdjacentElement("afterend", repliesUl);
      createComment(reply, repliesUl);
    } else {
      createComment(reply, comments.lastChild);
    }
    i++;
  }
}

const sendEle = createReplyElement("SEND");
sendEle.children[0].setAttribute("id", "add-comment");
const sendBtn = sendEle.querySelector(".send-btn");
sendBtn.addEventListener("click", async (e) => {
  const textArea = e.currentTarget.parentElement.querySelector("#add-comment");

  const comment = {
    id: ++highestId,
    content: textArea.value,
    createdAt: "today",
    score: 0,
    user: { image: currentUser.image, username: currentUser.username },
    replies: [],
  };
  createComment(comment);
  textArea.value = "";
  data["comments"].push(comment);
  await updateDoc(commentsRef, {
    comments: data["comments"],
  });
});

comments.insertAdjacentElement("afterend", sendEle);

cancelBtn.addEventListener("click", closeDialog);
yesDeleteBtn.addEventListener("click", async () => {
  const idText = commentToDelete.getAttribute("data-id");
  const id = idText.slice(idText.indexOf("-"));

  let found = false;
  for (let i = 0; i < data.comments.length; i++) {
    if (data.comments[i].id == id) {
      delete data.comments[i].replies;
      data.comments[i].replies = [];
      delete data.comments[i];
      data.comments = data.comments.filter(function () {
        return true;
      });
      found = true;
      break;
    }
  }

  if (found == false) {
    outloop: for (let i = 0; i < data.comments.length; i++) {
      for (let j = 0; i < data.comments[i].replies.length; j++) {
        if (data.comments[i].replies[j].id == id) {
          delete data.comments[i].replies[j];
          found = true;
          data.comments[i].replies = data.comments[i].replies.filter(
            function () {
              return true;
            }
          );
          break outloop;
        }
      }
    }
  }
  closeDialog();
  commentToDelete.remove();
  await updateDoc(commentsRef, {
    comments: data["comments"],
  });
});
