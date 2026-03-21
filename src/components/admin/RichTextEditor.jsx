import { useEffect, useRef } from "react";
import { Bold, Italic, List, Quote } from "lucide-react";

const actions = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Bullet List", icon: List, command: "insertUnorderedList" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" },
];

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  function applyCommand(command, commandValue) {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML || "");
  }

  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/70">
      <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              onClick={() => applyCommand(action.command, action.value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
              aria-label={action.label}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="min-h-[220px] w-full px-4 py-4 text-sm leading-7 text-slate-100 outline-none [&_blockquote]:border-l-2 [&_blockquote]:border-cyan-300/40 [&_blockquote]:pl-4 [&_li]:ml-5 [&_p]:mb-3 [&_ul]:list-disc"
      />
    </div>
  );
}
