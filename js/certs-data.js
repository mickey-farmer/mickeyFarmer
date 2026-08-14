// ============================================================================
// Manifest of certifications shown on certifications.html.
//
// TO ADD A CERTIFICATE:
//   1. Copy the PDF into assets/certificates/ using a lowercase-hyphenated
//      filename (issuer-course.pdf reads well).
//   2. Add an entry to the right group below.
//   3. Push. The page and its category nav build themselves from this file.
//
// Group fields:  id (used as the URL hash), label, blurb
// Cert fields:
//   title      exact course title as printed on the certificate
//   issuer     e.g. "Vanderbilt University via Coursera"
//   date       human-readable, as printed ("August 13, 2026")
//   sort       YYYY-MM-DD, used to order newest-first within a group
//   file       filename inside assets/certificates/
//   landscape  true for 792x612 Coursera-style certs (most are), false for
//              portrait PDFs — sets the embedded viewer's aspect ratio
//   instructor optional
//   verifyUrl  optional public verification link
// ============================================================================

window.CERT_GROUPS = [
  {
    id: "technical-writing",
    label: "Technical Writing",
    blurb: "The craft itself — structure, style, and writing for developer audiences.",
    certs: [
      {
        title: "Introduction to Technical Writing",
        issuer: "Board Infinity via Coursera",
        date: "April 25, 2024",
        sort: "2024-04-25",
        file: "board-infinity-intro-technical-writing.pdf",
        landscape: true,
        instructor: "Abhay Gupta, Co-Founder, Board Infinity",
        verifyUrl: "https://coursera.org/verify/AXML83CA7Q4Z",
      },
      // Awaiting the PDF — see the two entries in PENDING at the bottom of this
      // file (MIPT tech writing, twhqcertificate).
    ],
  },
  {
    id: "api-documentation",
    label: "API Documentation",
    blurb: "Documenting, testing, and shipping APIs.",
    certs: [
      {
        title: "Document AI: Project & API Writing",
        issuer: "ansrsource via Coursera",
        date: "August 13, 2026",
        sort: "2026-08-13",
        file: "coursera-document-ai-project-api-writing.pdf",
        landscape: true,
        instructor: "ansrsource instructors",
        verifyUrl: "https://coursera.org/verify/SQ7TYBU2VTEN",
      },
    ],
  },
  {
    id: "prompt-engineering",
    label: "Prompt Engineering",
    blurb: "Prompt design, pattern-based prompting, and evaluating model output.",
    certs: [
      {
        title: "Prompt Engineering for ChatGPT",
        issuer: "Vanderbilt University via Coursera",
        date: "August 13, 2026",
        sort: "2026-08-13",
        file: "vanderbilt-prompt-engineering-coursera.pdf",
        landscape: true,
        instructor: "Dr. Jules White, Dept. of Computer Science",
        verifyUrl: "https://coursera.org/verify/QXN89R6IH4BI",
      },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    blurb: "Enough of the stack to document it honestly.",
    certs: [
      // Awaiting PDFs — Ruby, Rails, API Testing, Postman API Documentation.
    ],
  },
  {
    id: "project-management",
    label: "Project Management",
    blurb: "Running the work, not just writing about it.",
    certs: [
      // Awaiting PDFs — Foundations of Project Management, Starting a
      // Successful Project.
    ],
  },
  {
    id: "game-design",
    label: "Game Design",
    blurb: "Systems and player-facing storytelling.",
    certs: [
      // Awaiting PDFs — Intro to Game Design, plus one more Coursera cert.
    ],
  },
];

// ============================================================================
// PENDING — 10 certificates that couldn't be read yet.
//
// These PDFs live in Google Drive but were cloud-only placeholders at the time
// this file was written, so their exact titles, dates, issuers and verification
// links are UNCONFIRMED. Filenames below are the Drive originals.
//
// To finish them:
//   1. In Finder, right-click the Certificates folder ->
//      Offline access -> Available offline.
//   2. Copy each PDF into assets/certificates/ with a clean filename.
//   3. Move the entry up into the matching group above, filling in the real
//      title/date/issuer from the certificate itself.
//
//   Engineering/
//     RubyCertificate.pdf
//     RailsCertificate.pdf
//     API testing.pdf
//     API documentation from Postman.pdf
//   Tech Writing/
//     MIPT tech writing.pdf
//     twhqcertificate.pdf
//   Project Management/
//     Foundations of PM.pdf
//     Starting a successful project.pdf
//   Game Design/
//     Intro to game design.pdf
//     Coursera KUSNH4I7D2V3.pdf
// ============================================================================
