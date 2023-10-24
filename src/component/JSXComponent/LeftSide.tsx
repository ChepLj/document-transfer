import { FaRegTrashCan } from "react-icons/fa6";

import { useEffect } from "react";
import { ITF_ObjectFullData } from "../../interface/interface";
import "./LeftSide.css";
import { FileContainer } from "./LeftSideComponent/FileContainer";
import { ImageContainer } from "./LeftSideComponent/ImageContainer";
import { LinkContainer } from "./LeftSideComponent/LinkContainer";
import { TextContainer } from "./LeftSideComponent/TextContainer";
import { Typing } from "./LeftSideComponent/Typing";

//JSX: Left Side
export function LeftSide({ data }: { data: ITF_ObjectFullData }) {
  const arrayKey = Object.keys(data);
  
  //TODO: Scroll to bottom
  useEffect(() => {
    var elem = document.querySelector(".LeftSide .List");
    elem!.scrollTop = elem!.scrollHeight;
  }, [arrayKey.length]);

  //TODO_END: Scroll to bottom

  return (
    <section className="LeftSide">
      <div className="Contents">
        <ul className="List" id="LeftSideList">
          {arrayKey.map((crr, index) => {
            const objectTemp = data[crr].content;
            return (
              <li className="Item" key={crr}>
                {objectTemp.type === "text" && <TextContainer text={objectTemp.text} />}
                {objectTemp.type === "image" && <ImageContainer images={objectTemp.images} />}
                {objectTemp.type === "file" && <FileContainer file={objectTemp.file} />}
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
      <Typing />
    </section>
  );
}
//JSX_END: Left Side









