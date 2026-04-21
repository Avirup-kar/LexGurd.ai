import contractData from "@/data/contractData";
import ContractAnalysis from "./ContractAnalysis";
import { useParams } from "react-router-dom";

function ProjectPreview() {
    const { projectId } = useParams();
    
    

  return <>
  <div className="h-screen space-y-20 pb-10">
    <ContractAnalysis contract={contractData} />
  </div>
  </>

}

export default ProjectPreview;