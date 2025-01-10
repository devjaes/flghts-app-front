import React from 'react';
import {Field} from 'formik'
import RegistrationWizardContent from "./RegistrationWizardContent";
import {formErrorMessage} from "../../../pages/errors/FormErrorMessage";
import InputCountry from "../../input/InputCountry";
const RegistrationWirzardFormAddress = ({errors}) => {

  return (
    <RegistrationWizardContent title="Ingresa tu dirección">
      <div className="form-group">
        <label>Direccion*</label>
        {formErrorMessage(errors.address)}
        <Field className="form-control" name="address" placeholder="Dirección" required/>
        <span className="form-text text-muted">Ingresa tu dirección</span>
      </div>
      <div className="form-group">
        <label>País*</label>
        {formErrorMessage(errors.country)}
        <InputCountry/>
      </div>
    </RegistrationWizardContent>
  );
};

export default RegistrationWirzardFormAddress;