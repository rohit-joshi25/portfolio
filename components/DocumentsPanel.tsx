const resumePdf = "/documents/rohit-joshi-resume.pdf";
const resumeDocx = "/documents/rohit-joshi-resume.docx";

export default function DocumentsPanel() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-6">
          <p className="text-xs text-zinc-500">/documents</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Documents</h1>
        </header>

        <article className="rounded-md border border-zinc-200 p-4 sm:p-5">
          <h2 className="text-base font-semibold">Resume</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Rohit Joshi — Backend Engineer (Laravel / PHP)
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              View PDF
            </a>
            <a
              href={resumePdf}
              download="Rohit-Joshi-Resume.pdf"
              className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:border-blue-400"
            >
              Download PDF
            </a>
            <a
              href={resumeDocx}
              download="Rohit-Joshi-Resume.docx"
              className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:border-blue-400"
            >
              Download DOCX
            </a>
          </div>
        </article>

        <iframe
          title="Resume PDF"
          src={`${resumePdf}#view=FitH`}
          className="mt-5 h-[70vh] w-full rounded-md border border-zinc-200 bg-zinc-50"
        />

        <a
          href="/help"
          className="mt-6 inline-flex text-sm font-medium text-blue-700 hover:underline"
        >
          Back to interview sheet
        </a>
      </div>
    </div>
  );
}
