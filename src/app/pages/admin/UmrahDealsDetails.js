import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import {
  getUmrahDealPackage,
  deleteUmrahDealPackage,
  bookWorldTour
} from "../../crud/flights.crud";
import { Modal, Spinner, Table } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import StripeCheckout from "react-stripe-checkout";
import { shallowEqual, useSelector } from "react-redux";
import AlertSuccess from "../../Components/alerts/AlertSuccess";
import AlertError from "../../Components/alerts/AlertError";
import Login from "../auth/Login";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const UmrahDealsDetails = () => {
  const query = useQuery();
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deals, setDeals] = useState(null);
  const [response, setResponse] = useState({
    success: {
      show: false,
      message: ""
    },
    error: {
      show: false,
      message: ""
    }
  });
  const closeAlert = () => {
    setResponse({
      success: {
        show: false,
        message: ""
      },
      error: {
        show: false,
        message: ""
      }
    });
  };
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user
    }),
    shallowEqual
  );
  useEffect(() => {
    setLoading(true);
    const deal = query.get("deal");
    if (deal) {
      getUmrahDealPackage({ dealId: deal })
        .then(result => {
          console.log("result", result);
          setDeals(result.data.deals[0]);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch(error => {
          console.log("error", error);
        });
    } else {
      history.push("/umrah-deals");
    }
  }, []);
  const makePayment = token => {
    bookWorldTour({
      token,
      amount: parseInt(deals?.details.packages.price, 10) * 100,
      dealId: deals._id,
      packageId: deals.details.packages._id,
      userId: user._id
    })
      .then(result => {
        const bookedBy = deals.details.packages.bookedBy || [];
        setDeals({
          ...deals,
          details: {
            ...deals.details,
            packages: {
              ...deals.details.packages,
              bookedBy: [...bookedBy, user._id]
            }
          }
        });

        setResponse({
          success: {
            show: true,
            message: `Reserva confirmada exitosamente`
          },
          error: {
            show: false,
            message: ""
          }
        });
      })
      .catch(error => {
        setResponse({
          success: {
            show: false,
            message: ""
          },
          error: {
            show: true,
            message: "No se ha podido hacer el pago en este momento"
          }
        });
      });
  };
  const handleDeletePackage = () => {
    deleteUmrahDealPackage({
      dealId: deals._id
    })
      .then(res => {
        setDeleteConfirm(false);
        setResponse({
          success: {
            show: true,
            message: `Paquete eliminado con éxito!`
          },
          error: {
            show: false,
            message: ""
          }
        });
        setTimeout(() => {
          history.push("/umrah-deals");
        }, 2000);
      })
      .catch(() => {
        setResponse({
          success: {
            show: false,
            message: ""
          },
          error: {
            show: true,
            message: "No se puede eliminar el paquete"
          }
        });
      });
  };
  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title={deals?.details.packages.title}
          toolbar={
            <PortletHeaderToolbar>
              {user ? (
                user?.role === "1" ? (
                  <StripeCheckout
                    token={makePayment}
                    stripeKey={
                      "pk_test_51HLtFDCzlUjqqV4cLqsB8OvMpfcaVDzIhl9HJAzf2trhhw3wEdQrIjR26zvooiOdLS1pqsxdW6xpbped5ObJUSIf0069JxvS7k"
                    }
                    name="PaymentForFlight"
                    amount={parseInt(deals?.details.packages.price, 10) * 100}
                    currency="PKR"
                  >
                    <button
                      className={`btn btn-primary btn-elevate kt-login__btn-primary `}
                      disabled={
                        deals?.details.packages.bookedBy?.filter(
                          bb => bb === user._id
                        ).length > 0
                      }
                      // style={loadingButtonStyle}
                      // onClick={() => handleClickChangeStatus("Canceled")}
                    >
                      Reserva ahora
                    </button>
                  </StripeCheckout>
                ) : (
                  <button
                    className={`btn btn-danger btn-elevate kt-login__btn-primary `}
                    // style={loadingButtonStyle}
                    onClick={() => setDeleteConfirm(true)}
                  >
                    Eliminar paquete
                  </button>
                )
              ) : (
                <button
                  className={`btn btn-primary btn-elevate kt-login__btn-primary `}
                  onClick={() => setShowLogin(true)}
                >
                  Reserva ahora
                </button>
              )}
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <AlertSuccess
            show={response.success.show}
            message={response.success.message}
            handleClose={closeAlert}
          />
          <AlertError
            show={response.error.show}
            message={response.error.message}
            handleClose={closeAlert}
          />
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 150 }}
            >
              <Spinner animation={"grow"} />
            </div>
          ) : (
            <div>
              <div style={{ height: 280 }}>
                <img
                  src={`/images/${deals?.details.packages.image}`}
                  alt={deals?.details.packages.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="mt-5">
                <CKEditor
                  editor={ClassicEditor}
                  data={deals?.details.packages.description}
                  disabled
                  config={{
                    toolbar: null
                  }}
                />
              </div>
            </div>
          )}
          <div className="mt-3">
            <h6>
              Número de personas:{" "}
              <span className="font-weight-bold">
                {" "}
                {deals?.details.packages.numberOfPeople}
              </span>
            </h6>
            <h6>
              Número de días:{" "}
              <span className="font-weight-bold">
                {deals?.details.packages.numberOfDays}
              </span>
            </h6>
            <h6>
              Precio total:{" "}
              <span className="font-weight-bold">
                PKR {deals?.details.packages.price}
              </span>
            </h6>
          </div>
          {user && user.role === "2" && (
            <div className="mt-3">
              <h4>Reservado por:</h4>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Número de teléfono</th>
                    <th>Número de pasaporte</th>
                  </tr>
                </thead>
                <tbody>
                  {deals?.details.packages.bookedBy?.map(bookedBy => (
                    <tr key={bookedBy._id}>
                      <td>{bookedBy.firstName}</td>
                      <td>{bookedBy.lastName}</td>
                      <td>{bookedBy.email}</td>
                      <td>{bookedBy.mobileNo}</td>
                      <td>{bookedBy.passportNo}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </PortletBody>
      </Portlet>
      <Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estás segur de que quieres eliminar este paquete?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger btn-outlined"
            onClick={handleDeletePackage}
          >
            Eliminar ahora
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLogin} onHide={() => setShowLogin(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login isModal={true} handleLogin={() => setShowLogin(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UmrahDealsDetails;
