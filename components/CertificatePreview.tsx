"use client";
import { useEffect, useState } from "react";

export default function CertificatePreview({ participant }: any) {
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
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
      setPdfSrc(`data:application/pdf;base64,${base64}`);
      setLoading(false);
    }

    generatePdf();
  }, [participant]);

  return (
    <div className="w-full flex flex-col items-center gap-6 mb-8">
      
      {/* 🔄 LOADER IN PLACE OF PREVIEW */}
      {loading && (
        <div className="w-full flex justify-center items-center py-16">
          <div className="loader"></div>
        </div>
      )}

      {/* ✅ AFTER LOADING */}
      {!loading && pdfSrc && (
        <>
          {/* (Preview intentionally removed as per your design) */}

          {/* Download Button */}
          <a
            href={pdfSrc}
            download={`${participant.Name}_certificate.pdf`}
            className="mt-2 max-w-sm bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
                       text-amber-950 font-bold px-6 py-3 rounded-xl shadow-lg
                       hover:from-yellow-500 hover:to-yellow-700 transition text-center"
          >
            Download Certificate
          </a>
        </>
      )}
    </div>
  );
}
