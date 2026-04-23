import { useApi } from "@/config/axios";
import { useState } from "react";

export default function ContractAnalysis({ contract, loading }) {

  const Api = useApi();
  const [emailData, setEmailData] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const clauses = contract?.contractData?.clauses ?? [];
  const [selectedClause, setSelectedClause] = useState(clauses[0] ?? null);

  const dangerCount = clauses.filter(c => c.riskLevel === "danger").length;
  const mediumCount = clauses.filter(c => c.riskLevel === "medium").length;
  const missingCount = contract?.contractData?.missingClauses?.length ?? 0;
  const overallRisk = contract?.contractData?.overallRisk
    ? contract.contractData.overallRisk.toUpperCase()
    : "N/A";

   if(contract?.contractData?.email) {
    setEmailData(contract.contractData.email);
   }

    const handleGenerateEmail = async () => {
    try {
         setEmailLoading(true);
         
         const {data} = await Api.post("/addApi/addProject");

         setEmailData(data.email); // { subject, body }
       } catch (err) {
         console.error("Email generation failed", err);
       } finally {
         setEmailLoading(false);
       }
    };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="bg-[#020617] text-white min-h-screen flex flex-col items-center justify-center gap-6">
        
        {/* spinning circle */}
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />

        {/* pulsing text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-lg font-semibold animate-pulse">
            Analyzing your contract...
          </p>
          <p className="text-gray-500 text-sm">
            This may take a few seconds
          </p>
        </div>

        {/* pulsing skeleton cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl px-6 mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-6 animate-pulse h-24"
            />
          ))}
        </div>

        {/* pulsing skeleton panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-3xl px-6">
          <div className="rounded-xl border border-white/10 bg-white/5 animate-pulse h-64" />
          <div className="rounded-xl border border-white/10 bg-white/5 animate-pulse h-64" />
        </div>

      </div>
    );
  }

  // ✅ NO DATA STATE
  if (!contract || !clauses.length) {
    return (
      <div className="bg-[#020617] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">Dashboard</h1>
          <p className="text-gray-400">No contract data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col lg:flex-row min-h-screen">
      <div className="pt-10 pb-5 lg:h-screen lg:sticky lg:top-0 flex flex-col pl-0 lg:pl-8 justify-center items-center overflow-hidden">
        <div>
          <h3 className="font-semibold text-gray-400 text-sm lg:text-[20px] w-[250px] my-4 text-center">
            {contract.contractData.contractTitle}
          </h3>
        </div>
        <img
          src={contract?.imageUrl ? contract.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4yM9O0KyzXOTB3D6MWrJ8IVOG-OQgQma-zw&s"}
          alt="Contract Preview"
          className="w-[170px] md:w-[200px] lg:w-[250px] h-[240px] md:h-[300px] lg:h-[350px] object-cover rounded-lg shadow-lg border border-white/10"
        />
        <div>
          <p className="text-[15px] my-4 text-gray-300 w-[250px] text-center leading-relaxed">
            {contract.contractData.overallSummary}
          </p>
        </div>
      </div>

      <div className="flex-1 lg:overflow-y-auto p-4 md:p-8">

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
          <SummaryCard
            title="OVERALL RISK"
            value={overallRisk}
            color={contract.contractData.overallRisk === "high" ? "text-red-500" : contract.contractData.overallRisk === "medium" ? "text-yellow-500" : "text-green-400"}
            bg={contract.contractData.overallRisk === "high" ? "bg-[#2b0d0f]" : contract.contractData.overallRisk === "medium" ? "bg-yellow-500/20" : "bg-green-500/10"}
          />
          <SummaryCard title="DANGEROUS CLAUSES" value={dangerCount} color="text-red-500" bg="bg-[#2b0d0f]" />
          <SummaryCard title="MEDIUM RISK" value={mediumCount} color="text-yellow-500" bg="bg-[#2c1e05]" />
          <SummaryCard title="MISSING CLAUSES" value={missingCount} color="text-yellow-500" bg="bg-[#2c1e05]" />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* LEFT PANEL */}
          <div className="bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Flagged Clauses</h2>
            {clauses.map((clause) => (
              <div
                key={clause.id}
                onClick={() => setSelectedClause(clause)}
                className="flex justify-between items-center py-3 md:py-4 border-b border-white/15 cursor-pointer hover:bg-[#0b1220] px-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${
                    clause.riskLevel === "danger" ? "bg-red-500" : clause.riskLevel === "medium" ? "bg-yellow-500" : "bg-green-500"
                  }`} />
                  <span className="text-sm md:text-base">{clause.title}</span>
                </div>
                <span className={`text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full ${
                  clause.riskLevel === "danger" ? "bg-red-500/20 text-red-400" : clause.riskLevel === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                }`}>
                  {clause.riskLevel}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Clause Detail</h2>
            {selectedClause && (
              <>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  <span className="font-semibold">Title:</span> {selectedClause.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-4">
                  {selectedClause.plainEnglish && <span className="font-semibold text-white">Plain English:</span>} {selectedClause.plainEnglish}
                </p>
                {selectedClause.consequence && (
                  <p className="text-red-400 text-sm md:text-base mb-6">
                    <span className="font-semibold text-xl">Consequence:</span> {selectedClause.consequence}
                  </p>
                )}
                {selectedClause.solution && (
                  <div className="bg-[#0b1220] border border-blue-500/30 rounded-xl p-4 md:p-5">
                    <p className="text-blue-400 text-sm font-semibold mb-2">Suggested Fix</p>
                    <p className="text-gray-300 text-sm md:text-base">{selectedClause.solution}</p>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

        {/* MISSING CLAUSES */}
        {contract.contractData.missingClauses?.length > 0 && (
          <div className="mt-10 bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold mb-4">Missing Clauses</h2>
            <div className="space-y-3">
              {contract.contractData.missingClauses.map((clause: string, index: number) => (
                <div key={index} className="flex items-start gap-3 bg-[#0b1220] border border-yellow-500/20 rounded-lg p-3 md:p-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mt-2" />
                  <p className="text-gray-300 text-sm md:text-base">{clause}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* EMAIL SECTION */}

{/* 🔴 Show button only if NOT safe and email not generated */}
{contract.contractData.overallRisk !== "safe" && !emailData && (
  <div className="mt-10 bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6 text-center">

    <p className={` ${contract.contractData.overallRisk === "danger" ? "text-red-400" : "text-yellow-400" } mb-4 text-sm md:text-base`}>
      ⚠️ This contract has {overallRisk} risk. Generate a negotiation email to protect yourself.
    </p>

    <button
      onClick={handleGenerateEmail}
      disabled={emailLoading}
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition"
    >
      {emailLoading ? "Generating..." : "Create Email"}
    </button>
  </div>
)}

{/* 🟢 Show email AFTER generated */}
{emailData && (
  <div className="mt-10 bg-[#020817] border border-white/10 rounded-xl p-4 md:p-6">

    <h2 className="text-base md:text-lg font-semibold mb-4">
      Generated Email
    </h2>

    <div className="space-y-4">
      <div>
        <p className="text-gray-400 text-sm">Subject</p>
        <p className="text-white font-medium">
          {emailData.subject}
        </p>
      </div>

      <div>
        <p className="text-gray-400 text-sm">Body</p>
        <div className="bg-[#0b1220] border border-white/10 rounded-lg p-3 md:p-4 text-gray-300 text-sm md:text-base whitespace-pre-line">
          {emailData.body}
        </div>
      </div>
    </div>

  </div>
)}
      </div>
    </div>
  );}

function SummaryCard({ title, value, color, bg }) {
  return (
    <div className={`rounded-xl border border-white/10 ${bg} p-4 md:p-6`}>
      <p className="text-gray-400 text-xs md:text-sm tracking-wider">{title}</p>
      <h2 className={`${color} text-2xl md:text-3xl font-bold mt-2`}>{value}</h2>
    </div>
  );
}