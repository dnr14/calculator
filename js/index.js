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
    if (value.indexOf(".") === -1)
      this.$inputEl.value = `${value}.`;
  }

  backspaceEvent = () => {
    if (this.$inputEl.value.length !== 1) {
      let str = [...this.$inputEl.value];
      str.pop();
      this.$inputEl.value = str.reduce((l, r) => l += r);
    }
  }

  numbersEvent = (e) => {

    let target = null;

    e instanceof MouseEvent
      ? target = e.target
      : target = e;

    const value = target.dataset.set;

    if (this.$inputEl.value === "" || this.$inputEl.value === "0") {
      if (Number(value) === 0) {
        this.$inputEl.value = value;
        return;
      }
    }

    if (this.$inputEl.value === "0") {
      this.$inputEl.value = "";
      this.$inputEl.value += value;
    } else {
      let validation = Number(this.$inputEl.value + value);

      // 갓다와서 부동소수점 해결
      //정수
      if (Number.isInteger(validation)) {
        if (this.maxValidation(Number(this.$inputEl.value + value))) {
          this.$inputEl.value += value;
        } else {
          alert(`유효한 계산 범위를 초과하였습니다.`);
        }
        //소수
      } else {
        this.$inputEl.value += value;
      }
    }

    this.activeEvent(target);
  }

  resetEvent = () => {
    this.$inputEl.value = "0";
    this.numberArray = [];
    this.arithmeticOperationArray = [];
  }

  calculateEvent = (e) => {
    let target = null;

    e instanceof MouseEvent
      ? target = e.target
      : target = e;

    // if (!this.maxValidation(Number(this.$inputEl.value) + 1)) {
    //   alert(`유효한 계산 범위를 초과하였습니다.`);
    //   return;
    // }
    // if (!this.maxValidation(Number(this.$inputEl.value) * 2)) {
    //   alert(`유효한 계산 범위를 초과하였습니다.`);
    //   return;
    // }

    let value = target.dataset.set;
    this.numberArray.push(Number(this.$inputEl.value));
    this.arithmeticOperationArray.push(value);
    this.$inputEl.value = "0";
  }

  resultEvent = () => {

    if (this.numberArray.length !== 0) {

      let result = Number(this.numberArray[0]);
      let value = Number(this.$inputEl.value);
      if (value !== 0) {
        this.numberArray.push(value);
      }

      this.numberArray.forEach((number, idx) => {
        if (idx === 0) return;
        const arithmeticOperation = this.arithmeticOperationArray[idx - 1];
        number = Number(number);

        switch (arithmeticOperation) {
          case "+":
            result = result + number;
            break;
          case "*":
            result = result * number;
            break;
          case "/":
            if (number === 0)
              number = 1;
            result = result / number;
            break;
          case "-":
            result = result - number;
            break;
        }
      });

      this.$inputEl.value = result;
      this.numberArray = [];
      this.arithmeticOperationArray = [];
    } else {
      alert("결과가 없습니다.");
    }
  }

  activeEvent(el) {
    el.style.background = `antiquewhite`;
    setTimeout(() => {
      el.removeAttribute('style');
    }, 100);
  }

  maxValidation(value) {
    if (Number.isSafeInteger(value)) {
      return true;
    } else {
      return false;
    }
  }

  minValidation(value) {
    if (Number.MIN_SAFE_INTEGER) {
      return true;
    } else {
      return false;
    }
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