'use strict';

import Controller from '../../lib/Controller';
import Model from '../../lib/Model';
import { Post } from '../services/yuki/components';
import Renderer from '../../lib/Renderer';

const POST =  new RegExp('https:\/\/yuki\.la\/[a-z0-9]+\/[0-9]+(#p[0-9]*)?$');

if (POST.test(document.URL)) {
  const postNode = document.querySelector('.thread');
  
  if (postNode) {
    const post = new Post(postNode);
    new Controller(Renderer.render(post), new Model(post));
  }
}
