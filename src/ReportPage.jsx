import React from "react";

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-[#0e1c2f] text-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">AuB2Connect Report Viewer</h1>
        <p className="text-gray-400 mt-2">Preview your event analytics and download full report</p>
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

        <button
          className="mt-4 bg-yellow-400 text-black px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-500 transition"
          onClick={() => window.open("https://yourdomain.com/download/report.pdf", "_blank")}
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