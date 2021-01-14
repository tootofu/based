'use strict';

import Controller from '../../lib/Controller';
import Model from '../../lib/Model';
import { Post } from '../services/4chan/components'
import { POST } from '../services/4chan/regex';
import Renderer from '../../lib/Renderer';

if (POST.test(document.URL)) {
  const postNode = document.querySelector('.thread');
  
  if (postNode) {
    const post = new Post(postNode);
    new Controller(Renderer.render(post), new Model(post));
  }
}
