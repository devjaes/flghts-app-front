import React from "react";
import AccountContentHeader from "../AccountContentHeader";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <AccountContentHeader title='Cambiar contraseña' subtitle='Cambio o reestablece tu contraseña'/>
      <ChangePasswordForm/>
    </div>
  );
};

export default ChangePassword;
