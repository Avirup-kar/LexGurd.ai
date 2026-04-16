const contractData = {
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
        "Change to: Payment shall be made within 14 days of invoice. Late payments incur 2% monthly interest."
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
        "Add: Contractor retains ownership of pre-existing tools and frameworks. Only final deliverables transfer to client."
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
      solution:
        "Negotiate to allow portfolio use with client approval."
    },
    {
      id: 4,
      title: "Governing Law",
      originalText:
        "This agreement shall be governed by the laws of New York.",
      riskLevel: "safe",
      plainEnglish: "Any disputes are handled under New York law.",
      consequence: null,
      solution: null
    }
  ],
  missingClauses: [
    "No termination clause — either party can end the contract without notice",
    "No revision limit — client can request unlimited changes for free"
  ]
};

export default contractData;