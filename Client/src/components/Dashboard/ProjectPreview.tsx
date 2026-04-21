import contractData from "@/data/contractData";
import ContractAnalysis from "./ContractAnalysis";
import { useParams } from "react-router-dom";
import dummyProject from "@/data/contractData";
import { useEffect, useState } from "react";
import { useApi } from "@/config/axios";

function ProjectPreview() {
  const Api = useApi();
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);
    const [project, setproject] = useState([]);
    
    const getHistory = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get(`/getApi/getProject/${projectId}`);
      if(!data.success === true) return 
      setproject(data.project);
      setLoading(false);
    } catch (error) {
      console.error(error?.response?.data?.message || error.message)
      console.log(error);
    } finally {
      setLoading(false); // ✅ ALWAYS runs
    }
  };
   
   useEffect(() => {
      getHistory();
    }, []);

  return <>
  <div className="h-screen space-y-20 pb-10">
    <ContractAnalysis contract={project} />
  </div>
  </>

}

export default ProjectPreview;