import contractData from "@/data/contractData";
import ContractAnalysis from "./ContractAnalysis";

function ProjectPreview() {

  return <>
  <div className="overflow-y-auto h-screen space-y-20 pt-5 pb-20">
    <ContractAnalysis contract={contractData} />
  </div>
  </>

}

export default ProjectPreview;