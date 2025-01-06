export const changePasswordValidations = values => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = 'Requerido!'
  }

  if (!values.newPassword) {
    errors.newPassword = 'Requerido!'
  } else if (!values.newPassword.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
    errors.newPassword = 'Contraseña inválida!'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Requerido!'
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Password Does not Match!'
  }

  return errors;
}