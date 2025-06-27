// src/ReportPage.jsx
import React, { useState } from "react";

export default function ReportPage() {
  const [fileName, setFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://aub2connect-report.onrender.com/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setProgress(100);
    } catch (err) {
      alert("Upload failed. Please try again.");
      setProgress(0);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1c2f] text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">AuB2Connect Report Viewer</h1>
        <p className="text-gray-400 mt-2">Preview your event analytics and download full report</p>
      </header>

      <section className="flex flex-col items-center gap-6">
        <div className="bg-[#182b45] p-6 rounded-xl w-full max-w-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Step 1: Upload Your Excel File</h2>
          <input
            type="file"
            accept=".xlsx"
            className="text-white"
            onChange={handleUpload}
          />
          {fileName && (
            <div className="text-sm text-green-400 mt-2 w-full">
              <p>{uploading ? "Uploading..." : `Uploaded: ${fileName}`}</p>
              {uploading && (
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full max-w-5xl aspect-video">
          <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src="https://lookerstudio.google.com/embed/reporting/d8b54418-95ef-4669-9070-0e8ec82cbfae/page/nfQPF"
            frameBorder="0"
            allowFullScreen
            title="Looker Studio Report"
          ></iframe>
        </div>

        <button
          className="mt-4 bg-yellow-400 text-black px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-500 transition"
          onClick={() => window.open("https://aub2connect-report.onrender.com/download", "_blank")}
        >
          Download Full Report (PDF)
        </button>
      </section>

      <footer className="text-center text-sm text-gray-500 mt-16">
        © 2025 AuB2Connect. All rights reserved.
      </footer>
    </div>
  );
}
