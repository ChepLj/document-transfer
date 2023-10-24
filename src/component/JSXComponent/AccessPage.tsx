import { useState } from "react";
import getDataFromDB from "../../api/getDataFromDB";
import "./AccessPage.css";
import { Container } from "react-dom";

function AccessPage({ setBucket, setData }: { setBucket: Function; setData: Function }) {
  const [display, setDisplay] = useState<{ container: string; bucket?: string }>({ container: "input", bucket: "" });
  const handleAccess = () => {
    const inputElm = document.getElementById("AccessPageInput") as HTMLInputElement;
    const bucketTemp = inputElm.value.toString();
    const callback = (result: any) => {
      if (result.type === "SUCCESSFUL") {
        console.log(result);
        setData(result.payload);
        setBucket(bucketTemp);
      } else {
        setDisplay({
          container: "createNew",
          bucket: bucketTemp,
        });
      }
    };
    /// get data from server
    if (bucketTemp) {
      getDataFromDB(bucketTemp, callback);
    }
  };
  return (
    <section className="AccessPage">
      {display.container === "input" && <Input handleAccess={handleAccess} />}
      {display.container === "createNew" && <CreateNew display={display} setDisplay={setDisplay} setBucket={setBucket} setData={setData} />}
    </section>
  );
}

export default AccessPage;

//JSX: Input
function Input({ handleAccess }: { handleAccess: Function }) {
  return (
    <div className="ContainerTyping">
      <div className="TextHeader">Nhập ID Bucket hoặc tạo mới</div>
      <input
        id="AccessPageInput"
        className="Input"
        placeholder="nhập id bucket"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault(); // Ensure it is only this code that runs
            handleAccess();
          }
        }}
      ></input>
      <div className="Button" onClick={() => handleAccess()}>
        Truy Cập
      </div>
    </div>
  );
}

//JSX_END: Input

//JSX: CreateNew
function CreateNew({ display, setDisplay, setBucket, setData }: { display: any; setDisplay: Function; setBucket: Function; setData: Function }) {
  const handleCreateNew = () => {
    const dataObjectInit = {
      1: {
        key: 1,
        bucket: display.bucket,
        date: "...,",
        status: "normal",
        content: {
          type: "text",
          text: "...",
          image: "",
          images: "",
          file: "",
          files: "",
          link: "",
          video: "",
          other: "",
        },
      },
    };
    setBucket(display.bucket);
    setData(dataObjectInit);
  };
  return (
    <div className="ContainerCreateNew">
      <div className="TextHeader1">Không tìm thấy Bucket nào có Id là</div>
      <div className="TextBucket">{display.bucket}</div>
      <div className="TextHeader2">Tạo mới 1 Bucket với Id như trên ?</div>

      <span className="ButtonCreateNew" onClick={handleCreateNew}>
        Tạo mới
      </span>
      <span className="ButtonBack" onClick={() => setDisplay({container:'input'})}>
        Trở lại
      </span>
    </div>
  );
}

//JSX_END: Input
