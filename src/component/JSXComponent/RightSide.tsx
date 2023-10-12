import { useState, useEffect } from "react";
import './RightSide.css'

//JSX: Right Side
export function RightSide() {
    const [header, setHeader] = useState("Image");
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
          {header === "Image" && <ImageCatalogs />}
          {header === "File" && <FileCatalogs />}
          {header === "Link" && <LinkCatalogs />}
        </div>
      </section>
    );
  }
  //JSX_END: Right Side
  
  //JSX: Image Catalogs
  function ImageCatalogs() {
    const imageArray = [];
    for (let i = 1; i <= 100; i++) {
      imageArray.push(i);
    }
    return (
      <section className="ImageCatalogs">
        {imageArray.map(() => {
          return (
            <div className="Item">
              <img
                className="Image"
                src="https://i0.wp.com/picjumbo.com/wp-content/uploads/pure-nature-landscape-single-tree-in-green-field-free-photo.jpg?w=600&quality=80"
              />
              <div className="ImageOverlay">
                <div className="ButtonDownload">Download</div>
                <div className="ButtonView">View</div>
                <div className="ButtonDelete">Delete</div>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
  //JSX_END: Image Catalogs
  
  //JSX: File Catalogs
  function FileCatalogs() {
    const FileArray = [];
    for (let i = 1; i <= 100; i++) {
      FileArray.push(i);
    }
    return (
      <section className="FileCatalogs">
        {FileArray.map(() => {
          return (
            <div className="Item">
              <span className="ItemHead">
                <span className="Type">rar</span>
                <span className="Size">200Mb</span>
              </span>
              <span className="ItemName">Name </span>
              <span className="ItemRear">
                <div className="Button">
                  <span className="ItemDownload">Download</span>
                  <span className="ItemDelete">Delete</span>
                </div>
                <div className="TimeStamp">2023/10/12 14h23</div>
              </span>
            </div>
          );
        })}
      </section>
    );
  }
  //JSX_END: Image Catalogs
  
  //JSX: Link Catalogs
  function LinkCatalogs() {
    const LinkArray = [];
    for (let i = 1; i <= 100; i++) {
      LinkArray.push(i);
    }
    return (
      <section className="LinkCatalogs">
        {LinkArray.map(() => {
          return (
            <li className="Item">
              <a href="http://">
                http:..//gdfgfdg dsfgfdgfdgfdgdfgdfgdfgbdfgdf
                gfgdfgdfgdfgdfgfdgdfgfdgfdgdfgdfgdfgdfgd dfgdfgfdgfdgfd
              </a>
            </li>
          );
        })}
      </section>
    );
  }
  //JSX_END: Image Catalogs