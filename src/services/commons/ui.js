'use strict';


export default class UI {

  static createDownloadButton( fileName, fileURL, text ) {
    // create an 'a' element
    // this element will represent a button
    const button = document.createElement('a');
    // button setup
    button.download = fileName;
    button.href = fileURL;
    button.textContent = text || 'Download file';
    button.classList.add('based-button'); // class defined at 'main.css' file

    return button;
  }

  static renderOnGeneric( obj ) {
    const button = UI.createDownloadButton( obj.id, obj.fileURL );
    const render_place = obj.node.querySelector('.reflink');
    render_place.appendChild( button );
  }

  static renderOnThread( thread ) {
    UI.renderOnGeneric( thread );

    thread.replies.forEach( ( reply ) => {
      UI.renderOnGeneric( reply );
    })
  }

  static renderOnBoard( board ) {
    if ( board ) {
      
      board.threads.forEach( ( thread ) => {
        UI.renderOnThread( thread );     
      })
    
    }
  }
}
