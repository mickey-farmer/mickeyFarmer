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
//   landscape  true for the 792x612 Coursera-style certs (most of them).
//              false for a portrait page — sets the embedded viewer's ratio.
//   instructor optional
//   verifyUrl  optional public verification link
//
// Every title, date, issuer and verification code below was read out of the
// PDF itself rather than inferred from a filename. The one exception is the
// TWHQ certificate — see the note on that entry.
// ============================================================================

window.CERT_GROUPS = [
  {
    id: "technical-writing",
    label: "Technical Writing",
    blurb: "The craft itself — structure, style, and writing for a reader who's mid-task.",
    certs: [
      {
        title: "Technical Communication Essentials",
        issuer: "Minnesota State University, Mankato via Coursera",
        date: "August 14, 2026",
        sort: "2026-08-14",
        file: "minnesota-state-technical-communication-essentials.pdf",
        landscape: true,
        instructor: "Abigail Bakke, Ph.D., Associate Professor of Technical Communication",
        verifyUrl: "https://coursera.org/verify/JE618SYWPDG6",
      },
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
      {
        // No date is printed on this certificate and there's no public
        // verification link. The date below is the PDF's creation timestamp,
        // which is the best available evidence — worth confirming against your
        // own records before treating it as exact.
        title: "Certified Technical Writer",
        issuer: "Technical Writer HQ",
        date: "June 2021",
        sort: "2021-06-18",
        file: "twhq-certified-technical-writer.pdf",
        landscape: true,
        instructor: "Josh Fechter, Instructor · Obaid Khan, School Director",
      },
      {
        title: "Technical Writing",
        issuer: "Moscow Institute of Physics and Technology via Coursera",
        date: "October 26, 2020",
        sort: "2020-10-26",
        file: "mipt-technical-writing.pdf",
        landscape: true,
        instructor: "Elena Bazanova, PhD — Director, Language Training and Testing Center",
        verifyUrl: "https://coursera.org/verify/5FW2F5BRCFXS",
      },
    ],
  },
  {
    id: "api-documentation",
    label: "API Documentation",
    blurb: "Producing the reference material itself, and the tooling around it.",
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
      {
        title: "Generate API Documentation from Postman",
        issuer: "Coursera Project Network",
        date: "June 16, 2022",
        sort: "2022-06-16",
        file: "coursera-generate-api-documentation-postman.pdf",
        landscape: true,
        instructor: "Monika Singh, Software Engineer",
        verifyUrl: "https://coursera.org/verify/GJK9UGX46LAF",
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
    blurb: "Enough of the stack to read it, test it, and document it honestly.",
    certs: [
      {
        title: "API Testing a real web application via Postman",
        issuer: "Coursera Project Network",
        date: "June 16, 2022",
        sort: "2022-06-16",
        file: "coursera-api-testing-postman.pdf",
        landscape: true,
        instructor: "Saurabh Dhingra, DevOps Trainer and Consultant",
        verifyUrl: "https://coursera.org/verify/9KSTPH683UJP",
      },
      {
        title: "Learn Ruby on Rails",
        issuer: "Codecademy",
        date: "January 13, 2021",
        sort: "2021-01-13",
        // Print-to-PDF of the web certificate, so the page is portrait with a
        // landscape certificate on it.
        file: "codecademy-learn-ruby-on-rails.pdf",
        landscape: false,
      },
      {
        title: "Learn Ruby",
        issuer: "Codecademy",
        date: "January 7, 2021",
        sort: "2021-01-07",
        file: "codecademy-learn-ruby.pdf",
        landscape: false,
      },
    ],
  },
  {
    id: "project-management",
    label: "Project Management",
    blurb: "Running the work, not just documenting it. Both from Google's PM track.",
    certs: [
      {
        title: "Project Initiation: Starting a Successful Project",
        issuer: "Google via Coursera",
        date: "February 8, 2024",
        sort: "2024-02-08",
        file: "google-project-initiation.pdf",
        landscape: true,
        instructor: "Amanda Brophy, Global Director of Google Career Certificates",
        verifyUrl: "https://coursera.org/verify/8LCTWYYJKUQQ",
      },
      {
        title: "Foundations of Project Management",
        issuer: "Google via Coursera",
        date: "June 12, 2022",
        sort: "2022-06-12",
        file: "google-foundations-project-management.pdf",
        landscape: true,
        instructor: "Amanda Brophy, Global Director of Google Career Certificates",
        verifyUrl: "https://coursera.org/verify/XX6FY2WDGQN9",
      },
    ],
  },
  {
    id: "game-design",
    label: "Game Design",
    blurb: "Systems, and the storytelling players actually move through.",
    certs: [
      {
        title: "Story and Narrative Development for Video Games",
        issuer: "California Institute of the Arts via Coursera",
        date: "May 13, 2026",
        sort: "2026-05-13",
        file: "calarts-story-narrative-development-video-games.pdf",
        landscape: true,
        instructor: "Dariush Derakhshani, Faculty — Character Animation",
        verifyUrl: "https://coursera.org/verify/KUSNH4I7D2V3",
      },
      {
        title: "Introduction to Game Design",
        issuer: "California Institute of the Arts via Coursera",
        date: "February 13, 2024",
        sort: "2024-02-13",
        file: "calarts-introduction-game-design.pdf",
        landscape: true,
        instructor: "Fran Krause, Faculty — Character Animation",
        verifyUrl: "https://coursera.org/verify/BUJ53J2GFZ96",
      },
    ],
  },
];
