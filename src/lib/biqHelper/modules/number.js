class BiqHelperNumber {

  roundFloat(number, precision) {
    return (parseFloat(number).toPrecision(precision));
  }

}

export { BiqHelperNumber };

const biqHelperNumber = new BiqHelperNumber();

export default biqHelperNumber;