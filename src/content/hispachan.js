'use strict';

import Renderer from '../../lib/Renderer';

import { THREAD } from '../services/hispachan/regex';
import { Thread } from '../services/hispachan/components';

if (THREAD.test(document.URL)) {

  const threadNode = document.querySelector('.thread');
  if (threadNode) {
    const thread = new Thread(threadNode);
    Renderer.renderOnThread(thread);
  }

}
