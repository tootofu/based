'use strict';

import Controller from '../../lib/Controller';
import Model from '../../lib/Model';
import { Post } from '../services/4chan/components'
import Renderer from '../../lib/Renderer';

const POST =  new RegExp('https:\/\/boards\.(4chan|4channel)\.org\/[a-z0-9]*\/thread\/[0-9]*(\/[a-z-0-9]*)?(#p[0-9]*)?$');

if (POST.test(document.URL)) {
  const postNode = document.querySelector('.thread');
  
  if (postNode) {
    const post = new Post(postNode);
    new Controller(Renderer.render(post), new Model(post));
  }
}
