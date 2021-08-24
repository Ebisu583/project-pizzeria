// import Flickity from 'flickity';

class Carousel {
  constructor(element) {
    const thisCarousel = this;
    thisCarousel.render(element);
    thisCarousel.initPlugin();
  }

  render(element) {
    // save element ref to this obj
    const thisCarousel = this;
    thisCarousel.dom = {};
    thisCarousel.dom.wrapper = element;
  }

  initPlugin() {
    // use plugin to create carousel on thisCarousel.element
    const thisCarousel = this;
    // eslint-disable-next-line no-undef
    new Flickity( thisCarousel.dom.wrapper, {
      // options
      cellAlign: 'left',
      contain: true
    });
  }
}
export default Carousel;