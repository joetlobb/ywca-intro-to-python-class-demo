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