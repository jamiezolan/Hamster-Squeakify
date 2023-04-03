document.addEventListener('DOMContentLoaded', () => {
    const squeakifyButton = document.getElementById('squeakify');
  
    squeakifyButton.addEventListener('click', async () => {
      // Inject the content script into the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      }, () => {
        // Send a message to the content script to squeakify the page
        chrome.tabs.sendMessage(tab.id, { action: 'squeakify' });
  
        // Close the popup after the button is clicked
        window.close();
      });
    });
  });