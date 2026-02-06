(() => {
  const input = document.getElementById("search") || document.querySelector(".search-input");
  const results = document.getElementById("results");
  if (!input) return;

  // Wrap input in .searchbox (for clear button positioning)
  const wrapper = document.createElement("div");
  wrapper.className = "searchbox";
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  // Clear button (X)
  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "search-clear";
  clearBtn.setAttribute("aria-label", "Clear search");
  clearBtn.textContent = "×";
  wrapper.appendChild(clearBtn);

  // Meta line (result count + shortcuts)
  const meta = document.createElement("div");
  meta.className = "search-meta";
  wrapper.parentNode.insertBefore(meta, wrapper.nextSibling);

  // Recent searches (datalist)
  const datalist = document.createElement("datalist");
  datalist.id = "search-suggestions";
  document.body.appendChild(datalist);
  input.setAttribute("list", datalist.id);

  const KEY = "mm_search_recent_v1";
  const MAX_RECENT = 8;

  const isTypingTarget = (el) => {
    if (!el) return false;
    const tag = (el.tagName || "").toUpperCase();
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  };

  const dispatchSearchEvents = () => {
    // Different versions listen to different events, so fire both.
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: " " }));
  };

  const loadRecent = () => {
    let arr = [];
    try { arr = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch {}
    datalist.innerHTML = "";
    arr.forEach((q) => {
      const opt = document.createElement("option");
      opt.value = q;
      datalist.appendChild(opt);
    });
  };

  const saveRecent = (q) => {
    if (!q) return;
    let arr = [];
    try { arr = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch {}
    arr = arr.filter((x) => x !== q);
    arr.unshift(q);
    arr = arr.slice(0, MAX_RECENT);
    localStorage.setItem(KEY, JSON.stringify(arr));
    loadRecent();
  };

  const countResults = () => {
    if (!results) return 0;
    // Try common patterns: links or list items
    const links = results.querySelectorAll("a[href]");
    if (links.length) return links.length;
    return results.children ? results.children.length : 0;
  };

  const updateUI = () => {
    clearBtn.hidden = !input.value;

    const q = input.value.trim();
    if (!q) {
      meta.textContent = "Tip: / 로 검색창 포커스 · Esc로 지우기 · Enter로 첫 결과 열기";
      return;
    }
    meta.textContent = `"${q}" 결과: ${countResults()}개 · Enter=첫 결과 · Esc=지우기`;
  };

  const openFirstResult = () => {
    if (!results) return;
    const first = results.querySelector("a[href]");
    if (first) window.location.href = first.href;
  };

  clearBtn.addEventListener("click", () => {
    input.value = "";
    dispatchSearchEvents();
    input.focus();
    updateUI();
  });

  input.addEventListener("input", () => {
    updateUI();
    const q = input.value.trim();
    // 너무 자주 저장하지 않도록 짧게 입력 중엔 저장 X (3글자 이상일 때만)
    if (q.length >= 3) saveRecent(q);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      clearBtn.click();
    }
    if (e.key === "Enter") {
      // 기본 동작 유지하면서 "첫 결과 열기"도 제공
      openFirstResult();
    }
  });

  // '/' shortcut to focus search (like GitHub)
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !isTypingTarget(e.target)) {
      e.preventDefault();
      input.focus();
    }
  });

  // Watch results change -> update count
  if (results) {
    const obs = new MutationObserver(() => updateUI());
    obs.observe(results, { childList: true, subtree: true });
  }

  // Initial
  loadRecent();
  updateUI();
  // Auto-focus on page load
  setTimeout(() => input.focus(), 50);
})();
