(() => {
  const input = document.getElementById("search") || document.querySelector(".search-input");
  if (!input) return;

  // Wrap input in .searchbox
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

  const dispatchSearchEvents = () => {
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: " " }));
  };

  const update = () => {
    clearBtn.hidden = !input.value;
  };

  clearBtn.addEventListener("click", () => {
    input.value = "";
    dispatchSearchEvents();
    input.focus();
    update();
  });

  input.addEventListener("input", () => update());

  // Esc to clear
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      clearBtn.click();
    }
  });

  // '/' to focus (like GitHub)
  const isTypingTarget = (el) => {
    if (!el) return false;
    const tag = (el.tagName || "").toUpperCase();
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !isTypingTarget(e.target)) {
      e.preventDefault();
      input.focus();
    }
  });

  // initial
  update();
  setTimeout(() => input.focus(), 50);
})();
