// Theme: respect system, allow toggle with persistence
(function themeInit() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  } else {
    root.setAttribute("data-theme", "auto");
  }
})();

const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// Mobile nav
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // close when a link is clicked (mobile)
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navMenu.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Newsletter (fake submit)
const newsForm = document.getElementById("newsletter");
const newsMsg = document.getElementById("newsMsg");
if (newsForm) {
  newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsForm.email.value.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newsMsg.textContent = "Please enter a valid email.";
      return;
    }
    newsMsg.textContent = "Thanks! You’re subscribed.";
    newsForm.reset();
  });
}

// Enroll modal
const enrollModal = document.getElementById("enrollModal");
const enrollForm  = document.getElementById("enrollForm");
const enrollMsg   = document.getElementById("enrollMsg");
const courseInput = document.getElementById("course");

function openModal(courseName = "Frontend Bundle") {
  courseInput.value = courseName;
  enrollModal.setAttribute("open", "");
  enrollModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  enrollModal.removeAttribute("open");
  enrollModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  enrollMsg.textContent = "";
  enrollForm.reset();
}

document.querySelectorAll(".enrollBtn").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.course));
});
document.getElementById("openEnroll")?.addEventListener("click", (e) => {
  e.preventDefault();
  openModal("Frontend (Full Program)");
});
enrollModal?.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) closeModal();
});
enrollModal?.querySelector(".modal-close")?.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && enrollModal?.hasAttribute("open")) closeModal();
});

enrollForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = enrollForm.name.value.trim();
  const email = enrollForm.email.value.trim();
  if (!name) { enrollMsg.textContent = "Please enter your name."; return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { enrollMsg.textContent = "Please enter a valid email."; return; }
  enrollMsg.textContent = "✅ Submitted! We’ll contact you shortly.";
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
