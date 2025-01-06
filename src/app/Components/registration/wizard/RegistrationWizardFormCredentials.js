import React from 'react';
import RegistrationWizardContent from "./RegistrationWizardContent";
import {Field} from "formik";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
const RegistrationWizardFormCredentials = ({errors}) => {
  return (
    <RegistrationWizardContent title='Add Credentials'>
      <div className="form-group">
        <label>Correo electrónico*</label>
        {formErrorMessage(errors.email)}
        <Field className="form-control" name="email" placeholder="someone@somthing.com"/>
      </div>
      <div className="form-group">
        <label>Contraseña*</label>
        {formErrorMessage(errors.password)}
        <Field className="form-control" type='password' name="password" placeholder="********"/>
        <span className="form-text text-muted">
          La contraseña debe tener al menos 8 caracteres y una mayúscula
        </span>
      </div>
      <div className="form-group">
        <label>Confirmar contraseña*</label>
        {formErrorMessage(errors.confirmPassword)}
        <Field className="form-control" type='password' name="confirmPassword" placeholder="********"/>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWizardFormCredentials;