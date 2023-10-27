import { useContext, useEffect, useState } from "react";
import { MAIN_CONTEXT } from "../../App";
import deleteDataFromStorage from "../../api/deleteDataFromStorage";
import downloadFileFromStorage from "../../api/downloadFileFromStorage";
import postDataToDB from "../../api/postDataToDB";
import { ITF_File, ITF_FullData, ITF_ObjectFullData } from "../../interface/interface";
import { deleteItemObject } from "../FCComponent/deleteItemObject";
import "./RightSide.css";

//JSX: Right Side
export function RightSide({ data }: { data: ITF_ObjectFullData }) {
  const [header, setHeader] = useState("File");
  useEffect(() => {
    const headerItemElm = document.querySelectorAll(".Header .HeaderItem");
    headerItemElm.forEach((crr, index) => {
      const elm = crr as HTMLElement;
      if (elm.innerHTML === header) {
        elm.style.color = "green";
        elm.style.fontSize = "larger";
      } else {
        elm.style.color = "black";
        elm.style.fontSize = "medium";
      }
    });
  }, [header]);

  return (
    <section className="RightSide">
      <div className="Header">
        <span className="HeaderItem " onClick={() => setHeader("Image")}>
          Image
        </span>
        <span className="HeaderItem" onClick={() => setHeader("File")}>
          File
        </span>
        <span className="HeaderItem" onClick={() => setHeader("Link")}>
          Link
        </span>
      </div>
      <div className="Contents">
        {header === "Image" && <ImageCatalogs data={data} />}
        {header === "File" && <FileCatalogs data={data} />}
        {header === "Link" && <LinkCatalogs data={data} />}
      </div>
    </section>
  );
}
//JSX_END: Right Side

//JSX: Image Catalogs
function ImageCatalogs({ data }: { data: ITF_ObjectFullData }) {
  const { setRefresh } = useContext<any>(MAIN_CONTEXT);
  //TODO: handle Data
  const imageObjArray = [];
  for (const key in data) {
    if (data[key].content.type === "image") {
      imageObjArray.push(data[key]);
    }
  }
  //TODO_END: handle Data
  //TODO: handel delete single image
  const handleDeleteSingleImage = (itemObj: ITF_FullData, image: ITF_File) => {
    // callback
    const callbackDeleteSingleInMulti = (messenger: string) => {
      if (messenger === "delete successfully") {
        const newImageArray = itemObj.content.images.filter((crr) => crr !== image);
        const uploadContainer = [
          {
            ref: `${itemObj.ref}/content/images/`,
            data: newImageArray,
          },
        ];
        //callback post newImageArray
        const callbackPostNewImageArray = (messenger: string) => {
          if (messenger === "post successfully!") {
            setRefresh(Math.random());
          } else alert("error");
        };
        //--------------------
        postDataToDB(uploadContainer, callbackPostNewImageArray);
      }
    };
    //---------------------
    if (itemObj.content.images[1]) {
      const newImageArray = itemObj.content.images.filter((crr) => crr !== image);

      deleteDataFromStorage(image.url, callbackDeleteSingleInMulti);
    } else {
      deleteItemObject(itemObj, setRefresh);
    }
  };
  //TODO: handel delete single image
  return (
    <section className="ImageCatalogs">
      {imageObjArray.reverse().map((crrRaw, index) => {
        return crrRaw.content.images.map((crr, index, arrMother) => <ImageCatalogsChild content={crr} key={crr.url} itemObj={crrRaw} handleDeleteSingleImage={handleDeleteSingleImage} />);
      })}
    </section>
  );
}
//JSX_END: Image Catalogs

//JSX: Image Catalogs Child
function ImageCatalogsChild({ content, itemObj, handleDeleteSingleImage }: { content: ITF_File; itemObj: ITF_FullData; handleDeleteSingleImage: Function }) {
  return (
    <div className="Item">
      <img className="Image" src={content.url} />
      <div className="ImageOverlay">
        <div className="ButtonDownload" onClick={() => downloadFileFromStorage(content)}>
          Download
        </div>
        {/* <div className="ButtonView">View</div> */}
        <div className="ButtonDelete" onClick={() => handleDeleteSingleImage(itemObj, content)}>
          Delete
        </div>
      </div>
    </div>
  );
}
//JSX_END: Image Catalogs Child

//JSX: File Catalogs
function FileCatalogs({ data }: { data: ITF_ObjectFullData }) {
  const { setRefresh } = useContext<any>(MAIN_CONTEXT);
  //TODO: handle Data
  const fileObjArray = [];
  for (const key in data) {
    if (data[key].content.type === "file") {
      fileObjArray.push(data[key]);
    }
  }
  //TODO_END: handle Data
  return (
    <section className="FileCatalogs">
      {fileObjArray.reverse().map((crr) => {
        const fileTemp = crr.content.file;
        return (
          <div className="Item" key={fileTemp.url}>
            <span className="ItemHead">
              <span className="Type">{fileTemp.type}</span>
              <span className="Size">{Math.round(+fileTemp.size / 1000000)}Mb</span>
            </span>
            <span className="ItemName">{fileTemp.name}</span>
            <span className="ItemRear">
              <div className="Button">
                <span className="ItemDownload" onClick={() => downloadFileFromStorage(fileTemp)}>
                  Download
                </span>
                <span className="ItemDelete" onClick={() => deleteItemObject(crr, setRefresh)}>
                  Delete
                </span>
              </div>
              <div className="TimeStamp">{crr.date}</div>
            </span>
          </div>
        );
      })}
    </section>
  );
}
//JSX_END: Image Catalogs

//JSX: Link Catalogs
function LinkCatalogs({ data }: { data: ITF_ObjectFullData }) {
  //TODO: handle Data
  const urlify = (text: string) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex);
  };
  const linkObjArray = [];
  for (const key in data) {
    const contentTemp = data[key].content;
    if (contentTemp.type === "text") {
      const linkTempArray = urlify(contentTemp.text);
      if (linkTempArray) {
        for (const item of linkTempArray) {
          linkObjArray.push(item);
        }
      }
    }
  }
  //TODO_END: handle Data
  return (
    <section className="LinkCatalogs">
      {linkObjArray.reverse().map((crr, index) => {
        return (
          <li className="Item" key={crr + index}>
            <a href={crr} target="_blank">
              {crr}
            </a>
          </li>
        );
      })}
    </section>
  );
}
//JSX_END: Image Catalogs
