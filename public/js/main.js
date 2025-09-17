//main.js
import { auth } from './firebase.js';
console.log("Auth object:", auth);

import { login, register, signInWithGoogle } from './auth.js';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

window.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  const switchToLogin = () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  };
  const switchToRegister = () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  };

  loginTab.addEventListener('click', switchToLogin);
  registerTab.addEventListener('click', switchToRegister);

  // Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target['login-email'].value.trim();
    const password = e.target['login-password'].value;
    try {
      await login(email, password);
      window.location.href = "./dashboard.html";
    } catch (err) {
      alert("Login failed: " + (err?.message || err));
      console.error(err);
    }
  });

  // Register
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target['register-email'].value.trim();
    const password = e.target['register-password'].value;
    const password2 = e.target['register-password2'].value;
    const name = e.target['register-name'].value.trim();

    if (password !== password2) {
      alert("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }

    try {
      await register(email, password, name);
      window.location.href = "./dashboard.html";
    } catch (err) {
      alert("Registration failed: " + (err?.message || err));
      console.error(err);
    }
  });

  // Google login
  document.getElementById("google-login")?.addEventListener("click", async () => {
    try {
      await signInWithGoogle();
      window.location.href = "./dashboard.html";
    } catch (err) {
      alert("Google login failed: " + (err?.message || err));
      console.error(err);
    }
  });

  // Google signup
  document.getElementById("google-register")?.addEventListener("click", async () => {
    try {
      await signInWithGoogle();
      window.location.href = "./dashboard.html";
    } catch (err) {
      alert("Google signup failed: " + (err?.message || err));
      console.error(err);
    }
  });

  // Guest continue
  document.getElementById('guest-continue')?.addEventListener('click', () => {
    localStorage.setItem("guestMode", "true");
    window.location.href = "./dashboard.html";
  });

  // Forgot password
  document.getElementById("forgot-password")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    if (!email) {
      alert("Enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent! Check your inbox/spam.");
    } catch (err) {
      alert("Error: " + (err?.message || err));
      console.error(err);
    }
  });
});
import { logout } from "./auth.js";

document.getElementById("logout-btn")?.addEventListener("click", async () => {
  try {
    await logout();
    console.log("User logged out");
    window.location.href = "./login.html"; // ✅ redirect after logout
  } catch (err) {
    console.error("Logout failed:", err.message);
    alert("Logout failed: " + err.message);
  }
});