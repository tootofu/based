'use strict';


class Reply {
  constructor( id, fileURL, node ) {
    this.id = id;
    this.fileURL = fileURL;
    this.node = node;
  }

  static fromNode( node ) {
    // getting reply id
    const replyId = node.id.match(/\d+$/g)[0];
    // getting file URL
    const referenceElement = node.querySelector('.filesize');
    
    if ( referenceElement ) {
      const referenceParent = referenceElement.parentElement;
      const fileElement = referenceParent.querySelector('a');
      
      if ( fileElement && fileElement.target ) {
         const replyFileURL = fileElement.href;
         return new Reply( replyId, replyFileURL, node );
      }
    }

    return null;
  }
}


export class Thread {
  constructor( URL, board, id, fileURL, replies, node ) {
    this.URL = URL;
    this.board = board;
    this.id = id;
    this.fileURL = fileURL;
    this.replies = replies;
    this.node = node;
  }

  static fromNode( node ) {
    const nodeId = node.id;
    
    // getting thread id
    const threadId = nodeId.match(/\d+/g)[0];
    // getting board name
    const boardName = nodeId.match(/\D[a-z]*$/g)[0];
    // getting thread URL
    const threadURL = `https://www.hispachan.org/${boardName}/res/${threadId}.html`;
    // getting thread OP file URL
    const opFileElement = node.querySelector('.filesize').firstElementChild;
    const opFileURL = opFileElement.href;

    // getting thread replies
    const threadReplies = [];

    [ ...node.querySelectorAll('.reply') ].forEach( ( replyNode ) => {
      const reply = Reply.fromNode( replyNode )
      if ( reply ) {
        threadReplies.push( reply );
      }
    })

    return new Thread( threadURL, boardName, threadId, opFileURL, threadReplies, node );
  }
}


export class Board {
  constructor( threads, node ) {
    this.threads = threads;
    this.node = node;
  }

  static fromNode( node ) {
    const threads = [];
    
    [ ...node.querySelectorAll('.thread') ].forEach( ( thread ) => {
      if ( thread ) {
        threads.push( Thread.fromNode( thread ) );
      }
    })

    return new Board( threads, node );
  }
}


class Catalog {
  // AwA
}
