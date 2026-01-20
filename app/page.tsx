"use client";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CertificatePreview from "../components/CertificatePreview";

export default function Home() {
  const [participant, setParticipant] = useState<any>(null);

  return (
    <main className="flex flex-col items-center gap-8 py-10">
      <img src="/sap-logo.png" className="h-24" alt="SAP Logo" />

      <h1 className="text-4xl font-bold text-white text-center">
        SAP Inside Track Kolkata Participation Certificate 
      </h1>

      <SearchBar onSelect={setParticipant} />

      {participant && (
        <div className="w-full flex justify-center">
          <CertificatePreview participant={participant} />
        </div>
      )}
    </main>
  );
}
