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
    
    const getProject = async () => {
    try {
      setLoading(true);
      const { data } = await Api.get(`/getApi/getProject/${projectId}`);
      if(!data.success === true) return 
      setproject(data.project);
      return data.project;
    } catch (error) {
      console.error(error?.response?.data?.message || error.message)
      console.log(error);
    } finally {
      setLoading(false); // ✅ ALWAYS runs
    }
  };
   
   useEffect(() => {
  // call immediately on mount
  getProject().then((data) => {
    if (data?.contractData) {
      setLoading(false);
    }
  });

  // poll every 10 seconds
  // const interval = setInterval(async () => {
  //   const data = await getProject();

  //   // stop only when contractData is available
  //   if (data?.contractData) {
  //     setLoading(false);
  //     clearInterval(interval);
  //   }
  // }, 10000);

  // // cleanup on unmount
  // return () => clearInterval(interval);
}, []);

  return <>
  <div className="h-screen space-y-20 pb-10">
    <ContractAnalysis contract={project} loading={loading} />
  </div>
  </>

}

export default ProjectPreview;