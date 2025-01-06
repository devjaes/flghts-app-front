import React, { useEffect, useState } from "react";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { Modal, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Tooltip } from "@material-ui/core";
import PaginationComponent from "../../Components/PaginationComponent";
import { getAdmins, removeAdmin } from "../../crud/auth.crud";

const Admins = ({ currentAdmin }) => {
  const [show, setShow] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [error, setError] = useState({ show: false, message: "" });
  const [success, setSuccess] = useState({ show: false, message: "" });
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAdmins()
      .then(res => {
        setAdmins(res.data.admins);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
  const handlePageChange = pageNumber => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage);
  };
  const handleClose = () => setShow(false);
  const handleShow = id => {
    setAdminId(id);
    setShow(true);
  };
  const confirmDelete = () => {
    removeAdmin(adminId)
      .then(res => {
        if (!res.data.success) {
          setError({ show: true, message: res.data.message });
          handleClose();
          closeAlert();
        } else {
          setSuccess({ show: true, message: res.data.message });
          handleClose();
          setAdmins(admins.filter(admin => admin._id !== adminId));
          closeAlert();
        }
      })
      .catch(error => {
        setError({ show: true, message: "No se pudo eliminar" });
        handleClose();
        closeAlert();
      });
  };
  const closeAlert = () => {
    setTimeout(() => {
      setError({ show: false, message: "" });
      setSuccess({ show: false, message: "" });
    }, 3000);
  };

  return (
    <div>
      <Alert show={success.show} variant="success">
        {success.message}
      </Alert>
      <Alert show={error.show} variant="danger">
        {error.message}
      </Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="Admins"
          toolbar={
            <PortletHeaderToolbar>
              <Link to="/admins/new">
                <button className="btn btn-label btn-bold btn-sm">
                  <i className="fa fa-plus" /> Nuevo admin
                </button>
              </Link>
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <Table responsive className="mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Villacres</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>País</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No se encontraron admins
                  </td>
                </tr>
              ) : (
                admins
                  .slice(
                    (pageNo - 1) * perPage,
                    (pageNo - 1) * perPage + perPage <= admins.length
                      ? (pageNo - 1) * perPage + perPage
                      : admins.length
                  )
                  .map((admin, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{admin.firstName}</td>
                      <td>{admin.lastName}</td>
                      <td>{admin.email}</td>
                      <td>{admin.address || "No propocionado"}</td>
                      <td>{admin.country || "No proporcionado"}</td>
                      <td>
                        <Tooltip title="Eliminar admin" placement="top">
                          <span>
                            <button
                              className="btn btn-icon text-danger btn-sm h-auto w-auto"
                              disabled={admin._id === currentAdmin}
                              onClick={() => handleShow(admin._id)}
                            >
                              <i className="fa fa-minus-circle" />
                            </button>
                          </span>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </Table>
          <PaginationComponent
            pageNo={pageNo}
            perPage={perPage}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            total={admins.length}
          />
        </PortletBody>
      </Portlet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estás seguro que quieres eliminar al admin ?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary btn-sm" onClick={handleClose}>
            Cerrar
          </button>
          <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
            Eliminar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ auth }) => ({
  currentAdmin: auth.user && auth.user._id
});

export default connect(mapStateToProps)(Admins);
