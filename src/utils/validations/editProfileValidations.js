export const editProfileValidations = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Requerido!";
  }

  if (!values.lastName) {
    errors.lastName = "Requerido!";
  }
  if (!values.mobileNo) {
    errors.mobileNo = "Requerido!";
  } else if (!values.mobileNo.match(/^[0-9]{10}$/)) {
    errors.mobileNo = "Número de celular inválido!";
  }
  if (values.passportNo && !values.passportNo.match(/^[0-9]{9}$/)) {
    errors.passportNo = "Número de pasaporte inválido!";
  }
  if (!values.address) {
    errors.address = "Requerido!";
  }
  if (!values.country) {
    errors.country = "Requerido!";
  }

  return errors;
};
