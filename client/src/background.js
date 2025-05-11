chrome.runtime.onInstalled.addListener(() => {
    console.log("HummingBird Extension Installed");
  
    // Example: Set default settings on install
    chrome.storage.local.set({ captionsEnabled: false, selectedLang: 'en' });
  });
  
  // Listen to messages from popup or content scripts
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TOGGLE_CAPTIONS') {
      chrome.storage.local.set({ captionsEnabled: message.enabled, selectedLang: message.lang });
      sendResponse({ success: true });
    } else if (message.type === 'GET_CAPTION_SETTINGS') {
      chrome.storage.local.get(['captionsEnabled', 'selectedLang'], (data) => {
        sendResponse(data);
      });
      return true;  // Keep the message channel open for async response
    }
  });
  