// const contractData = {
//   contractTitle: "Freelance Web Development Agreement",
//   overallRisk: "high",
//   overallSummary:
//     "This contract heavily favors the client. Several clauses expose you to unlimited liability and loss of intellectual property.",
//   clauses: [
//     {
//       id: 1,
//       title: "Payment Terms",
//       originalText:
//         "Payment shall be made within 90 days of project completion at client's discretion.",
//       riskLevel: "danger",
//       plainEnglish:
//         "The client can delay paying you for 3 months and decide when they feel like it.",
//       consequence:
//         "You could complete months of work and wait 90 days with no guaranteed payment date.",
//       solution:
//         "Change to: Payment shall be made within 14 days of invoice. Late payments incur 2% monthly interest."
//     },
//     {
//       id: 2,
//       title: "Intellectual Property",
//       originalText:
//         "All work product created under this agreement becomes sole property of the client.",
//       riskLevel: "danger",
//       plainEnglish:
//         "Everything you build belongs to the client, including your tools and methods.",
//       consequence:
//         "You cannot reuse your own code, frameworks, or design patterns in future projects.",
//       solution:
//         "Add: Contractor retains ownership of pre-existing tools and frameworks. Only final deliverables transfer to client."
//     },
//     {
//       id: 3,
//       title: "Confidentiality",
//       originalText:
//         "Contractor agrees to keep all project information confidential for 2 years.",
//       riskLevel: "medium",
//       plainEnglish: "You cannot talk about this project for 2 years.",
//       consequence:
//         "You cannot add this project to your portfolio or mention it to future clients.",
//       solution:
//         "Negotiate to allow portfolio use with client approval."
//     },
//     {
//       id: 4,
//       title: "Governing Law",
//       originalText:
//         "This agreement shall be governed by the laws of New York.",
//       riskLevel: "safe",
//       plainEnglish: "Any disputes are handled under New York law.",
//       consequence: null,
//       solution: null
//     }
//   ],
//   missingClauses: [
//     "No termination clause — either party can end the contract without notice",
//     "No revision limit — client can request unlimited changes for free"
//   ]
// };

// export default contractData;

// data/dummyContract.ts

const dummyProject = {
  id: "clx123abc",
  imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  contractData: {
    contractTitle: "Freelance Web Development Agreement",
    overallRisk: "high",
    overallSummary:
      "This contract heavily favors the client. Several clauses expose you to unlimited liability and loss of intellectual property.",
    clauses: [
      {
        id: 1,
        title: "Payment Terms",
        originalText:
          "Payment shall be made within 90 days of project completion at client's discretion.",
        riskLevel: "danger",
        plainEnglish:
          "The client can delay paying you for 3 months and decide when they feel like it.",
        consequence:
          "You could complete months of work and wait 90 days with no guaranteed payment date.",
        solution:
          "Change to: Payment shall be made within 14 days of invoice. Late payments incur 2% monthly interest.",
      },
      {
        id: 2,
        title: "Intellectual Property",
        originalText:
          "All work product created under this agreement becomes sole property of the client.",
        riskLevel: "danger",
        plainEnglish:
          "Everything you build belongs to the client, including your tools and methods.",
        consequence:
          "You cannot reuse your own code, frameworks, or design patterns in future projects.",
        solution:
          "Add: Contractor retains ownership of pre-existing tools and frameworks. Only final deliverables transfer to client.",
      },
      {
        id: 3,
        title: "Confidentiality",
        originalText:
          "Contractor agrees to keep all project information confidential for 2 years.",
        riskLevel: "medium",
        plainEnglish: "You cannot talk about this project for 2 years.",
        consequence:
          "You cannot add this project to your portfolio or mention it to future clients.",
        solution: "Negotiate to allow portfolio use with client approval.",
      },
      {
        id: 4,
        title: "Governing Law",
        originalText:
          "This agreement shall be governed by the laws of New York.",
        riskLevel: "safe",
        plainEnglish: "Any disputes are handled under New York law.",
        consequence: null,
        solution: null,
      },
      {
        id: 5,
        title: "Termination",
        originalText:
          "Client may terminate this agreement at any time without prior notice or compensation.",
        riskLevel: "danger",
        plainEnglish:
          "The client can fire you instantly with no warning and no pay for work already done.",
        consequence:
          "You could lose weeks of unpaid work with zero compensation or notice period.",
        solution:
          "Add: Either party must provide 14 days written notice. Completed work must be paid in full upon termination.",
      },
      {
        id: 6,
        title: "Liability",
        originalText:
          "Contractor shall be liable for any and all damages arising from the project delivery.",
        riskLevel: "danger",
        plainEnglish:
          "You are responsible for any problem that happens — no matter how big or small.",
        consequence:
          "If anything goes wrong, the client can sue you for any amount with no limit.",
        solution:
          "Add: Contractor liability is limited to the total value of this contract.",
      },
      {
        id: 7,
        title: "Revisions",
        originalText:
          "Contractor agrees to make all revisions requested by the client until satisfaction.",
        riskLevel: "medium",
        plainEnglish:
          "You must keep making changes until the client is happy — with no limit on how many.",
        consequence:
          "Client can request unlimited free revisions forever, costing you time and money.",
        solution:
          "Add: This agreement includes up to 3 rounds of revisions. Additional revisions billed at hourly rate.",
      }
    ],
    missingClauses: [
      "No kill fee — if client cancels mid-project you get nothing",
      "No scope creep protection — client can expand the project indefinitely",
      "No ownership transfer timeline — unclear when IP actually transfers",
      "No late delivery penalty definition — no consequences for client delays",
    ],
  },
};

export default dummyProject;