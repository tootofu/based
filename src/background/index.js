import JSZip from 'jszip';

import { blobToBase64, base64ToBlob } from '../utils/helpers'

const zipFileArray = async ( fileArray ) => {
  const zip = new JSZip();

  for ( const file of fileArray ) {
    const blob = await base64ToBlob( file.base64, file.format );
    zip.file( `${file.name}.${file.extension}`, blob, { binary: true } );
  }

  const zipped = await zip.generateAsync( { type: "blob" } );
  return zipped;
}

const messageHandler = ( message, sender, sendResponse ) => {
  if ( message.type === 'zip' ) {
    zipFileArray(message.content)
      .then(blobToBase64)
      .then(base64 => sendResponse(base64));
  }

  return true;
}

chrome.runtime.onMessage.addListener( messageHandler );