import { templates, select} from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';

class Booking {
  constructor(element){
    const thisBooking = this;
    thisBooking.render(element);
    thisBooking.initWidgets();
  }
  render(element){
    const thisBooking = this;
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;

    const generatedHTML = templates.bookingWidget();
    thisBooking.element = utils.createDOMFromHTML(generatedHTML);
    thisBooking.dom.wrapper.appendChild(thisBooking.element);

    console.log(select.booking.peopleAmount);
    thisBooking.dom.peopleAmount = element.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = element.querySelector(select.booking.hoursAmount);
  }
  initWidgets(){
    const thisBooking = this;
    console.log('peopleAmount', thisBooking.dom.peopleAmount);
    thisBooking.peopleAmount = new AmountWidget(
      thisBooking.dom.peopleAmount
    );
    thisBooking.hoursAmount = new AmountWidget(
      thisBooking.dom.hoursAmount
    );
    thisBooking.dom.peopleAmount.addEventListener('updated', function () {
      console.log(thisBooking, thisBooking.peopleAmount.value);
    });
    thisBooking.dom.hoursAmount.addEventListener('updated', function () {
      console.log(thisBooking, thisBooking.hoursAmount.value);
    });
  }
}
export default Booking;