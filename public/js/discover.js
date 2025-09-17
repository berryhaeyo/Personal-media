//discover.js
import { auth, db } from './firebase.js';
import { 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { 
  collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const recommendationList = document.getElementById('recommendationList');
const addLinkBtn = document.getElementById('addLinkBtn');
const siteNameInput = document.getElementById('siteName');
const siteURLInput = document.getElementById('siteURL');

let currentUserId = null;

// Render links with edit + delete
function renderLinks(links) {
  recommendationList.innerHTML = ''; 
  links.forEach(link => {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = link.url;
    a.target = "_blank";
    a.textContent = `🌐 ${link.name}`;
    li.appendChild(a);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = "✏";
    editBtn.className = "btn btn-sm btn-warning ms-2";
    editBtn.addEventListener('click', async () => {
      const newName = prompt("Enter new name:", link.name);
      const newURL = prompt("Enter new URL:", link.url);
      if (newName && newURL) {
        await updateDoc(doc(db, "discover-links", link.id), {
          name: newName,
          url: newURL
        });
        loadLinks();
      }
    });
    li.appendChild(editBtn);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = "🗑";
    delBtn.className = "btn btn-sm btn-danger ms-2";
    delBtn.addEventListener('click', async () => {
      await deleteDoc(doc(db, "discover-links", link.id));
      loadLinks();
    });
    li.appendChild(delBtn);

    recommendationList.appendChild(li);
  });
}

// Load saved links from Firestore
async function loadLinks() {
  if (!currentUserId) return;
  const q = query(collection(db, "discover-links"), where("uid", "==", currentUserId));
  const snapshot = await getDocs(q);
  const links = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  renderLinks(links);
}

// Auth state
onAuthStateChanged(auth, user => {
  if (!user) {
    alert("Please login first.");
    window.location.href = "./login.html";
    return;
  }
  currentUserId = user.uid;
  loadLinks();
});

// Add new link
addLinkBtn.addEventListener('click', async () => {
  const siteName = siteNameInput.value.trim();
  const siteURL = siteURLInput.value.trim();
  if (!siteName || !siteURL) return alert("Please enter both site name and URL.");

  await addDoc(collection(db, "discover-links"), {
    uid: currentUserId,
    name: siteName,
    url: siteURL
  });

  siteNameInput.value = '';
  siteURLInput.value = '';
  loadLinks();
});