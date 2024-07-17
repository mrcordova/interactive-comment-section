({
  plugins: ["jsdom-quokka-plugin"],
  jsdom: { file: "index.html" }, // Located in project root
});
const dataResponse = await fetch("http://127.0.0.1:5500/data.json");
const data = await dataResponse.json();
let dialog = document.querySelector("dialog");
const deleteBtn = document.querySelector(".delete-btn");
const cancelBtn = document.querySelector(".no-cancel-btn");
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
