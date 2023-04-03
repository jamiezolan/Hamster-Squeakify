document.addEventListener('DOMContentLoaded', () => {
    const squeakifyButton = document.getElementById('squeakify');
    const unsqueakifyButton = document.getElementById('unsqueakify');
  
    function executeContentScript(action) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ['content.js']
          },
          () => {
            // Send a message to the content script to perform the specified action
            chrome.tabs.sendMessage(tabs[0].id, { action });
  
            // Close the popup after the button is clicked
            window.close();
          }
        );
      });
    }
  
    squeakifyButton.addEventListener('click', () => {
      executeContentScript('squeakify');
    });
  
    unsqueakifyButton.addEventListener('click', () => {
      executeContentScript('unsqueakify');
    });
  });
  