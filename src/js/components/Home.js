import { templates, select } from '../settings.js';
import utils from '../utils.js';
import Carousel from'../components/Carousel.js';

class Home {
  constructor(homeContainer){
    const thisHome = this;
    thisHome.render(homeContainer);
    thisHome.initWidget();
  }
  render(element){
    const thisHome = this;
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    const generatedHTML = templates.home();
    thisHome.element = utils.createDOMFromHTML(generatedHTML);
    thisHome.dom.wrapper.appendChild(thisHome.element);
    thisHome.dom.carousel = element.querySelector(select.home.carousel);
  }
  initWidget(){
    const thisHome = this;
    thisHome.carousel = new Carousel(thisHome.dom.carousel);
  }
}

export default Home;