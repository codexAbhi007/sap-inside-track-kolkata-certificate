"use client";
import { useEffect, useState } from "react";

const ButtonSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-amber-950"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export default function CertificatePreview({ participant }: any) {
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function generatePdf() {
      setLoading(true);

      const res = await fetch("/api/generatePdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participant),
      });

      const { base64 } = await res.json();
      setPdfSrc(`data:application/pdf;base64,${base64}`);
      setLoading(false);
    }

    generatePdf();
  }, [participant]);

  const handleDownload = () => {
    if (!pdfSrc) return;

    setDownloading(true);

    const link = document.createElement("a");
    link.href = pdfSrc;
    link.download = `${participant.Name}_certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Re-enable button after short delay (browser-safe)
    setTimeout(() => {
      setDownloading(false);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 mb-8">

      {/* 🔄 PREVIEW LOADER */}
      {loading && (
        <div className="w-full flex justify-center py-16">
          <div className="loader"></div>
        </div>
      )}

      {/* ⬇️ DOWNLOAD BUTTON */}
      {!loading && pdfSrc && (
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`mt-2 max-w-sm flex items-center justify-center gap-2
            bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
            text-amber-950 font-bold px-6 py-3 rounded-xl shadow-lg
            transition
            ${
              downloading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-yellow-500 hover:to-yellow-700"
            }
          `}
        >
          {downloading ? (
            <>
              <ButtonSpinner />
              Downloading…
            </>
          ) : (
            "Download Certificate"
          )}
        </button>
      )}
    </div>
  );
}
