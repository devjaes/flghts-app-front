export const adminCreateValidations = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Requerido!'
  }

  if (!values.lastName) {
    errors.lastName = 'Requerido!'
  }
  if (!values.email) {
    errors.email = 'Requerido!'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid Email!'
  }
  if (!values.mobileNo) {
    errors.mobileNo = 'Requerido!'
  } else if (!values.mobileNo.match(/^[0-9]{10}$/)) {
    errors.mobileNo = 'Número de celular inválido!'
  }
  if (!values.address) {
    errors.address = 'Requerido!'
  }
  if (!values.country) {
    errors.country = 'Requerido!'
  }

  return errors;
}