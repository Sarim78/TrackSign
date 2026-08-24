"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function UploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing">("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function takeFile(next: File | undefined) {
    if (!next) return;
    if (next.type !== "application/pdf" && !next.name.toLowerCase().endsWith(".pdf")) return;
    setFile(next);
    setStatus("idle");
  }

  function startReview() {
    // TODO: Replace with real redirect to /dashboard/{reviewId} after backend creates the review
    setStatus("processing");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      router.push("/dashboard/review-demo");
    }, 3000);
  }

  const accentBorder = hovered || dragging;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Upload a contract</h2>
      <p className="mb-8 text-sm" style={{ color: "#999" }}>
        Upload a PDF and TrackSign will scan every clause.
      </p>

      {status === "idle" ? (
        <>
          <div
            className="cursor-pointer rounded-xl p-16 text-center"
            style={{
              backgroundColor: "#1e1c18",
              border: `2px dashed ${accentBorder ? "#E8614D" : "#2a2722"}`,
            }}
            onClick={() => inputRef.current?.click()}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              takeFile(event.dataTransfer.files[0]);
            }}
          >
            <p className="text-3xl" style={{ color: "#666" }}>
              ↑
            </p>
            <p className="mt-4 text-sm font-medium" style={{ color: "#EDEDED" }}>
              Drop your contract here
            </p>
            <p className="mt-1 text-xs" style={{ color: "#666" }}>
              or click to browse
            </p>
            <p className="mt-4 text-xs" style={{ color: "#666" }}>
              PDF files up to 20MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(event) => takeFile(event.target.files?.[0])}
            />
          </div>
          <p className="mt-3 text-xs" style={{ color: "#666" }}>
            Currently supports PDF files. DOCX support coming soon.
          </p>
          <p className="mt-1 text-xs" style={{ color: "#666" }}>
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
            Encrypted and private.
          </p>

          {file ? (
            <div className="mt-4 flex items-center justify-between rounded-xl p-5" style={cardStyle}>
              <div className="min-w-0">
                <p className="truncate text-sm">{file.name}</p>
                <p className="text-xs" style={{ color: "#666" }}>
                  {formatSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={startReview}
                className="shrink-0 rounded-md px-5 py-2.5 text-sm text-white"
                style={{ backgroundColor: "#E8614D" }}
              >
                Review contract
              </button>
            </div>
          ) : null}
        </>
      ) : null}

      {status === "processing" ? (
        <div className="rounded-xl p-8 text-center" style={cardStyle}>
          <p className="text-sm" style={{ color: "#EDEDED" }}>
            Scanning contract...
          </p>
          <div
            className="mx-auto mt-4 h-6 w-6 animate-spin rounded-full"
            style={{ border: "2px solid #E8614D", borderTopColor: "transparent" }}
          />
          <p className="mt-3 text-xs" style={{ color: "#666" }}>
            This usually takes under 60 seconds.
          </p>
        </div>
      ) : null}
    </div>
  );
}
