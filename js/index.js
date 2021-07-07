class Calculator {

  constructor() {
    this.$numberEls = document.querySelectorAll(".number");
    this.$resetEl = document.getElementById("reset");
    this.$inputEl = document.getElementById("input");
    this.$divisionEl = document.getElementById("division");
    this.$multiplyEl = document.getElementById("multiply");
    this.$plusEl = document.getElementById("plus");
    this.$subtractEl = document.getElementById("subtract");
    this.$decimalPointEl = document.getElementById("decimal-point");
    this.$resultEl = document.getElementById("result");
    this.numberArray = [];
    this.arithmeticOperationArray = [];

    this.decimalPointTrigger = false;

    this.NUMVERS = {
      _0: this.$numberEls[9],
      _1: this.$numberEls[0],
      _2: this.$numberEls[1],
      _3: this.$numberEls[2],
      _4: this.$numberEls[3],
      _5: this.$numberEls[4],
      _6: this.$numberEls[5],
      _7: this.$numberEls[6],
      _8: this.$numberEls[7],
      _9: this.$numberEls[8]
    }

    this.init();
  }
  init() {
    this.eventHandler();
  }

  eventHandler() {
    this.$numberEls.forEach(el => el.addEventListener('click', this.numbersEvent));
    this.$resetEl.addEventListener('click', this.resetEvent);
    this.$resultEl.addEventListener('click', this.resultEvent);
    this.$plusEl.addEventListener('click', this.calculateEvent);
    this.$multiplyEl.addEventListener('click', this.calculateEvent);
    this.$divisionEl.addEventListener('click', this.calculateEvent);
    this.$subtractEl.addEventListener('click', this.calculateEvent);
    this.$decimalPointEl.addEventListener('click', this.decimalPointEvent);
    window.addEventListener('keydown', this.keyEvent);
  }

  keyEvent = (e) => {
    const { keyCode } = e;

    switch (keyCode) {
      case this.KEYS.plus:
        this.calculateEvent(this.$plusEl);
        break;
      case this.KEYS.multiply:
        this.calculateEvent(this.$multiplyEl);
        break;
      case this.KEYS.division:
        this.calculateEvent(this.$divisionEl);
        break;
      case this.KEYS.subtract:
        this.calculateEvent(this.$subtractEl);
        break;
      case this.KEYS.enter:
        this.resultEvent(this.$resultEl);
        break;
      case this.KEYS.decimalPoint:
        this.decimalPointEvent();
        break;
      case this.KEYS.backspace:
        this.backspaceEvent();
        break;
      case 96:
        this.numbersEvent(this.NUMVERS._0);
        break;
      case 97:
        this.numbersEvent(this.NUMVERS._1);
        break;
      case 98:
        this.numbersEvent(this.NUMVERS._2);
        break;
      case 99:
        this.numbersEvent(this.NUMVERS._3);
        break;
      case 100:
        this.numbersEvent(this.NUMVERS._4);
        break;
      case 101:
        this.numbersEvent(this.NUMVERS._5);
        break;
      case 102:
        this.numbersEvent(this.NUMVERS._6);
        break;
      case 103:
        this.numbersEvent(this.NUMVERS._7);
        break;
      case 104:
        this.numbersEvent(this.NUMVERS._8);
        break;
      case 105:
        this.numbersEvent(this.NUMVERS._9);
        break;

    }
  }

  decimalPointEvent = () => {
    const { value } = this.$inputEl;
    if (value.length !== 0) {
      let lastStr = [...value].pop();

      if (lastStr === "+" || lastStr === "-" || lastStr === "x" || lastStr === "÷")
        return;

      if (this.decimalPointTrigger === false || value.indexOf(".") === -1) {
        this.$inputEl.value += `.`;
        this.decimalPointTrigger = true;
      }
    }
  }

  backspaceEvent = () => {
    const { value } = this.$inputEl;
    if (value.length !== 0) {
      let lastStr = [...value].pop();

      if (lastStr === ".")
        this.decimalPointTrigger = false;

      this.$inputEl.value = value.slice(0, value.length - 1);
    }
  }

  numbersEvent = (e) => {

    let target = null;

    e instanceof MouseEvent
      ? target = e.target
      : target = e;

    const inputNumber = Number(target.dataset.type);
    const { value } = this.$inputEl;

    if (value === "" || value === "0") {
      if (inputNumber === 0) {
        this.$inputEl.value = inputNumber;
        return;
      }
    }

    if (value === "0") {
      this.$inputEl.value = "";
      this.$inputEl.value += inputNumber;
    } else {
      this.$inputEl.value += inputNumber;
    }

    this.activeEvent(target);
  }

  resetEvent = () => {
    this.$inputEl.value = "";
  }

  calculateEvent = (e) => {
    let target = null;

    e instanceof MouseEvent
      ? target = e.target
      : target = e;

    let value = target.dataset.type;

    if (this.$inputEl.value === "") {
      if (value === "x" || value === "÷") {
        return;
      }
    }

    let lastStr = [...this.$inputEl.value].pop();

    if (lastStr === "+" || lastStr === "-" || lastStr === "x" || lastStr === "÷") {
      return;
    }

    this.decimalPointTrigger = false;
    this.$inputEl.value += value;
  }

  resultEvent = () => {

    let inputValue = this.$inputEl.value.trim();

    while (1) {
      if (inputValue.indexOf("x") === -1) break;
      inputValue = inputValue.replace("x", "*");
    }

    while (1) {
      if (inputValue.indexOf("÷") === -1) break;
      inputValue = inputValue.replace("÷", "/");
    }


    try {
      if (inputValue === "") throw new Error();
      let result = eval(inputValue);

      if (result === Infinity)
        throw new Error();

      if (Number.isInteger(result)) {
        if (!Number.isSafeInteger(result)) {
          alert("유효한 범위를 넘어버렸습니다.");
          return;
        } else {
          this.$inputEl.value = result;
        }
      } else if (Number.isFinite(result)) {
        this.$inputEl.value = result.toFixed(10);
      }

    } catch (error) {
      this.$inputEl.value = "";
      alert("올바른 계산식이 아닙니다.");
    }

  }

  activeEvent(el) {
    el.style.background = `antiquewhite`;
    setTimeout(() => {
      el.removeAttribute('style');
    }, 100);
  }

}

Calculator.prototype.KEYS = {
  plus: 107,
  subtract: 109,
  multiply: 106,
  division: 111,
  enter: 13,
  decimalPoint: 110,
  backspace: 8
}

window.onload = () => {
  new Calculator();
}