'use strict';

import Renderer from '../lib/Renderer';

import { THREAD, BOARD } from '../services/hispachan/regex';
import { Thread, Board } from '../services/hispachan/components';


if (THREAD.test(document.URL)) {

  const threadNode = document.querySelector('.thread');
  if (threadNode) {
    const thread = Thread.fromNode(threadNode);
    Renderer.renderOnThread( thread );
  }

} else if (BOARD.test(document.URL)) {

  const boardNode = document.getElementById('delform');
  if (boardNode) {
    const board = Board.fromNode (boardNode);
  }
}
