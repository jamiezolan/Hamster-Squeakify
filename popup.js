document.addEventListener('DOMContentLoaded', () => {
    const squeakifyButton = document.getElementById('squeakify');
  
    squeakifyButton.addEventListener('click', () => {
      // Send a message to the content script to squeakify the page
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'squeakify' });
      });
  
      // Close the popup after the button is clicked
      window.close();
    });
  });
  