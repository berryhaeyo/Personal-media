//auth.js
import { auth, db } from './firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ✅ Ensure a basic profile doc exists for this user
async function ensureUserDoc(user) {
  if (!user) return;
  const ref = doc(db, "users", user.uid);

  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        name: user.displayName || "",
        email: user.email || "",
        role: "user",
        totalItems: 0,
        watchlistCount: 0,
        inProgressCount: 0,
        completedCount: 0,
        isPublic: false,
        bio: "",
        profilePicBase64: "",
        createdAt: new Date().toISOString()
      });
    }
  } catch (err) {
    console.error("⚠ Failed to ensure user doc:", err.message || err);
    // Optional fallback (don’t block login)
    // alert("Profile creation failed. Some features may not work.");
  }
}

// ✅ Email/Password Login
export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(cred.user);
  return cred;
}

// ✅ Email/Password Register
export async function register(email, password, name) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // Set display name
  await updateProfile(cred.user, { displayName: name });
  // Create profile doc
  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    role: "user",
    totalItems: 0,
    watchlistCount: 0,
    inProgressCount: 0,
    completedCount: 0,
    isPublic: false,
    bio: "",
    profilePicBase64: "",
    createdAt: new Date().toISOString()
  });
  return cred;
}

// ✅ Google Login/Signup (same popup)
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await ensureUserDoc(cred.user);
  return cred;
}

// ✅ Logout
export async function logout() {
  await signOut(auth);
}

// ✅ Watch auth state
export function watchAuth(callback) {
  onAuthStateChanged(auth, callback);
}

// ✅ Guarded pages: redirect to login if not signed in
export function checkAuthAndRedirect() {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "./login.html";
    } else {
      const nameSpan = document.getElementById("username");
      if (nameSpan) nameSpan.textContent = user.displayName || "User";
    }
  });
}