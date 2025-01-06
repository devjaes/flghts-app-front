import React from "react";
import AccountContentHeader from "../AccountContentHeader";
import AccountPersonalInfoDetails from "./AccountPersonalInfoDetails";

const AccountPersonalInfo = () => {
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <AccountContentHeader
        title="Información personal"
        subtitle="Actualiza tu información personal"
      />
      <AccountPersonalInfoDetails/>
    </div>
  );
};

export default AccountPersonalInfo;
