export function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.readAsDataURL(blob);
  })
}

export function base64ToBlob(data: string, type: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const byteString = atob(data.split(',')[1]);
    const buffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    
    resolve(new Blob([buffer], { type: type }));
  })  
}
