export const worldTourCreateValidations = values => {
  const errors = {};

  if (!values.country) {
    errors.country = "Requerido!";
  }

  if (!values.packageTitle) {
    errors.packageTitle = "Requerido!";
  }
  if (!values.packagePrice) {
    errors.packagePrice = "Requerido!";
  } else if (values.packagePrice > 999999) {
    errors.packagePrice =
      "El precio no debe superar 999,999! ";
  }
  if (!values.packageDescription) {
    errors.packageDescription = "Requerido!";
  }
  if (!values.packageImage) {
    errors.packageImage = "Requerido!";
  }

  return errors;
};
export const umrahDealsCreateValidations = values => {
  const errors = {};

  if (!values.packageTitle) {
    errors.packageTitle = "Requerido!";
  }
  if (!values.numberOfPeople) {
    errors.numberOfPeople = "Requerido!";
  }
  if (!values.numberOfDays) {
    errors.numberOfDays = "Requerido!";
  }
  if (!values.packagePrice) {
    errors.packagePrice = "Requerido!";
  } else if (values.packagePrice > 999999) {
    errors.packagePrice =
      "El precio no debe superar 999,999! ";
  }
  if (!values.packageDescription) {
    errors.packageDescription = "Requerido!";
  }
  if (!values.packageImage) {
    errors.packageImage = "Requerido!";
  }

  return errors;
};
