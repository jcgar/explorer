export interface IButton {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
export interface IChildren {
  children: React.ReactNode;
}
export interface IChildrenOpt {
  children?: React.ReactNode;
}
export interface IFile {
  name: string;
  ext: string;
}
export interface IFolder {
  name: string;
  node: INode | null;
}
export interface INode {
  folders?: IFolder[];
  files?: IFile[];
}
export interface IFileData {
  name?: string;
  mime?: string;
  data?: any;
}
export interface IAllStringProps {
  [key: string]: string;
}