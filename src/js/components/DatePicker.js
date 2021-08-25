import BaseWidget from '../components/BaseWidget.js';
import utils from '../utils.js';
import {select, settings} from '../settings.js';

class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisDatePicker = this;

    thisDatePicker.dom.input = thisDatePicker.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisDatePicker.initPlugin();
  }
  initPlugin(){
    const thisDatePicker = this;

    thisDatePicker.minDate = new Date();
    thisDatePicker.maxDate = utils.addDays(thisDatePicker.minDate, settings.datePicker.maxDaysInFuture);
    // eslint-disable-next-line no-undef
    flatpickr(thisDatePicker.dom.input, {
      defaultDate: thisDatePicker.minDate,
      minDate: thisDatePicker.minDate,
      maxDate: thisDatePicker.maxDate,
      locale: {
        firstDayOfWeek: 1
      },
      disable: [
        function(date) {
          return (date.getDay() === 1);
        }
      ],
      onChange: function(selectedDates, dateStr) {
        thisDatePicker.value = dateStr;
      },
    });
  }
  parseValue(value){
    return value;
  }

  isValid(){
    return true;
  }

  renderValue(){

  }
}

export default DatePicker;
