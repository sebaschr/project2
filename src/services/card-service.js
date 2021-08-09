var valid = require('card-validator');

export const validateCard = (pCardNumber) => {
  var numberValidation = valid.number(pCardNumber);

  return numberValidation.isValid;
};

export const getCardType = (pCardNumber) => {
  var numberValidation = valid.number(pCardNumber);

  if (numberValidation.card === null) {
    return null;
  } else {
    return numberValidation.card.type;
  }
};
