import { useContext, useEffect, useState } from "react";
import { MAIN_CONTEXT } from "../../../App";
import calculatorFolderSizeStorage from "../../../api/calculatorFolderSizeStorage";

export function Header() {
  const { bucket ,refresh} = useContext<any>(MAIN_CONTEXT);
  const [imageCalculator, setImageCalculator] = useState<{ sizeResult: number; fileCount: number }>({ sizeResult: 0, fileCount: 0 });
  const [fileCalculator, setFileCalculator] = useState<{ sizeResult: number; fileCount: number }>({ sizeResult: 0, fileCount: 0 });
  const total = imageCalculator.sizeResult + fileCalculator.sizeResult;
  const availableCap = 5000 - total;

  useEffect(() => {
    console.log("header");
    calculatorFolderSizeStorage(`${bucket}/IMAGE`).then((res: any) => setImageCalculator(res));
    calculatorFolderSizeStorage(`${bucket}/FILE`).then((res: any) => setFileCalculator(res));
  }, [refresh]);
  return (
    <section className="Header">
      
      
      <div className="Item">
        <div className="Title">Available Cap</div>
        {total ? <div className="Bottom">{availableCap}Mb</div> : <div className="Calculator">calculating</div>}
      </div>
      <div className="Item">
        <div className="Title">Total Size</div>
        {total ? <div className="Bottom">{total}Mb</div> : <div className="Calculator">calculating</div>}
      </div>
      <div className="Item">
        <div className="Title">{imageCalculator.fileCount} Images</div>
        {imageCalculator.fileCount ? <div className="Bottom">{imageCalculator.sizeResult}Mb</div> : <div className="Calculator">calculating</div>}
      </div>
      <div className="Item">
        <div className="Title">{fileCalculator.fileCount} Files</div>
        {fileCalculator.fileCount ? <div className="Bottom">{fileCalculator.sizeResult}Mb</div> : <div className="Calculator">calculating</div>}
      </div>
      <div className="Item">
        <div className="Title">ID Bucket</div>
        <div className="Bottom">{bucket}</div>
      </div>
    </section>
  );
}
