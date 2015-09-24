import { Router } from 'director';
import { ShowController } from './controllers';

let routes = {
  '/pages.*': () => ShowController.render()
};
let router = new Router(routes);
let currentRoute = () => {
  let path = location.hash.substring(1);
  return path.startsWith('/pages') ? path : '/pages';
};
router.init(currentRoute());
