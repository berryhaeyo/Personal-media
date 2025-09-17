add- media
document.getElementById("addMediaForm").addEventListener("submit", function (e) {
  e.preventDefault(); // form reload 

  const media = {
    id: Date.now(),
    title: document.getElementById("title").value,
    type: document.getElementById("type").value,
    genre: document.getElementById("genre").value,
    year: document.getElementById("year").value,
    country: document.getElementById("country").value,
    status: document.getElementById("status").value,
    description: document.getElementById("description").value,
    coverUrl: document.getElementById("coverUrl").value || "https://via.placeholder.com/300x200?text=No+Image"
  };

  let mediaList = JSON.parse(localStorage.getItem("mediaList")) || [];
  mediaList.push(media);
  localStorage.setItem("mediaList", JSON.stringify(mediaList));

  // Dashboard  redirect
  window.location.href = "dashboard.html";
});