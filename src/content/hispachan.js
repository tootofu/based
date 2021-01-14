'use strict';

import Controller from '../../lib/Controller';
import Model from '../../lib/Model';
import { Post } from '../services/hispachan/components'
import { POST } from '../services/hispachan/regex';
import Renderer from '../../lib/Renderer';

if (POST.test(document.URL)) {
  const postNode = document.querySelector('.thread');
  
  if (postNode) {
    const post = new Post(postNode);
    new Controller(Renderer.render(post), new Model(post));
  }
}
