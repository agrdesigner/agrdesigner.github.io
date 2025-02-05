document.addEventListener("DOMContentLoaded", function () {
  const protectedContent = document.getElementById("protected");
  const passwordOverlay = document.getElementById("password-overlay");
  const passwordInput = document.getElementById("password-input");
  const submitButton = document.getElementById("submit-password");
  const errorMessage = document.getElementById("password-error");

  const correctPassword = "LikeAndZeldaLoveYou@123";

  // Check if already authenticated
  const isAuthenticated = sessionStorage.getItem("authenticated");
  if (isAuthenticated === "true") {
    showContent();
  }

  submitButton.addEventListener("click", validatePassword);
  passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      validatePassword();
    }
  });

  function validatePassword() {
    if (passwordInput.value === correctPassword) {
      sessionStorage.setItem("authenticated", "true");
      showContent();
    } else {
      errorMessage.textContent = "Incorrect password. Please try again.";
      errorMessage.style.display = "block";
      passwordInput.value = "";
    }
  }

  function showContent() {
    passwordOverlay.style.display = "none";
    protectedContent.classList.add("visible");
  }
});
