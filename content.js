function squeakifyText(text) {
  const squeak = '🐹 squeak';
  return text.replace(/\b\w+\b/g, squeak);
}

function squeakifyNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = squeakifyText(node.textContent);
  } else {
    for (const child of node.childNodes) {
      squeakifyNode(child);
    }
  }
}

function squeakifyPage() {
  squeakifyNode(document.body);
}

// Listen for the message from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'squeakify') {
    squeakifyPage();
  }
});
