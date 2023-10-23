import { useEffect, useState } from "react";
import "./App.css";
import { LeftSide } from "./component/JSXComponent/LeftSide";
import { RightSide } from "./component/JSXComponent/RightSide";
import { ITF_FullData } from "./interface/interface";
import getDataFromDB from "./api/getDataFromDB";
import AccessPage from "./component/JSXComponent/AccessPage";

function App() {
  const [refresh, setRefresh] = useState<number>(0);
  const [data, setData] = useState<any>();
  const [bucket,setBucket] = useState<string>()
  useEffect(() => {
    if(bucket){
      const callback = (disPatch: any) => {
        if (disPatch.type === "SUCCESSFUL") {
          console.log("🚀 ~ file: App.tsx:15 ~ callback ~ disPatch:", disPatch);
          setData(disPatch.payload);
        } else {
          alert("cant get data from sever");
        }
      };
      getDataFromDB(bucket, callback);
    }
    
  }, [refresh]);
  return (
    <div className="App">
      {bucket ? (
        <>
          <LeftSide bucket={bucket} data={data} setRefresh={setRefresh} />
          <RightSide data={data} />
        </>
      ) : (
        <AccessPage setBucket={setBucket} setData={setData}/>
      )}
    </div>
  );
}

export default App;
