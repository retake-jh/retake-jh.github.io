(() => {
  const input = document.getElementById("search") || document.querySelector(".search-input");
  const results = document.getElementById("results");
  if (!input) return;

  const isTypingTarget = (el) => {
    if (!el) return false;
    const tag = (el.tagName || "").toUpperCase();
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  };

  const openFirstResult = () => {
    if (!results) return;
    const first = results.querySelector("a[href]");
    if (first) window.location.href = first.href;
  };

  // Enter -> first result
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      openFirstResult();
    }
    if (e.key === "Escape") {
      // 입력만 지우기 (원치 않으면 이 블록 삭제해도 됨)
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  // '/' -> focus search (GitHub style)
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !isTypingTarget(e.target)) {
      e.preventDefault();
      input.focus();
    }
  });

  // Auto focus on load
  setTimeout(() => input.focus(), 50);
})();
