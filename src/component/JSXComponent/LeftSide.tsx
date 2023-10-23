import { FaImages, FaLink } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import { IoDocumentAttachOutline } from "react-icons/io5";
import { ITF_ObjectFullData } from "../../interface/interface";
import { dataPrepareToSent } from "../FCComponent/dataPrepareToSent";
import "./LeftSide.css";
import { useEffect } from "react";
//JSX: Left Side
export function LeftSide({bucket, data,setRefresh}: { bucket:string, data: ITF_ObjectFullData; setRefresh: Function }) {
  const arrayKey = Object.keys(data);
  const images = [
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/pure-nature-landscape-single-tree-in-green-field-free-photo.jpg?w=600&quality=80",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
  ];
  //TODO: Scroll to bottom
  useEffect(()=>{
    var elem = document.querySelector('.LeftSide .List');
    elem!.scrollTop = elem!.scrollHeight;
  },[arrayKey.length])
  
  //TODO_END: Scroll to bottom

  return (
    <section className="LeftSide">
      <div className="Contents">
        <ul className="List">
          {arrayKey.map((crr, index) => {
            const objectTemp = data[crr].content;
            return (
              <li className="Item" key={crr}>
                {objectTemp.type === "text" && <TextContainer text={objectTemp.text} />}
                {objectTemp.type === "image" && <ImageContainer images={objectTemp.images} />}
                {objectTemp.type === "file" && <FileContainer file={objectTemp.files} />}
                {objectTemp.type === "link" && <LinkContainer link={objectTemp.link} />}
                {objectTemp.type === "other" && <span>other</span>}
                <div className="FooterItem">
                  <div className="TimeStamp">{data[crr].date}</div>
                  <FaRegTrashCan className="DeleteButton" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Typing setRefresh={setRefresh} bucket={bucket} />
    </section>
  );
}
//JSX_END: Left Side

//JSX: Typing
function Typing({ setRefresh, bucket }: { setRefresh: Function ,bucket:string}) {
  //Todo: Get Data to Sent
  const getDataToSent = () => {
    const typingInputElm = document.getElementById("TypingInput") as HTMLTextAreaElement;

    const value = typingInputElm?.value;
    const callback = (messenger: string) => {
      if (messenger === "post successfully!") {
        typingInputElm.value = "";
        setRefresh(Math.random());
      } else {
        alert("error");
      }
    };
    dataPrepareToSent("text",bucket, value, callback);
  };
  //Todo_END: Get Data to Sent
  return (
    <div className="Typing">
      <textarea
        id="TypingInput"
        className="Input"
        placeholder="enter text"
        spellCheck={false}
        autoFocus
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault(); // Ensure it is only this code that runs
            getDataToSent();
          }
        }}
      ></textarea>
      <div className="Button">
        <div className="Attachments">
          <span className="Image">
            <FaImages />
          </span>
          <span className="File">
            <IoDocumentAttachOutline />
          </span>
        </div>
        <button className="SentButton" onClick={getDataToSent}>
          Sent
        </button>
      </div>
    </div>
  );
}
//JSX_END: Typing

//JSX: Text Container
function TextContainer({ text }: { text: string }) {
  return <div className="TextContainer">{text}</div>;
}
//JSX_END: Text Container

//JSX: Image Container
function ImageContainer({ images }: { images: string[] }) {
  return (
    <>
      {images.length > 1 ? (
        <div className="ImageContainerMulti">
          {images.map((crr, index) => (
            <img key={index + crr} src={crr} />
          ))}
        </div>
      ) : (
        <div className="ImageContainerOnly">
          <img src={images[0]} />
        </div>
      )}
    </>
  );
}
//JSX_END: Image Container

//JSX: File Container
function FileContainer({ file }: { file: string[] }) {
  return (
    <div className="FileContainer">
      <span className="File">
        <IoDocumentAttachOutline />
      </span>
      <span className="ItemName">Name fdgdfgfdgdf fdfdgfdfdg dfgfdgfdgfdg dfgfdgfdg dfgdfgd dfgdfgdf dfgfdgd dfdfgd dfgdfgd dfgfdg dfgd </span>
      <span className="ItemRear">
        <div className="Button">
          <span className="ItemDownload">Download</span>
          <span className="ItemHead">
            <span className="Type">rar </span>
            <span className="Size">200Mb</span>
          </span>
        </div>
      </span>
    </div>
  );
}
//JSX_END: File Container

//JSX: Link Container
function LinkContainer({ link }: { link: string }) {
  return (
    <div className="LinkContainer">
      <span className="File" style={{ paddingRight: "10px", color: "blue" }}>
        <FaLink />
      </span>

      <a href="">dfdsfdfsfsfsdf</a>
    </div>
  );
}
//JSX_END: Link Container
