import React, { useState } from 'react';
import './index.css';

export default function Popup() {
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [lang, setLang] = useState('en');

  const toggleCaptions = () => {
    setCaptionsEnabled(!captionsEnabled);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'TOGGLE_CAPTIONS',
        enabled: !captionsEnabled,
        lang
      });
    });
  };

  return (
    <div className="p-4 w-64">
      <h1 className="text-lg font-bold mb-2">Live Captions</h1>
      <label>Language:</label>
      <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full mb-2">
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        {/* Add more languages */}
      </select>
      <button
        onClick={toggleCaptions}
        className="bg-blue-500 text-white w-full py-1 rounded"
      >
        {captionsEnabled ? 'Stop Captions' : 'Start Captions'}
      </button>
    </div>
  );
}
