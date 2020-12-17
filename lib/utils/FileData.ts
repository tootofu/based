export default interface FileData {
  url: string;
  id: string;
  extension: string;
  fileName: string;
  type?: string;
  blob?: Blob;
}