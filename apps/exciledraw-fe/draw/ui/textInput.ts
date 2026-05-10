import { TEXT_FONT } from "../constants";

type CreateTextInputArgs = {
  clientX: number;
  clientY: number;
  onSubmit: (text: string) => void;
  onCancel?: () => void;
};

export function createTextInput({
  clientX,
  clientY,
  onSubmit,
  onCancel,
}: CreateTextInputArgs) {
  const input = document.createElement("textarea");

  input.style.position = "fixed";
  input.style.left = `${clientX}px`;
  input.style.top = `${clientY}px`;
  input.style.zIndex = "9999";
  input.style.background = "rgba(0, 0, 0, 0.9)";
  input.style.color = "white";
  input.style.border = "1px solid white";
  input.style.outline = "none";
  input.style.font = TEXT_FONT;
  input.style.lineHeight = "24px";
  input.style.padding = "3px 6px";
  input.style.minWidth = "240px";
  input.style.width = "300px";
  input.style.minHeight = "34px";
  input.style.height = "34px";
  input.style.resize = "none";
  input.style.overflow = "hidden";
  input.style.whiteSpace = "pre-wrap";
  input.style.overflowWrap = "break-word";

  let finished = false;

  const resizeInput = () => {
    input.style.height = "auto";
    input.style.width = `${Math.max(240, Math.min(520, input.scrollWidth + 2))}px`;
    input.style.height = `${Math.max(34, input.scrollHeight)}px`;
  };

  const finish = (save: boolean) => {
    if (finished) return;

    finished = true;
    const text = input.value.trim();

    if (input.parentNode) {
      input.parentNode.removeChild(input);
    }

    if (save && text) {
      onSubmit(text);
    } else {
      onCancel?.();
    }
  };

  input.addEventListener("mousedown", (event) => {
    event.stopPropagation();
  });

  input.addEventListener("click", (event) => {
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

  document.body.appendChild(input);
  resizeInput();

  window.setTimeout(() => {
    input.focus();
  }, 0);

  return input;
}

export function removeTextInput(input: HTMLTextAreaElement | null) {
  if (input?.parentNode) {
    input.parentNode.removeChild(input);
  }
}
