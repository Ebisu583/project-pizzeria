import { select, settings } from '../settings.js';
class AmountWidget {
  constructor(element) {
    const thisWidget = this;
    thisWidget.getElements(element);
    thisWidget.setValue(thisWidget.input.value);
    thisWidget.initActions();

    console.log('AmountWidget:', thisWidget);
    console.log('constructor arguments:', element);
  }
  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(
      select.widgets.amount.input
    );
    thisWidget.linkDecrease = thisWidget.element.querySelector(
      select.widgets.amount.linkDecrease
    );
    thisWidget.linkIncrease = thisWidget.element.querySelector(
      select.widgets.amount.linkIncrease
    );
  }
  setValue(value) {
    const thisWidget = this;
    const newValue = parseInt(value);
    /* TODO: Add validation */
    if (
      newValue !== thisWidget.value &&
      settings.amountWidget.defaultMin <= newValue &&
      settings.amountWidget.defaultMax >= newValue &&
      !isNaN(newValue)
    ) {
      thisWidget.value = newValue;
    }
    thisWidget.input.value = thisWidget.value;
    console.log('AmountWidget after setValue:', thisWidget);
    thisWidget.announce();
  }
  initActions() {
    const thisWidget = this;
    thisWidget.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.input.value);
    });
    thisWidget.linkDecrease.addEventListener('click', function () {
      thisWidget.setValue(thisWidget.value - 1);
    });
    thisWidget.linkIncrease.addEventListener('click', function () {
      thisWidget.setValue(thisWidget.value + 1);
    });
  }
  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true,
    });
    thisWidget.element.dispatchEvent(event);
  }
}
export default AmountWidget;
