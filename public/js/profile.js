// profile.js

function saveProfile() {
  const displayName = document.getElementById("displayName").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const privacy = document.getElementById("privacy").value;
  const profilePicInput = document.getElementById("profile-pic");

  let profilePic = document.getElementById("profile-pic-preview").src;

  // যদি নতুন ছবি upload করে তাহলে preview update হবে
  if (profilePicInput.files && profilePicInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePic = e.target.result;
      document.getElementById("profile-pic-preview").src = profilePic;
      saveToStorage(profilePic);
    };
    reader.readAsDataURL(profilePicInput.files[0]);
  } else {
    saveToStorage(profilePic);
  }

  function saveToStorage(pic) {
    const profileData = {
      displayName,
      bio,
      privacy,
      profilePic: pic,
    };

    localStorage.setItem("userProfile", JSON.stringify(profileData));
    alert("✅ Profile saved!");
  }
}

// Page load এ আগের ডাটা বসানো
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("userProfile");
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById("displayName").value = data.displayName || "";
    document.getElementById("bio").value = data.bio || "";
    document.getElementById("privacy").value = data.privacy || "public";
    if (data.profilePic) {
      document.getElementById("profile-pic-preview").src = data.profilePic;
    }
  }
});

// Export JSON file
function exportProfile() {
  const saved = localStorage.getItem("userProfile");
  if (!saved) {
    alert("⚠ No profile data to export!");
    return;
  }

  const blob = new Blob([saved], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "profile.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}