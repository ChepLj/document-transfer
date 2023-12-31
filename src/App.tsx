import { createContext, useEffect, useState } from "react";
import "./App.css";
import getDataFromDB from "./api/getDataFromDB";
import AccessPage from "./component/JSXComponent/AccessPage";
import { LeftSide } from "./component/JSXComponent/LeftSide";
import { RightSide } from "./component/JSXComponent/RightSide";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MAIN_CONTEXT = createContext({});
function App() {
  const [refresh, setRefresh] = useState<number>(0);
  const [data, setData] = useState<any>();
  const [bucket, setBucket] = useState<string>();
  
  useEffect(() => {
    if (bucket) {
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
    <MAIN_CONTEXT.Provider value={{ refresh, setRefresh, bucket }}>
      <div className="App m-md-3 m-2">
        {bucket ? (
          < >
            <LeftSide  data={data} />
            <RightSide data={data} />
          </>
        ) : (
          <AccessPage setBucket={setBucket} setData={setData} />
        )}
      </div>
    </MAIN_CONTEXT.Provider>
  );
}

export { App, MAIN_CONTEXT };

