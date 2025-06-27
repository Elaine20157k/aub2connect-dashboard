import React, { useState } from "react";

export default function ReportPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(30);

    try {
      const res = await fetch("https://aub2connect-report.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setProgress(100);
      alert("✅ Upload successful!");
    } catch (err) {
      alert("❌ Upload failed. Please try again.");
      setProgress(0);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1c2f] text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">AuB2Connect Report System</h1>
        <p className="text-gray-400 mt-2">Upload Excel → Generate Insightful Report</p>
      </header>

      <section className="flex flex-col items-center gap-6">
        <div className="w-full max-w-5xl aspect-video">
          <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src="https://lookerstudio.google.com/embed/reporting/d8b54418-95ef-4669-9070-0e8ec82cbfae/page/nfQPF"
            frameBorder="0"
            allowFullScreen
            title="Looker Studio Report"
          ></iframe>
        </div>

        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="text-black mt-4"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          {uploading ? "Uploading..." : "Upload Excel File"}
        </button>

        {progress > 0 && (
          <div className="w-full max-w-sm bg-gray-700 rounded-full h-4 mt-2">
            <div
              className="bg-green-400 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          onClick={() =>
            window.open("https://aub2connect-report.onrender.com/download", "_blank")
          }
          className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-500 transition"
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
