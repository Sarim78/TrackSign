/**
 * UploadPage — PDF drop zone that runs a simulated scan and saves a review.
 *
 * Route: /dashboard/upload
 * Dependencies: useAuth, review store
 * TODO [BACKEND]: Replace localStorage with POST /api/contracts/upload
 * TODO [BACKEND]: Send contract_type to POST /api/contracts/upload
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { createReview, formatFileSize } from "@/lib/reviews";

interface ContractTypeOption {
  value: string;
  label: string;
}

const CONTRACT_TYPES: ContractTypeOption[] = [
  { value: "auto-detect", label: "Auto-detect (recommended)" },
  { value: "Service agreement", label: "Service agreement" },
  { value: "Vendor / supplier contract", label: "Vendor / supplier contract" },
  { value: "Non-disclosure agreement (NDA)", label: "Non-disclosure agreement (NDA)" },
  { value: "Lease / rental agreement", label: "Lease / rental agreement" },
  { value: "Employment contract", label: "Employment contract" },
  { value: "Statement of work (SOW)", label: "Statement of work (SOW)" },
  { value: "Partnership agreement", label: "Partnership agreement" },
  { value: "Licensing agreement", label: "Licensing agreement" },
  { value: "Other", label: "Other" },
];

const cardStyle = {
  backgroundColor: "#1e1c18",
  border: "1px solid #2a2722",
} as const;

const STEPS = ["Uploading file...", "Extracting text...", "Analyzing clauses...", "Generating report..."];

const UploadPage = () => {
  const router = useRouter();
  const { user, incrementReviewCount } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [blocked, setBlocked] = useState<boolean>(false);
  const [status, setStatus] = useState<"idle" | "processing">("idle");
  const [step, setStep] = useState<number>(0);
  const [contractType, setContractType] = useState<string>("auto-detect");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Accepts a PDF only when both the extension and MIME type match.
  const takeFile = (next: File | undefined) => {
    if (!next) return;
    setError("");
    setBlocked(false);
    const hasPdfExtension = next.name.toLowerCase().endsWith(".pdf");
    const hasPdfMime = next.type === "application/pdf";
    if (!hasPdfExtension || !hasPdfMime) {
      setFile(null);
      setError("Only PDF files are supported.");
      return;
    }
    if (next.size > 20 * 1024 * 1024) {
      setFile(null);
      setError("File must be under 20MB.");
      return;
    }
    setFile(next);
    setStatus("idle");
  };

  // Handles file drop on the upload zone — validates type and size.
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    takeFile(event.dataTransfer.files[0]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    takeFile(event.target.files?.[0]);
  };

  const handleZoneKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  // Checks if user is on free plan and has used their review.
  const canUpload = user?.plan === "pro" || (user?.reviewCount ?? 0) < 1;

  // Runs the fake scan, then saves the review and opens the report.
  const handleStartReview = () => {
    if (!file || !user) return;
    if (!canUpload) {
      setBlocked(true);
      return;
    }
    setBlocked(false);
    setStatus("processing");
    setStep(0);
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [
      window.setTimeout(() => setStep(1), 1000),
      window.setTimeout(() => setStep(2), 2000),
      window.setTimeout(() => setStep(3), 4000),
      window.setTimeout(() => {
        // TODO [BACKEND]: Replace createReview with uploadContract(file, contractType)
        const review = createReview(file.name, formatFileSize(file.size));
        incrementReviewCount();
        router.push(`/dashboard/${review.id}`);
      }, 5000),
    ];
  };

  const accent = hovered || dragging;

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold">Upload a contract</h2>
      <p className="mb-8 text-sm" style={{ color: "#999" }}>
        Upload a PDF and TrackSign will scan every clause.
      </p>

      {status === "idle" ? (
        <>
          <div className="mb-6">
            <label htmlFor="contract-type" className="mb-2 block text-sm" style={{ color: "#999" }}>
              What type of contract is this?
            </label>
            <select
              id="contract-type"
              value={contractType}
              onChange={(event) => setContractType(event.target.value)}
              className="w-full max-w-md rounded-md px-3 py-2.5 text-sm"
              style={{ backgroundColor: "#141210", border: "1px solid #2a2722", color: "#EDEDED" }}
            >
              {CONTRACT_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload a PDF contract"
            className="cursor-pointer rounded-xl p-16 text-center"
            style={{
              backgroundColor: "#1e1c18",
              border: `2px dashed ${accent ? "#E8614D" : "#2a2722"}`,
              boxShadow: dragging ? "0 0 20px -5px rgba(232,97,77,0.2)" : "none",
            }}
            onClick={() => inputRef.current?.click()}
            onKeyDown={handleZoneKeyDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div
              className="relative mx-auto h-12 w-10"
              style={{ backgroundColor: "#141210", border: "1px solid #2a2722" }}
            >
              <span
                className="absolute right-0 top-0 h-4 w-4"
                style={{
                  backgroundColor: "#1e1c18",
                  borderLeft: "1px solid #2a2722",
                  borderBottom: "1px solid #2a2722",
                }}
              />
            </div>
            <p className="mt-4 text-sm font-medium">Drop your contract here</p>
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
              aria-label="Choose PDF file"
              onChange={handleFileChange}
            />
          </div>
          {error ? (
            <p className="mt-3 text-xs" role="alert" style={{ color: "#EF4444" }}>
              {error}
            </p>
          ) : null}
          <p className="mt-3 text-xs" style={{ color: "#666" }}>
            Currently supports PDF files. DOCX support coming soon.
          </p>
          <p className="mt-1 text-xs" style={{ color: "#666" }}>
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
            Encrypted and private.
          </p>

          {file ? (
            <div className="mt-4 flex flex-col gap-3 rounded-xl p-5 sm:flex-row sm:items-center sm:justify-between" style={cardStyle}>
              <div className="min-w-0">
                <p className="truncate text-sm">{file.name}</p>
                <p className="text-xs" style={{ color: "#666" }}>
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartReview}
                className="shrink-0 rounded-md px-5 py-2.5 text-sm text-white"
                style={{ backgroundColor: "#E8614D" }}
              >
                Review contract
              </button>
            </div>
          ) : null}

          {blocked ? (
            <div className="mt-4 rounded-xl p-6 text-center" role="alert" style={cardStyle}>
              <p className="text-sm">You have used your free review. Upgrade to Pro for unlimited reviews.</p>
              <Link
                href="/dashboard/settings"
                className="mt-4 inline-block rounded-md px-5 py-2.5 text-sm text-white"
                style={{ backgroundColor: "#E8614D" }}
              >
                Upgrade to Pro
              </Link>
            </div>
          ) : null}
        </>
      ) : null}

      {status === "processing" ? (
        <div className="rounded-xl p-8" style={cardStyle}>
          <p className="mb-6 text-center text-sm">Scanning contract...</p>
          <div className="mx-auto max-w-sm space-y-3">
            {STEPS.map((label, index) => {
              const done = index < step;
              const current = index === step;
              return (
                <div key={label} className="flex items-center gap-3">
                  {done ? (
                    <span className="text-sm" style={{ color: "#22C55E" }}>
                      ✓
                    </span>
                  ) : current ? (
                    <span
                      className="h-4 w-4 animate-spin rounded-full"
                      style={{ border: "2px solid #E8614D", borderTopColor: "transparent" }}
                    />
                  ) : (
                    <span className="h-4 w-4 rounded-full" style={{ border: "1px solid #555" }} />
                  )}
                  <p className="text-sm" style={{ color: done ? "#EDEDED" : current ? "#EDEDED" : "#555" }}>
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs" style={{ color: "#666" }}>
            This usually takes under 60 seconds.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default UploadPage;
