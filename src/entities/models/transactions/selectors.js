import { values } from 'lodash';

/**
 * @param  {object} transactions
 * @param  {string} link         
 */
export const getTransactionByLink = ({ transactions }, link) =>
  values(transactions).filter(transaction => transaction.link === link)[0];
