import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Chip, Tooltip } from "@material-ui/core";
import { editProfile, editProfileImage } from "../../../crud/auth.crud";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert } from "react-bootstrap";
import { formErrorMessage } from "../../../pages/errors/FormErrorMessage";
import clsx from "clsx";
import InputCountry from "../../input/InputCountry";
import { editProfileValidations } from "../../../../utils/validations/editProfileValidations";
import Dropzone from "react-dropzone";
import * as auth from "../../../store/ducks/auth.duck";
import { qualifications } from "../../../../utils/job-post-data";
import { practiceAreas } from "../../../../utils/practiceAreas";

const AccountPersonalInfoDetails = ({ user, fulfillUser }) => {
  const [img, setImg] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState({ show: false, message: "" });
  const [success, setSuccess] = useState({ show: false, message: "" });
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "1rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "1rem" });
  };
  const handleChangeProfile = event => {
    setImg(event.target.files[0]);
    const formData = new FormData();
    formData.set("image", event.target.files[0]);
    formData.set("userId", user._id);
    editProfileImage(formData)
      .then(res => {
        if (!res.data.success) {
          disableLoading();
          setError({ show: true, message: res.data.message });
          closeAlert();
        } else {
          disableLoading();
          setSuccess({ show: true, message: res.data.message });
          fulfillUser(res.data.user);
          closeAlert();
          setEdit(false);
        }
      })
      .catch(error => {
        disableLoading();
        setError({ show: true, message: "No se pudo editar" });
        closeAlert();
      });
  };

  const onDropReject = files => {
    setError({ show: true, message: "No se pudo aceptar tu archivo" });
    setTimeout(() => {
      setError({ show: false, message: "" });
    }, 2000);
  };
  const closeAlert = () => {
    setTimeout(() => {
      setError({ show: false, message: "" });
      setSuccess({ show: false, message: "" });
    }, 3000);
  };
  return (
    <div className="kt-form kt-form--label-right">
      <div className="kt-portlet__body">
        <div className="kt-section kt-section--first">
          <div className="kt-section__body">
            <Alert show={success.show} variant="success">
              {success.message}
            </Alert>
            <Alert show={error.show} variant="danger">
              {error.message}
            </Alert>
            <div className="form-group row position-relative">
              <label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
              <div className="col-lg-9 col-xl-6">
                <div className="kt-avatar kt-avatar--outline">
                  <img
                    src={
                      user.profileImage && user.profileImage.filename
                        ? `/images/${user.profileImage.filename}`
                        : "/media/users/100_13.jpg"
                    }
                    alt=""
                    className="kt-avatar__holder"
                  />
                  {edit && (
                    <label className="kt-avatar__upload">
                      <i className="fa fa-pen" />
                      <input
                        type="file"
                        name="profile_avatar"
                        onChange={handleChangeProfile}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>
              {!edit && (
                <Tooltip title="Editar perfil" placement="top">
                  <button
                    className="btn btn-label btn-icon position-absolute"
                    onClick={() => setEdit(true)}
                    style={{ right: "20px", top: "-20px" }}
                  >
                    <i className="fa fa-pen" />
                  </button>
                </Tooltip>
              )}
            </div>
            {!edit ? (
              <div className="row">
                <div className="form-group col-6">
                  <div className="form-label">Nombre</div>
                  <h5>{user.firstName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Apellido</div>
                  <h5>{user.lastName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Dirección</div>
                  <h5>{user.address || "No propocionada"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">País</div>
                  <h5>{user.country || "No proporcionado"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Número de pasaporte</div>
                  <h5>{user.passportNo || "No proporcionado"}</h5>
                </div>
              </div>
            ) : (
              <div className="row">
                <Formik
                  initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    country: user.country,
                    mobileNo: user.mobileNo,
                    passportNo: user.passportNo
                  }}
                  validate={editProfileValidations}
                  onSubmit={(
                    values,
                    { setStatus, setSubmitting, resetForm }
                  ) => {
                    enableLoading();
                    editProfile({
                      ...values,
                      userId: user._id,
                      role: user.role
                    })
                      .then(res => {
                        if (!res.data.success) {
                          disableLoading();
                          setError({ show: true, message: res.data.message });
                          closeAlert();
                        } else {
                          disableLoading();
                          setSuccess({ show: true, message: res.data.message });
                          fulfillUser(res.data.user);
                          closeAlert();
                          setEdit(false);
                        }
                        setSubmitting(false);
                      })
                      .catch(error => {
                        disableLoading();
                        setError({ show: true, message: "No se pudo editar" });
                        setSubmitting(false);
                        closeAlert();
                      });
                  }}
                >
                  {({
                    status,
                    handleSubmit,
                    isSubmitting,
                    resetForm,
                    setFieldValue,
                    values
                  }) => (
                    <Form onSubmit={handleSubmit} className="w-100">
                      <div className="row">
                        <label className="col-xl-3" />
                        <div className="col-lg-9 col-xl-6">
                          <h3 className="kt-section__title kt-section__title-sm">
                            Edita tu perfil:
                          </h3>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Nombre
                        </label>
                        <div className="col-lg-9 col-xl-6">
                          <Field
                            className="form-control"
                            name="firstName"
                            placeholder="Nombre"
                          />
                          <ErrorMessage
                            name="firstName"
                            render={formErrorMessage}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Apellido
                        </label>
                        <div className="col-lg-9 col-xl-6">
                          <Field
                            className="form-control"
                            name="lastName"
                            placeholder="Apellido"
                          />
                          <ErrorMessage
                            name="lastName"
                            render={formErrorMessage}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Numero de teléfono
                        </label>
                        <div className="col-lg-9 col-xl-6">
                          <Field
                            className="form-control"
                            name="mobileNo"
                            placeholder="03XXXXXXXXX"
                          />
                          <ErrorMessage
                            name="mobileNo"
                            render={formErrorMessage}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Número de pasaporte
                        </label>
                        <div className="col-lg-9 col-xl-6">
                          <Field
                            className="form-control"
                            name="passportNo"
                            placeholder="000000000"
                          />
                          <ErrorMessage
                            name="passportNo"
                            render={formErrorMessage}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Dirección
                        </label>
                        <div className="col-lg-9 col-xl-6">
                          <Field
                            className="form-control"
                            name="address"
                            placeholder="Dirección"
                          />
                          <ErrorMessage
                            name="address"
                            render={formErrorMessage}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          País
                        </label>
                        <div className="col-lg-9 col-xl-6">
                          <InputCountry />
                          <ErrorMessage
                            name="country"
                            render={formErrorMessage}
                          />
                        </div>
                      </div>
                      <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                          <div className="row">
                            <div className="col-lg-3 col-xl-3" />
                            <div className="col-lg-9 col-xl-9">
                              <button
                                type="submit"
                                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                                  {
                                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                                  }
                                )}`}
                                style={loadingButtonStyle}
                                disabled={isSubmitting}
                              >
                                Guardar
                              </button>
                              &nbsp;
                              <button
                                type="button"
                                onClick={() => setEdit(false)}
                                className="btn btn-secondary"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ auth: { user } }) => ({
  user
});
export default connect(
  mapStateToProps,
  auth.actions
)(AccountPersonalInfoDetails);
