export const validateRegistration = (values, current) => {
  const errors = {};
  const firstNameArray = Array.from(values.firstName);
  const lastNameArray = Array.from(values.lastName);
  const addressArray = Array.from(values.address);
  let firstNameValid = true;
  let lastNameValid = true;
  let addressValid = true;
  firstNameArray.map((ch, i) => {
    if (i + 2 < firstNameArray.length) {
      if (ch === firstNameArray[i + 1] && ch === firstNameArray[i + 2]) {
        firstNameValid = false;
      }
    }
  });
  lastNameArray.map((ch, i) => {
    if (i + 2 < lastNameArray.length) {
      if (ch === lastNameArray[i + 1] && ch === lastNameArray[i + 2]) {
        lastNameValid = false;
      }
    }
  });
  addressArray.map((ch, i) => {
    if (i + 2 < addressArray.length) {
      if (ch === addressArray[i + 1] && ch === addressArray[i + 2]) {
        addressValid = false;
      }
    }
  });
  if (current === 0 && values.firstName.trim() === "") {
    errors.firstName = "Nombre es requerido!";
  } else if (current === 0 && !firstNameValid) {
    errors.firstName = "Campo inválido!";
  }
  if (current === 0 && values.lastName.trim() === "") {
    errors.lastName = "Apellido es requerido!";
  } else if (current === 0 && !lastNameValid) {
    errors.lastName = "Campo inválido!";
  }
  if (current === 0 && values.mobileNo.trim() === "") {
    errors.mobileNo = "Número de teléfono es requerido!";
  } else if (current === 0 && !values.mobileNo.match(/^[0-9]{10}$/)) {
    errors.mobileNo = "Número de teléfono inválido!";
  }
  if (current === 1 && values.email.trim() === "") {
    errors.email = "Email es requerido!";
  } else if (
    current === 1 &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Email requerido!";
  }

  if (current === 1 && values.password.trim() === "") {
    errors.password = "Constraseña es requerido!";
  } else if (
    current === 1 &&
    !values.password.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  ) {
    errors.password = "Contraseña inválida";
  }
  if (current === 1 && !values.confirmPassword) {
    errors.confirmPassword = "Confirmar contraseña es requerido!";
  } else if (current === 1 && values.password !== values.confirmPassword) {
    errors.confirmPassword = "La contraseña no coincide";
  }
  if (current === 2 && !values.address) {
    errors.address = "Dirección es requerido!";
  } else if (current === 2 && !addressValid) {
    errors.address = "Dirección inválida!";
  }
  if (current === 2 && !values.country) {
    errors.country = "País es requerido!";
  }
  if (current === 3 && !values.agree) {
    errors.agree = "Porfavor acepta los términos y condiciones";
  }
  return errors;
};
