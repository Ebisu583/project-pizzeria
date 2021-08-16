import { templates, select} from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

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
    thisBooking.dom.datePicker = element.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = element.querySelector(select.widgets.hourPicker.wrapper);
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
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    thisBooking.dom.peopleAmount.addEventListener('updated', function () {
      console.log(thisBooking, thisBooking.peopleAmount.value);
    });
    thisBooking.dom.hoursAmount.addEventListener('updated', function () {
      console.log(thisBooking, thisBooking.hoursAmount.value);
    });
    thisBooking.dom.datePicker.addEventListener('updated', function () {
      console.log(thisBooking, thisBooking.datePicker.value);
    });
    thisBooking.dom.hourPicker.addEventListener('updated', function () {
      console.log(thisBooking, thisBooking.hourPicker.value);
    });
  }
}
export default Booking;