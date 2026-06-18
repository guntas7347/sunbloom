"use client";

import { uploadToCloudinaryUnsigned } from "@/lib/cloudinary";
import { useState, useRef } from "react";
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file) return;

    // Simple validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setLoading(true);
    try {
      const url = await uploadToCloudinaryUnsigned(file);
      onChange(url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Drag handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFile(file);
  };

  // Trigger hidden input click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Cover Image
      </label>

      {/* --- Loading State --- */}
      {loading && (
        <div className="h-48 w-full rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-500 animate-pulse">
          <Loader2 className="animate-spin mb-2" size={32} />
          <span className="text-sm font-medium">
            Uploading to Cloudinary...
          </span>
        </div>
      )}

      {/* --- Empty State (Dropzone) --- */}
      {!value && !loading && (
        <div
          onClick={handleClick}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`
            relative h-48 w-full rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2
            ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
            }
          `}
        >
          <div className="p-4 bg-gray-100 rounded-full">
            <UploadCloud
              className={`text-gray-500 ${isDragging ? "text-indigo-500" : ""}`}
              size={24}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              <span className="text-indigo-600">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              SVG, PNG, JPG or GIF (max. 800x400px recommended)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}

      {/* --- Filled State (Preview) --- */}
      {value && !loading && (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          {/* Image Preview */}
          <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-500 truncate max-w-[200px]">
              <ImageIcon size={16} />
              <span className="truncate">Image Uploaded</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onChange("")}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Image"
              >
                <X size={18} />
              </button>

              <button
                onClick={handleClick}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw size={14} />
                Replace
              </button>
            </div>
          </div>

          {/* Hidden Input for Replace Action */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}
    </div>
  );
}
