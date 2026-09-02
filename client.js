// client.js
// Shared helper for a computer used by multiple one-on-one clients.
// Nothing here leaves the browser — no server, no account, no network call.
//
// - sessionStorage holds who is "active" right now, and clears itself
//   automatically when this browser tab is closed, so the next client
//   never accidentally inherits the previous one's name.
// - localStorage holds each named client's completed-topic checkmarks,
//   and persists across visits so returning clients keep their progress.

function getActiveClient() {
  return sessionStorage.getItem("activeClient");
}

function setActiveClient(name) {
  sessionStorage.setItem("activeClient", name.trim());
}

function clearActiveClient() {
  sessionStorage.removeItem("activeClient");
}

function progressKey(topicId) {
  const client = getActiveClient() || "guest";
  return `progress_${client}_${topicId}`;
}

function isTopicComplete(topicId) {
  return localStorage.getItem(progressKey(topicId)) === "true";
}

function setTopicComplete(topicId, complete) {
  localStorage.setItem(progressKey(topicId), complete ? "true" : "false");
}

// Makes Tab insert indentation inside a textarea instead of jumping focus
// to the next element on the page — the browser's default Tab behavior,
// which fights with writing Python since indentation is meaningful here.
// Shift+Tab removes one level of indentation from the current line.
function enableTabIndent(selector) {
  document.querySelectorAll(selector).forEach(textarea => {
    textarea.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      e.preventDefault();

      const indent = "    "; // 4 spaces, matching the code already on these pages
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (e.shiftKey) {
        const lineStart = textarea.value.lastIndexOf("\n", start - 1) + 1;
        const before = textarea.value.slice(lineStart, start);
        if (before.startsWith(indent)) {
          textarea.value = textarea.value.slice(0, lineStart) + before.slice(indent.length) + textarea.value.slice(start);
          textarea.selectionStart = textarea.selectionEnd = start - indent.length;
        }
      } else {
        textarea.value = textarea.value.slice(0, start) + indent + textarea.value.slice(end);
        textarea.selectionStart = textarea.selectionEnd = start + indent.length;
      }
    });
  });
}