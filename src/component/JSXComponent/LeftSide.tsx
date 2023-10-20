import { FaImages } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import { IoDocumentAttachOutline } from "react-icons/io5";
import "./LeftSide.css";
//JSX: Left Side
export function LeftSide() {
  const images = [
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/pure-nature-landscape-single-tree-in-green-field-free-photo.jpg?w=600&quality=80",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
    "https://cdn.wikimg.net/en/strategywiki/images/6/68/Portal_box.jpg",
  ];
  return (
    <section className="LeftSide">
      <div className="Contents">
        <ul className="List">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7,
            8,
          ].map((crr, index) => {
            return <LinkContainer key={index} link={''} />;
          })}
        </ul>
      </div>
      <Typing />
    </section>
  );
}
//JSX_END: Left Side
//JSX: Typing
function Typing() {
  return (
    <div className="Typing">
      <textarea
        className="Input"
        placeholder="enter text"
        spellCheck={false}
        autoFocus
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
        <button className="SentButton">Sent</button>
      </div>
    </div>
  );
}
//JSX_END: Typing

//JSX: Text Container
function TextContainer() {
  return (
    <li className="Item">
      <div className="TextContainer">
        Hello
        <br />
        hjhg
      </div>
      <div className="FooterItem">
        <div className="TimeStamp">2023/10/09 14h30</div>
        <FaRegTrashCan className="DeleteButton" />
      </div>
    </li>
  );
}
//JSX_END: Text Container

//JSX: Image Container
function ImageContainer({ images }: { images: string[] }) {
  return (
    <li className="Item">
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

      <div className="FooterItem">
        <div className="TimeStamp">2023/10/09 14h30 ...</div>
        <FaRegTrashCan className="DeleteButton" />
      </div>
    </li>
  );
}
//JSX_END: Image Container

//JSX: File Container
function FileContainer({ file }: { file: string[] }) {
  return (
    <li className="Item">
      <div className="FileContainer">
        <span className="File">
          <IoDocumentAttachOutline />
        </span>
        <span className="ItemName">Name fdgdfgfdgdf fdfdgfdfdg dfgfdgfdgfdg dfgfdgfdg dfgdfgd dfgdfgdf dfgfdgd dfdfgd dfgdfgd dfgfdg dfgd  </span>
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
      <div className="FooterItem">
        <div className="TimeStamp">2023/10/09 14h30 ...</div>
        <FaRegTrashCan className="DeleteButton" />
      </div>
    </li>
  );
}
//JSX_END: File Container

//JSX: Link Container
function LinkContainer({ link }: { link: string }) {
  return (
    <li className="Item">
      <div className="LinkContainer">
      <span className="File" style={{paddingRight:'10px', color:'blue'}}>
          <FaLink />
        </span>
      
        <a href="">dfdsfdfsfsfsdf</a>
      </div>
      <div className="FooterItem">
        <div className="TimeStamp">2023/10/09 14h30</div>
        <FaRegTrashCan className="DeleteButton" />
      </div>
    </li>
  );
}
//JSX_END: Link Container