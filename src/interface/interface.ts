export interface ITF_ObjectFullData{
  [key:number|string] : ITF_FullData
}

export interface ITF_FullData{
  key: string,
  bucket:string,
  date:number,
  status?: string,
  content:{
    type:'text'| 'image' | 'file' |'link' | 'video' | 'other',
    text: string,
    images: ITF_File[],
    file: ITF_File,
    link: string,
    video: string,
    other: string,
  }
}

export interface ITF_File{
  url:string,
  name:string,
  size:string|number,
  type:string,
  ref:string
}
export interface ITF_DataType{
  type: 'text'| 'singeImage' | "multiImage" | 'singeFile' | "multiFile" | 'link' | 'video' | 'other',
}

export interface ITF_drawingContentItem {
  idCode: string;
  logsKey?: string | number;
  name: string;
  type?: string;
  author?: string;
  authorId?: string | number;
  dateUpdate?: string;
  version?: string;
  status?: string;
  size?: number;
  commit?: string;
  path?:string;
  ref?:string;
  lock?:string;
  lockMessenger?:string;
  detail?: {
    imageRef: string,
    line1:{
      text: string;
      attachment: any;
    },
    line2:{
      text: string;
      attachment: any;
    },
    line3:{
      text: string;
      attachment: any;
    },
    line4:{
      text: string;
      attachment: any;
    }
    
  };
  urlFileStore?: {
    fileRef:string,
    fileURL: string,
  };
  available?: string;
  groupStyle?: string;
  areaField?: string;
  groupField?: string;
  localField?: string;
  accessRights?: string[],
  
}

export interface ITF_UploadContainer {
  ref: string;
  data: any;
}