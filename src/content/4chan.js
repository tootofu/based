'use strict';

import Renderer from '../lib/Renderer';

import { THREAD } from '../services/4chan/regex';
import { Thread } from '../services/4chan/components';

if (THREAD.test(document.URL)) {

  const threadNode = document.querySelector('.thread');
  if (threadNode) {
    const thread = Thread.fromNode(threadNode);
    Renderer.renderOnThread(thread);
  }

}
