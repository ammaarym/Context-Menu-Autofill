// popup.js handles storing the user's name/email when they click "Save"

document.getElementById("saveBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Save name and email to local Chrome storage
  chrome.storage.local.set({ name, email }, () => {
    alert("Saved!");
  });
});
