import { FaRegTrashCan } from "react-icons/fa6";

import { useContext, useEffect } from "react";
import { MAIN_CONTEXT } from "../../App";
import { ITF_ObjectFullData } from "../../interface/interface";
import { deleteItemObject } from "../FCComponent/deleteItemObject";
import { getFileDataToSent } from "../FCComponent/getFileDataToSent";
import { getImageDataToSent } from "../FCComponent/getImageDataToSent";
import "./LeftSide.css";
import { FileContainer } from "./LeftSideComponent/FileContainer";
import { ImageContainer } from "./LeftSideComponent/ImageContainer";
import { TextContainer } from "./LeftSideComponent/TextContainer";
import { Typing } from "./LeftSideComponent/Typing";
import { Header } from "./LeftSideComponent/Header";
import Col from 'react-bootstrap/Col'

//JSX: Left Side
export function LeftSide({ data }: { data: ITF_ObjectFullData }) {
  const arrayKey = Object.keys(data);
  const { setRefresh, bucket } = useContext<any>(MAIN_CONTEXT);
  //TODO: Scroll to bottom
  useEffect(() => {
    var elem = document.querySelector(".LeftSide .List");
    elem!.scrollTop = elem!.scrollHeight;
  }, [arrayKey.length]);

  //TODO_END: Scroll to bottom

  //TODO: Check executable file  Because policy of firebase
  const checkExecutableFile = (file: File) => {
    const temp: string[] = file.name.split(".");
    const tagTemp = temp[temp.length - 1];
    const executableFileArray = ["exe", "dll", "bat", "apk", "api"];
    if (executableFileArray.includes(tagTemp)) {
      alert("Do chính sách của server không cho phép upload các tập tin thực thi [ exe , dll , apk , ipa , bat ]\n\nHãy bọc tập tin thành file Zip hoặc nén thành file Rar trước khi upload !!! ");
    } else {
      // check image
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      if (imageExtensions.includes(tagTemp)) {
        getImageDataToSent([file], bucket, setRefresh);
      } else {
        getFileDataToSent({ file, bucket, setRefresh });
      }
    }
  };

  //TODO_END: Check executable file  Because policy of firebase
  //TODO: handle Drop File
  const handleDropFile = (ev: any) => {
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          checkExecutableFile(file);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        checkExecutableFile(file);
      });
    }
  };
  //TODO_END: handle Drop File
  //TODO: handle Drag File
  const handleDragFile = (ev: any) => {
    ev.preventDefault();
    // ev.dataTransfer.dropEffect = "none";
  };
  //TODO_END: handle Drag File
  return (
    <Col className="LeftSide " xs={12} md={5}>
      <Header/>
      <div className="Contents" onDrop={handleDropFile} onDragOver={handleDragFile}>
        <ul className="List" id="LeftSideList">
          {arrayKey.map((crr, index) => {
            const objectTemp = data[crr].content;
            const id = "LeftListItem" + index;
            return (
              <li className="Item" key={crr} id={id}>
                {objectTemp.type === "text" && <TextContainer text={objectTemp.text} />}
                {objectTemp.type === "image" && <ImageContainer images={objectTemp.images} />}
                {objectTemp.type === "file" && <FileContainer file={objectTemp.file} />}
                {objectTemp.type === "other" && <span>other</span>}
                <div className="FooterItem">
                  <div className="TimeStamp">{data[crr].date}</div>
                  <FaRegTrashCan
                    className="DeleteButton"
                    onClick={(e) => {
                      deleteItemObject(data[crr], setRefresh, id);
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Typing />
    </Col>
  );
}
//JSX_END: Left Side
