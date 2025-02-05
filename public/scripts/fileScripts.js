const deleteIcon = document.querySelector(".delete--icon");
const shareIcon = document.querySelector(".share--icon");
const shareCont = document.querySelector(".shareFile--cont");
const deleteCont = document.querySelector(".deleteConfirmation--cont");
const closeShareBtn = document.querySelector(".closeShare");
const noBtn = document.querySelector("#no");
const link = document.querySelector(".share--link");

noBtn.addEventListener("click", () => {
  deleteCont.classList.add("hidden");
  shareIcon.classList.remove("hidden");
});

deleteIcon.addEventListener("click", () => {
  deleteCont.classList.remove("hidden");
  shareIcon.classList.add("hidden");
});

closeShareBtn.addEventListener("click", () => {
  shareCont.classList.add("hidden");
  shareIcon.classList.remove("hidden");
});

shareIcon.addEventListener("click", () => {
  shareCont.classList.remove("hidden");
  shareIcon.classList.add("hidden");
});

link.addEventListener("click", () => {
  const text = link.innerText;
  navigator.clipboard.writeText(text);
});
const filename = document.querySelectorAll("h2")[1].innerText;
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

function getFileExtensions(filename) {
  const extension = filename.split(".").pop().toLowerCase();
  const icon = document.querySelector(".file--icon");

  if (imageTypes.includes("." + extension)) {
    return;
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
}

getFileExtensions(filename);
