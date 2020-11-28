'use strict';

import UI from './lib/ui'

import { THREAD, BOARD, CATALOG } from './services/hispachan/regex'
import { Thread, Board } from './services/hispachan/models'


if ( THREAD.test( document.URL ) ) {

  const threadNode = document.querySelector('.thread');

  if ( threadNode ) {
    const thread = Thread.fromNode( threadNode );
    UI.renderOnThread( thread );
  }

} else if ( BOARD.test( document.URL ) ) {

  const boardNode = document.getElementById('delform');

  if ( boardNode ) {
    const board = Board.fromNode( boardNode );
    UI.renderOnBoard( board );
  }

} else if ( CATALOG.test( document.URL ) ) {

  // UwU

}
