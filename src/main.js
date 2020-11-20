'use strict';

import UI from './services/commons/ui'
// Hispachan/Hispasexy imports
import { 
  HISPA_THREAD,
  HISPA_BOARD,
  HISPA_CATALOG
} from './services/hispachan/regex'

import { Thread, Board } from './services/hispachan/models'


if ( HISPA_THREAD.test( document.URL ) ) {

  const threadNode = document.querySelector('.thread');
  const thread = Thread.fromNode( threadNode );

  UI.renderOnThread( thread );

} else if ( HISPA_BOARD.test( document.URL ) ) {

  const boardNode = document.getElementById('delform');
  const board = Board.fromNode( boardNode );

  UI.renderOnBoard( board );

} else if ( HISPA_CATALOG.test( document.URL ) ) {

  // UwU

}
