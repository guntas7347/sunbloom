"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function QuillEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const quill = useRef<Quill | null>(null);

  useEffect(() => {
    if (!ref.current || quill.current) return;

    quill.current = new Quill(ref.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic"],
          ],
        },
      },
      formats: ["size", "bold", "italic"],
    });

    quill.current.on("text-change", () => {
      onChange(quill.current!.root.innerHTML);
    });
  }, [onChange]);

  useEffect(() => {
    if (!quill.current) return;
    const html = quill.current.root.innerHTML;
    if (html !== value) {
      quill.current.root.innerHTML = value || "";
    }
  }, [value]);

  return <div className="border-none" ref={ref} />;
}
