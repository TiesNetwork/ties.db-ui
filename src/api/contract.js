import jsonInterface from './contractInterface.json';

class Contract {
  /**
   * @param {string} account
   * @param {string} address
   * @param {string} web3
   */
  constructor({ account, address, web3 }) {
    this.contract = new web3.eth.Contract(jsonInterface, address, {
      from: account
    });
    this.web3 = web3;
  }

  /**
   * @param {string} method
   * @param {*} args
   */
  callMethod(method, ...args) {
    return this.contract.methods[method](...args).call();
  }

  /**
   * @param {string} method
   * @param {*} args
   */
  sendMethod(method, ...args) {
    return this.contract.methods[method](...args).send();
  }
}

export default Contract;
export const schema = {};
