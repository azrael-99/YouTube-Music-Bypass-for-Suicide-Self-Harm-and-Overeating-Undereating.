function bypassWarning() {
  // Look for the exact button text
  const buttons = document.querySelectorAll('button, a, div[role="button"]');
  for (const btn of buttons) {
    const text = btn.textContent.trim();
    if (text === "I understand and wish to proceed" ||
        text.includes("I understand") ||
        text.includes("wish to proceed")) {
      console.log("Bypassing self-harm warning...");
      btn.click();
      return true;
    }
  }

  // Alternative: look for common container with the warning text
  const warningTexts = Array.from(document.querySelectorAll('*'))
    .filter(el => {
      const t = el.textContent || '';
      return t.includes("suicide or self-harm") || 
             t.includes("Viewer discretion is advised");
    });

  if (warningTexts.length > 0) {
    // Try clicking any prominent button nearby
    const possibleButtons = document.querySelectorAll('button');
    for (const b of possibleButtons) {
      if (b.textContent.includes("understand") || b.textContent.includes("proceed")) {
        b.click();
        return true;
      }
    }
  }
  return false;
}

// Run immediately and then poll every 500ms (in case the warning loads late, e.g. in playlists)
bypassWarning();
const observer = new MutationObserver(() => {
  if (bypassWarning()) {
    // Optional: stop observing after success
    // observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Also run on navigation changes (YouTube SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(bypassWarning, 800);
  }
}).observe(document, { subtree: true, childList: true });