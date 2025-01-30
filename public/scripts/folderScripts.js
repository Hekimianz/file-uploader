const closeFormBtn = document.querySelector(".close--form");
const form = document.querySelector(".new_file--cont");
const openFormBtn = document.querySelector(".upload_file--btn");
const input = document.querySelector("input");

openFormBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
});
closeFormBtn.addEventListener("click", () => {
  form.classList.add("hidden");
  input.value = "";
});
