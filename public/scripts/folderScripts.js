const closeFormBtn = document.querySelector(".close--form");
const form = document.querySelector(".new_file--cont");
const openFormBtn = document.querySelector(".upload_file--btn");
const input = document.querySelector("input");
const files = document.querySelectorAll(".file");
const delFolderBtn = document.querySelector(".delete_folder--btn");
const delFolderCont = document.querySelector(".deleteConfirmation--cont");
const noBtn = document.querySelector("#no");

delFolderBtn.addEventListener("click", () => {
  delFolderCont.classList.remove("hidden");
});

noBtn.addEventListener("click", () => {
  delFolderCont.classList.add("hidden");
});
const documentTypes = [
  ".txt",
  ".csv",
  ".doc",
  ".docx",
  ".odt",
  ".rtf",
  ".xls",
  ".xlsx",
  ".ods",
  ".ppt",
  ".pptx",
  ".odp",
  ".pdf",
];

const imageTypes = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".tiff",
  ".bmp",
  ".heic",
];

const audioTypes = [".mp3", ".wav", ".aac", ".flac", ".ogg", ".m4a"];

const videoTypes = [".mp4", ".avi", ".mov", ".mkv", ".webm", ".wmv", ".flv"];

const archiveTypes = [".zip", ".rar", ".tar", ".gz", ".7z"];
const codeTypes = [
  ".html",
  ".css",
  ".js",
  ".py",
  ".java",
  ".cpp",
  ".cs",
  ".ts",
  ".json",
  ".xml",
  ".yaml",
  ".ini",
  ".sh",
  ".bat",
  ".exe",
];

const fontTypes = [".ttf", ".otf", ".woff", ".woff2"];

openFormBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
});
closeFormBtn.addEventListener("click", () => {
  form.classList.add("hidden");
  input.value = "";
});

const checkFileType = (filename) => {
  const extension = filename.split(".").pop().toLowerCase();
};

function getFileExtensions(files) {
  files.forEach((file) => {
    const filename = file.querySelector("h3").innerText;
    const extension = filename.split(".").pop().toLowerCase();
    const icon = file.querySelector("img");
    if (imageTypes.includes("." + extension)) {
      icon.src = "/images/image.png";
    } else if (documentTypes.includes("." + extension)) {
      icon.src = "/images/document.png";
    } else if (audioTypes.includes("." + extension)) {
      console.log("This is an audio file.");
      icon.src = "/images/audio.png";
    } else if (videoTypes.includes("." + extension)) {
      icon.src = "/images/video.png";
    } else if (archiveTypes.includes("." + extension)) {
      icon.src = "/images/zip.png";
    } else if (codeTypes.includes("." + extension)) {
      icon.src = "/images/code.png";
    } else if (fontTypes.includes("." + extension)) {
      icon.src = "/images/fonts.png";
    } else {
      icon.src = "/images/document.png";
    }
  });
}

getFileExtensions(files);
