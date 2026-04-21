import contractData from "@/data/contractData";
import ContractAnalysis from "./ContractAnalysis";

function ProjectPreview() {
  
  return <>
  <div className="h-screen space-y-20 pb-10">
    <ContractAnalysis contract={contractData} />
  </div>
  </>

}

export default ProjectPreview;