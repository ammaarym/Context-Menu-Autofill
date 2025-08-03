// background.js runs in the background and sets up the context menu on extension load

chrome.runtime.onInstalled.addListener(() => {
  // Create two right-click menu items: one for "Name" and one for "Email"
  chrome.contextMenus.create({
    id: "insert_name",
    title: "Insert Name",
    contexts: ["editable"] // Only show when user right-clicks a text field
  });

  chrome.contextMenus.create({
    id: "insert_email",
    title: "Insert Email",
    contexts: ["editable"]
  });
});

// Listen for when the user clicks one of the context menu items
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Get stored data and send it to the content script
  chrome.storage.local.get(["name", "email"], (data) => {
    let valueToInsert = "";
    if (info.menuItemId === "insert_name") {
      valueToInsert = data.name || "";
    } else if (info.menuItemId === "insert_email") {
      valueToInsert = data.email || "";
    }

    // Send a message to the content script to insert the value into the field
    chrome.tabs.sendMessage(tab.id, {
      action: "fill_input",
      value: valueToInsert
    });
  });
});
