// content.js runs on every page and listens for messages from the background

// Listen for a message from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fill_input") {
    const activeElement = document.activeElement; // Element currently focused (text field)
    if (activeElement && activeElement.tagName === "INPUT") {
      activeElement.value = message.value;        // Fill in name or email
    }
  }
});
