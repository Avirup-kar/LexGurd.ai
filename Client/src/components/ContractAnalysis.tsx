import { useState } from "react";

export default function ContractAnalysis({ contract }) {

  const clauses = contract?.clauses ?? [];
  const [selectedClause, setSelectedClause] = useState(clauses[0] ?? null);

  const dangerCount = clauses.filter(c => c.riskLevel === "danger").length;
  const mediumCount = clauses.filter(c => c.riskLevel === "medium").length;
  const missingCount = contract?.missingClauses?.length ?? 0;
  const overallRisk = contract?.overallRisk ? contract.overallRisk.toUpperCase() : "N/A";

  if (!contract || !clauses.length) {
    return (
      <div className="bg-[#020617] text-white min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">Dashboard</h1>
          <p className="text-gray-400">
            No contract data available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white p-4 md:p-8">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">

        <SummaryCard
          title="OVERALL RISK"
          value={overallRisk}
          color= {contract.overallRisk === "high" ? "text-red-500" : contract.overallRisk === "medium"? "text-yellow-500" : "text-green-400"}
          bg={contract.overallRisk === "high" ? "bg-[#2b0d0f]" : contract.overallRisk === "medium"? "bg-yellow-500/20" : "bg-green-500/10"}
        />

        <SummaryCard
          title="DANGEROUS CLAUSES"
          value={dangerCount}
          color="text-red-500"
          bg="bg-[#2b0d0f]"
        />

        <SummaryCard
          title="MEDIUM RISK"
          value={mediumCount}
          color="text-yellow-500"
          bg="bg-[#2c1e05]"
        />

        <SummaryCard
          title="MISSING CLAUSES"
          value={missingCount}
          color="text-yellow-500"
          bg="bg-[#2c1e05]"
        />

      </div>


      {/* MAIN GRID */}
      <div className="
        grid 
        grid-cols-1 
        lg:grid-cols-2 
        gap-6 md:gap-8
      ">

        {/* LEFT PANEL */}
        <div className="bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6">

          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">
            Flagged Clauses
          </h2>

          {clauses.map((clause) => (

            <div
              key={clause.id}
              onClick={() => setSelectedClause(clause)}
              className="flex justify-between items-center py-3 md:py-4 border-b border-white/15 cursor-pointer hover:bg-[#0b1220] px-2 rounded-lg"
            >

              <div className="flex items-center gap-3">

                <div
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${
                    clause.riskLevel === "danger"
                      ? "bg-red-500"
                      : clause.riskLevel === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />

                <span className="text-sm md:text-base">
                  {clause.title}
                </span>

              </div>

              <span
                className={`text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full ${
                  clause.riskLevel === "danger"
                    ? "bg-red-500/20 text-red-400"
                    : clause.riskLevel === "medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {clause.riskLevel}
              </span>

            </div>

          ))}

        </div>


        {/* RIGHT PANEL */}
        <div className="bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6">

          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
            Clause Detail
          </h2>

          {selectedClause && (

            <>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {selectedClause.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-base mb-4">
                {selectedClause.plainEnglish}
              </p>

              {selectedClause.consequence && (
                <p className="text-red-400 text-sm md:text-base mb-6">
                  {selectedClause.consequence}
                </p>
              )}

              {selectedClause.solution && (

                <div className="bg-[#0b1220] border border-blue-500/30 rounded-xl p-4 md:p-5">

                  <p className="text-blue-400 text-sm font-semibold mb-2">
                    Suggested Fix
                  </p>

                  <p className="text-gray-300 text-sm md:text-base">
                    {selectedClause.solution}
                  </p>

                </div>

              )}

            </>

          )}

        </div>

      </div>

      
      {/* MISSING CLAUSES */}
   {contract.missingClauses?.length > 0 && (

    <div className="mt-10 bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6">

       <h2 className="text-base md:text-lg font-semibold mb-4">
         Missing Clauses
       </h2>

      <div className="space-y-3">
      {contract.missingClauses.map((clause: string, index: number) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-[#0b1220] border border-yellow-500/20 rounded-lg p-3 md:p-4"
        >

          {/* Warning Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mt-2"></div>

          {/* Text */}
          <p className="text-gray-300 text-sm md:text-base">
            {clause}
          </p>
 
        </div>

       ))}
  
      </div>

    </div>

   )}
    </div>
  );
}


function SummaryCard({ title, value, color, bg }) {

  return (
    <div className={`rounded-xl border border-white/10 ${bg} p-4 md:p-6`}>

      <p className="text-gray-400 text-xs md:text-sm tracking-wider">
        {title}
      </p>

      <h2 className={`${color} text-2xl md:text-3xl font-bold mt-2`}>
        {value}
      </h2>

    </div>
  );
}