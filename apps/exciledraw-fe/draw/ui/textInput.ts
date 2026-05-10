import { TEXT_FONT } from "../constants";

type CreateTextInputArgs = {
  clientX: number;
  clientY: number;
  color?: string;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
};

export function createTextInput({
  clientX,
  clientY,
  color = "white",
  onSubmit,
  onCancel,
}: CreateTextInputArgs) {
  const wrapper = document.createElement("div");
  const input = document.createElement("textarea");
  const minWidth = 240;
  const minHeight = 64;
  let boxX = clientX;
  let boxY = clientY;
  let boxWidth = 300;
  let boxHeight = 64;

  wrapper.style.position = "fixed";
  wrapper.style.left = `${boxX}px`;
  wrapper.style.top = `${boxY}px`;
  wrapper.style.zIndex = "9999";
  wrapper.style.border = "1px solid #a7a2ff";
  wrapper.style.boxSizing = "border-box";
  wrapper.style.background = "transparent";
  wrapper.style.minWidth = `${minWidth}px`;
  wrapper.style.minHeight = `${minHeight}px`;

  input.style.display = "block";
  input.style.background = "transparent";
  input.style.color = color;
  input.style.border = "none";
  input.style.outline = "none";
  input.style.font = TEXT_FONT;
  input.style.lineHeight = "24px";
  input.style.padding = "8px 10px";
  input.style.boxSizing = "border-box";
  input.style.minWidth = `${minWidth}px`;
  input.style.width = `${boxWidth}px`;
  input.style.minHeight = `${minHeight}px`;
  input.style.height = `${boxHeight}px`;
  input.style.resize = "none";
  input.style.overflow = "hidden";
  input.style.whiteSpace = "pre-wrap";
  input.style.overflowWrap = "break-word";

  const syncBox = () => {
    wrapper.style.left = `${boxX}px`;
    wrapper.style.top = `${boxY}px`;
    wrapper.style.width = `${boxWidth}px`;
    wrapper.style.height = `${boxHeight}px`;
    input.style.width = `${boxWidth}px`;
    input.style.height = `${boxHeight}px`;
  };

  const startResize = (event: MouseEvent, direction: string) => {
    event.preventDefault();
    event.stopPropagation();

    const startClientX = event.clientX;
    const startClientY = event.clientY;
    const startX = boxX;
    const startY = boxY;
    const startWidth = boxWidth;
    const startHeight = boxHeight;

    const onMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startClientX;
      const deltaY = moveEvent.clientY - startClientY;

      let nextX = startX;
      let nextY = startY;
      let nextWidth = startWidth;
      let nextHeight = startHeight;

      if (direction.includes("e")) {
        nextWidth = Math.max(minWidth, startWidth + deltaX);
      }

      if (direction.includes("s")) {
        nextHeight = Math.max(minHeight, startHeight + deltaY);
      }

      if (direction.includes("w")) {
        nextWidth = Math.max(minWidth, startWidth - deltaX);
        nextX = startX + startWidth - nextWidth;
      }

      if (direction.includes("n")) {
        nextHeight = Math.max(minHeight, startHeight - deltaY);
        nextY = startY + startHeight - nextHeight;
      }

      boxX = nextX;
      boxY = nextY;
      boxWidth = nextWidth;
      boxHeight = nextHeight;
      syncBox();
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const createHandle = (
    direction: string,
    style: Partial<CSSStyleDeclaration>,
  ) => {
    const handle = document.createElement("div");

    handle.style.position = "absolute";
    handle.style.width = "9px";
    handle.style.height = "9px";
    handle.style.background = "#111";
    handle.style.border = "1.5px solid #a7a2ff";
    handle.style.boxSizing = "border-box";
    handle.style.pointerEvents = "auto";
    handle.style.zIndex = "2";

    Object.assign(handle.style, style);
    handle.addEventListener("mousedown", (event) => startResize(event, direction));
    wrapper.appendChild(handle);
  };

  createHandle("nw", { left: "-5px", top: "-5px", cursor: "nwse-resize" });
  createHandle("ne", { right: "-5px", top: "-5px", cursor: "nesw-resize" });
  createHandle("sw", { left: "-5px", bottom: "-5px", cursor: "nesw-resize" });
  createHandle("se", { right: "-5px", bottom: "-5px", cursor: "nwse-resize" });
  createHandle("n", {
    left: "50%",
    top: "-26px",
    borderRadius: "999px",
    transform: "translateX(-50%)",
    cursor: "ns-resize",
  });

  let finished = false;

  const resizeInput = () => {
    boxWidth = Math.max(boxWidth, Math.min(520, input.scrollWidth + 20));
    boxHeight = Math.max(boxHeight, input.scrollHeight);
    syncBox();
  };

  const finish = (save: boolean) => {
    if (finished) return;

    finished = true;
    const text = input.value.trim();

    wrapper.remove();

    if (save && text) {
      onSubmit(text);
    } else {
      onCancel?.();
    }
  };

  wrapper.addEventListener("mousedown", (event) => {
    event.stopPropagation();
  });

  wrapper.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        finish(true);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      finish(false);
    }
  });

  input.addEventListener("input", resizeInput);

  input.addEventListener("blur", () => {
    finish(true);
  });

  wrapper.appendChild(input);
  document.body.appendChild(wrapper);
  syncBox();
  resizeInput();

  window.setTimeout(() => {
    input.focus();
  }, 0);

  return input;
}

export function removeTextInput(input: HTMLTextAreaElement | null) {
  const wrapper = input?.parentElement;

  wrapper?.remove();
}
