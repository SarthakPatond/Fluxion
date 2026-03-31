import { useEffect, useRef } from "react";
import { Bold, Italic, List, Quote } from "lucide-react";
import { AdminCard, AdminButton } from "./AdminUI";

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
    <AdminCard className="overflow-hidden p-0">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/[0.03] p-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <AdminButton
              key={action.label}
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => applyCommand(action.command, action.value)}
              className="h-10 w-10 rounded-2xl"
              aria-label={action.label}
            >
              <Icon size={16} />
            </AdminButton>
          );
        })}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        className="admin-editor-content min-h-[260px] w-full px-5 py-4 text-sm leading-7 text-slate-100 outline-none"
      />
    </AdminCard>
  );
}
