"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function QuillEditor({ value, onChange, placeholder = "Write rich content here..." }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const quill = useRef<Quill | null>(null);

  useEffect(() => {
    if (!ref.current || quill.current) return;

    quill.current = new Quill(ref.current, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "link"],
            ["clean"],
          ],
        },
      },
    });

    quill.current.on("text-change", () => {
      onChange(quill.current!.root.innerHTML);
    });
  }, [onChange, placeholder]);

  useEffect(() => {
    if (!quill.current) return;
    const html = quill.current.root.innerHTML;
    if (html !== value) {
      quill.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="quill-editor-wrapper bg-white">
      <div className="min-h-[280px]" ref={ref} />
    </div>
  );
}
