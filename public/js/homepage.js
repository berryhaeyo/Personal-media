//homepage.js
document.addEventListener('DOMContentLoaded', () => {
  // Load user profile from localStorage
  const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  const username = savedProfile.displayName || "Guest";

  // Example stats 
  const savedStats = JSON.parse(localStorage.getItem("userStats")) || {
    total: 0,
    watchlist: 0,
    inProgress: 0,
    completed: 0
  };

  // Set username
  document.getElementById('username').textContent = username;
  document.getElementById('username-mobile').textContent = username;

  // Set counts
  document.getElementById('total-items').textContent = savedStats.total;
  document.getElementById('watchlist-count').textContent = savedStats.watchlist;
  document.getElementById('in-progress-count').textContent = savedStats.inProgress;
  document.getElementById('completed-count').textContent = savedStats.completed;

  // Progress bars
  function setProgressBar(barId, value, total) {
    const width = total ? Math.round((value / total) * 100) : 0;
    document.getElementById(barId).style.width = width + '%';
  }

  setProgressBar('progress-total', savedStats.total, savedStats.total);
  setProgressBar('progress-watchlist', savedStats.watchlist, savedStats.total);
  setProgressBar('progress-inprogress', savedStats.inProgress, savedStats.total);
  setProgressBar('progress-completed', savedStats.completed, savedStats.total);

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
      
    });
  });
});