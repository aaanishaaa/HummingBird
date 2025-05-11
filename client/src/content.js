let captionDiv = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'TOGGLE_CAPTIONS') {
    if (message.enabled) {
      startCaptions(message.lang);
    } else {
      stopCaptions();
    }
  }
});

function startCaptions(lang) {
  if (!captionDiv) {
    captionDiv = document.createElement('div');
    captionDiv.style.position = 'fixed';
    captionDiv.style.bottom = '20px';
    captionDiv.style.left = '50%';
    captionDiv.style.transform = 'translateX(-50%)';
    captionDiv.style.background = 'rgba(0,0,0,0.7)';
    captionDiv.style.color = 'white';
    captionDiv.style.padding = '10px 20px';
    captionDiv.style.borderRadius = '12px';
    captionDiv.style.zIndex = '9999';
    captionDiv.innerText = 'Captions loading...';
    document.body.appendChild(captionDiv);

    // TODO: Connect WebSocket to backend to stream audio + receive captions
  }
}

function stopCaptions() {
  if (captionDiv) {
    captionDiv.remove();
    captionDiv = null;
  }
}
