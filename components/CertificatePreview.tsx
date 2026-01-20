"use client";

import { useEffect, useState } from "react";

export default function CertificatePreview({ participant }: any) {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generatePdf() {
      setLoading(true);

      const res = await fetch("/api/generatePdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participant),
      });

      const { base64 } = await res.json();

      // ✅ Convert base64 → Blob → Object URL
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      setPdfBlobUrl(blobUrl);
      setLoading(false);
    }

    generatePdf();

    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [participant]);

  return (
    <div className="w-full flex flex-col items-center gap-4 mb-8">
      {/* LOADER */}
      {loading && (
        <div className="flex flex-col items-center gap-3 py-10">
          <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-amber-950 text-sm">
            Generating certificate…
          </p>
        </div>
      )}

      {/* DOWNLOAD BUTTON (REAL LINK) */}
      {!loading && pdfBlobUrl && (
        <>
          <a
            href={pdfBlobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 max-w-sm px-6 py-3 rounded-xl font-bold text-amber-950
              shadow-lg transition-all text-center
              bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
              hover:from-yellow-500 hover:to-yellow-700"
          >
            Download Certificate
          </a>

        </>
      )}
    </div>
  );
}
