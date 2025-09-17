// dashboard.js
let mediaList = JSON.parse(localStorage.getItem("mediaList")) || [];
let cardView = true;
let selectedMediaId = null;
document.addEventListener('DOMContentLoaded', () => {
  // Load user profile from localStorage
  const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  const username = savedProfile.displayName || "Guest";

  document.getElementById("username").innerText = username;
  document.getElementById("username-mobile").innerText = username;
});
  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  // Logout button (example)
  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Logging out...');
      localStorage.removeItem("userProfile");
      window.location.href = "index.html";
    });
  });
const mediaContainer = document.getElementById("mediaList");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const filterStatus = document.getElementById("filterStatus");
const toggleViewBtn = document.getElementById("toggleViewBtn");

// Render media list
function renderMedia() {
  mediaContainer.innerHTML = "";

  let filtered = mediaList.filter(item => {
    return (
      (!searchInput.value || item.title.toLowerCase().includes(searchInput.value.toLowerCase())) &&
      (!filterType.value || item.type === filterType.value) &&
      (!filterStatus.value || item.status === filterStatus.value)
    );
  });

  if (cardView) {
    // Card View
    filtered.forEach((m, idx) => {
      mediaContainer.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100" onclick="openModal(${idx})">
            <img src="${m.coverUrl || 'https://via.placeholder.com/400x200'}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${m.title}</h5>
              <p class="card-text"><b>${m.type}</b> • ${m.status}</p>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    // Table View
    let table = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Title</th><th>Type</th><th>Status</th><th>Year</th><th>Country</th>
          </tr>
        </thead>
        <tbody>
    `;
    filtered.forEach((m, idx) => {
      table += `
        <tr onclick="openModal(${idx})" style="cursor:pointer;">
          <td>${m.title}</td>
          <td>${m.type}</td>
          <td>${m.status}</td>
          <td>${m.year || '-'}</td>
          <td>${m.country || '-'}</td>
        </tr>
      `;
    });
    table += "</tbody></table>";
    mediaContainer.innerHTML = table;
  }
}

window.openModal = function(idx) {
  let m = mediaList[idx];
  selectedMediaId = idx;

  document.getElementById("modalTitle").innerText = m.title;
  document.getElementById("modalImg").src = m.coverUrl || "https://via.placeholder.com/400x200";
  document.getElementById("modalType").innerText = m.type;
  document.getElementById("modalGenre").innerText = m.genre || "-";
  document.getElementById("modalYear").innerText = m.year || "-";
  document.getElementById("modalCountry").innerText = m.country || "-";
  document.getElementById("modalStatus").innerText = m.status;
  document.getElementById("modalDescription").innerText = m.description || "-";

  let modal = new bootstrap.Modal(document.getElementById("mediaModal"));
  modal.show();
};

// Delete
document.getElementById("deleteBtn").addEventListener("click", () => {
  if (selectedMediaId !== null) {
    mediaList.splice(selectedMediaId, 1);
    localStorage.setItem("mediaList", JSON.stringify(mediaList));
    renderMedia();
    bootstrap.Modal.getInstance(document.getElementById("mediaModal")).hide();
  }
});

// Edit 
document.getElementById("editBtn").addEventListener("click", () => {
  if (selectedMediaId !== null) {
    localStorage.setItem("editMedia", JSON.stringify({ id: selectedMediaId, ...mediaList[selectedMediaId] }));
    window.location.href = "add-media.html";
  }
});

// Copy Link
document.getElementById("shareBtn").addEventListener("click", () => {
  const url = window.location.href.split("?")[0] + "?media=" + selectedMediaId;
  navigator.clipboard.writeText(url);
  alert("Link copied!");
});

// Event Listeners
searchInput.addEventListener("input", renderMedia);
filterType.addEventListener("change", renderMedia);
filterStatus.addEventListener("change", renderMedia);
toggleViewBtn.addEventListener("click", () => {
  cardView = !cardView;
  renderMedia();
});

// Initial render
renderMedia();