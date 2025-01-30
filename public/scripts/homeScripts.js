const addFolderBtn = document.querySelector(".create_folder--btn");
const newFolder = document.querySelector(".new--folder");
const newFolderInput = document.querySelector(".new--folder input");

addFolderBtn.addEventListener("click", () => {
  newFolder.classList.toggle("hidden");
  newFolderInput.value = "";
});

window.addEventListener("keydown", (e) => {
  if (newFolder.classList.contains("hidden")) return;
  if (e.key === "Escape") {
    newFolder.classList.add("hidden");
    newFolderInput.value = "";
  }
});
