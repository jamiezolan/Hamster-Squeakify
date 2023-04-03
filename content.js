let originalContent = null;

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
  if (!originalContent) {
    originalContent = document.body.cloneNode(true);
  }
  squeakifyNode(document.body);
}

function unsqueakifyPage() {
  if (originalContent) {
    document.body.replaceWith(originalContent.cloneNode(true));
    originalContent = null;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'squeakify') {
    squeakifyPage();
  } else if (request.action === 'unsqueakify') {
    unsqueakifyPage();
  }
});
