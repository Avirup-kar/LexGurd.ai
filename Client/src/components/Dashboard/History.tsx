export default function ContractHistory() {
  const riskStyles = {
    high: {
      border: "border-red-500/40",
      bg: "bg-red-500/10",
      text: "text-red-400",
    },
    medium: {
      border: "border-yellow-500/40",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
    },
    safe: {
      border: "border-green-500/40",
      bg: "bg-green-500/10",
      text: "text-green-400",
    },
  };

  const history = [
    {
      id: 1,
      contractTitle: "Freelance Web Dev Agreement",
      overallRisk: "high",
      overallSummary:
        "This contract heavily favors the client and exposes the contractor to unlimited liability.",
    },
    {
      id: 2,
      contractTitle: "UI Design Contract",
      overallRisk: "medium",
      overallSummary:
        "Most clauses are fair, but payment timelines and revision limits may need clarification.",
    },
    {
      id: 3,
      contractTitle: "Consulting Agreement",
      overallRisk: "safe",
      overallSummary:
        "The agreement is balanced with clear payment terms and reasonable liability limits.",
    },
    {
      id: 4,
      contractTitle: "Startup NDA",
      overallRisk: "high",
      overallSummary:
        "The NDA has extremely strict confidentiality clauses that could restrict future work.",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-6">Contract History</h2>

      <div className="flex flex-col p-4 gap-4 max-h-[550px] overflow-y-auto">
        {history.map((contract) => {
          const style = riskStyles[contract.overallRisk];

          return (
            <div key={contract.id} className={`p-4 rounded-lg border ${style.border} ${style.bg} cursor-pointer hover:scale-[1.02] transition`}>
              {/* Top Row */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm">
                  {contract.contractTitle}
                </h3>

                <p className={`text-xs ${style.text}`}>
                  {contract.overallRisk.toUpperCase()}
                </p>
              </div>

              {/* Summary */}
              <div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {contract.overallSummary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
