'use strict';

import Controller from '../../lib/Controller';
import Model from '../../lib/Model';
import { Post } from '../services/hispachan/components';
import Renderer from '../../lib/Renderer';

const POST =  new RegExp('https:\/\/www\.(hispachan|hispasexy)\.org\/[a-z]*\/res\/[0-9]*\.html(#i[0-9]*)?$');

if (POST.test(document.URL)) {
  const postNode = document.querySelector('.thread');
  
  if (postNode) {
    const post = new Post(postNode);
    new Controller(Renderer.render(post), new Model(post));
  }
}
