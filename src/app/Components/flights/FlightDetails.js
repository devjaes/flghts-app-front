import React, { useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import moment from "moment";
import clsx from "clsx";
import Login from "../../pages/auth/Login";
import {
  bookFlight,
  changeFlightStatus,
  checkoutForPayment,
} from "../../crud/flights.crud";
import { shallowEqual, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
const FlightDetails = ({
  flight,
  showDetails,
  setShowDetails,
  setDetails,
  setResponse,
  readOnly,
  bookingStatus,
  updateTipsCancel,
  userType,
}) => {
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user,
    }),
    shallowEqual
  );
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "1.5rem",
  });
  const enableLoading = () => {
    setLoadingBooking(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoadingBooking(false);
    setLoadingButtonStyle({ paddingRight: "1.5rem" });
  };
  const handleClickBookNow = () => {
    if (isAuthorized) {
      enableLoading();
      bookFlight({ details: flight.details, userId: user._id })
        .then((res) => {
          console.log("res", res);
          setTimeout(() => {
            disableLoading();
            setShowDetails(false);
            setDetails(null);
            setResponse({
              success: {
                show: true,
                message: res.data.message,
              },
              error: {
                show: false,
                message: "",
              },
            });
          }, 1000);
        })
        .catch((error) => {
          setResponse({
            success: {
              show: false,
              message: "",
            },
            error: {
              show: true,
              message: "No se pudo reservar el vuelo en este momento",
            },
          });
        });
    } else {
      setShowDetails(false);
      setShowLogin(true);
    }
  };
  const handleClickChangeStatus = (status) => {
    if (isAuthorized) {
      enableLoading();
      changeFlightStatus({ flightId: bookingStatus._id, status })
        .then((res) => {
          console.log("res", res);
          setTimeout(() => {
            disableLoading();
            setShowDetails(false);
            setDetails(null);
            updateTipsCancel(bookingStatus._id, status);
            setResponse({
              success: {
                show: true,
                message: `Reserva ${status} con éxito`,
              },
              error: {
                show: false,
                message: "",
              },
            });
          }, 1000);
        })
        .catch((error) => {
          setResponse({
            success: {
              show: false,
              message: "",
            },
            error: {
              show: true,
              message: "No se pudo cambiar el estado de la reserva en este momento",
            },
          });
        });
    } else {
      setShowDetails(false);
      setShowLogin(true);
    }
  };
  const handleLogin = () => {
    setShowLogin(false);
    setShowDetails(true);
  };
  const makePayment = (token) => {
    checkoutForPayment({
      token,
      amount: parseInt(flight.details?.price?.total, 10) * 100,
      flightId: bookingStatus._id,
    })
      .then((result) => {
        setShowDetails(false);
        setDetails(null);
        if (!result.data.error) {
          updateTipsCancel(bookingStatus._id, "Confirmed");
          setResponse({
            success: {
              show: true,
              message: `Vuelo reservado con éxito`,
            },
            error: {
              show: false,
              message: "",
            },
          });
        } else {
          setResponse({
            success: {
              show: false,
              message: "",
            },
            error: {
              show: true,
              message: result.data.message,
            },
          });
        }
      })
      .catch((error) => {
        setShowDetails(false);
        setDetails(null);
        setResponse({
          success: {
            show: false,
            message: "",
          },
          error: {
            show: true,
            message: "No se pudo hacer el pago en este momento",
          },
        });
      });
  };
  console.log(flight);
  return (
    <React.Fragment>
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Vuelo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && user.role !== "2" && !user.passportNo && (
            <Alert show={true} onHide={() => {}} variant="warning">
              Tu pasaporte no está registrado, por favor regístralo haciendo{" "}
              <Alert.Link>
                <Link to="/account"> click aquí </Link>
              </Alert.Link>
            </Alert>
          )}
          <h4 className="mb-3 col-12">Rutas</h4>
          <Table responsive>
            <thead>
              <tr>
                <th>Tipo de ruta</th>
                <th>Aerolínea</th>
                <th>Paritda</th>
                <th>Llegada</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              {flight?.details?.itineraries.map((itinerary, index) =>
                itinerary.segments.map((segment, i) => (
                  <tr key={`itinerarios-${index}`}>
                    <td>
                      {index === 0 && i === 0
                        ? "Partida"
                        : i === 0
                        ? "Retorno"
                        : ""}
                    </td>
                    <td>
                      <div>{segment.aircraft.code}</div>
                      <div>
                        {segment.carrierCode}-{segment.number}
                      </div>
                    </td>
                    <td>
                      {moment(segment.departure.at).format("DD-MM-YY hh:mm a")}
                    </td>
                    <td>
                      {moment(segment.arrival.at).format("DD-MM-YY hh:mm a")}
                    </td>
                    <td>
                      {moment
                        .utc(moment.duration(segment.duration).asMilliseconds())
                        .subtract(1, "hour")
                        .format("HH:mm")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          <h4 className="mb-3 col-12">Precios por pasajero</h4>
          <Table responsive>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Opción de tarifa</th>
                <th>Cabinas</th>
                <th>Clases</th>
                <th>Peso</th>
                <th>Precio individual</th>
              </tr>
            </thead>
            <tbody>
              {flight?.details?.travelerPricings.map((tPricing) => (
                <tr>
                  <td>{tPricing.travelerType}</td>
                  <td>{tPricing.fareOption}</td>
                  <td>
                    {tPricing.fareDetailsBySegment.map((fDetails) => (
                      <div>{fDetails.cabin}</div>
                    ))}
                  </td>
                  <td>
                    {tPricing.fareDetailsBySegment.map((fDetails) => (
                      <div>{fDetails.class}</div>
                    ))}
                  </td>
                  <td>
                    {tPricing.fareDetailsBySegment.map((fDetails) => (
                      <div>
                        {fDetails.includedCheckedBags?.weight}-
                        {fDetails.includedCheckedBags?.weightUnit}
                      </div>
                    ))}
                  </td>
                  <td>
                    {tPricing.price.currency}-{tPricing.price.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          {user && user.role === "2" && (
            <>
              <h4 className="mb-3 col-12">Reservado por</h4>
              <div className="row mx-2">
                <div className="form-group col-6">
                  <div className="form-label">Nombre</div>
                  <h5>{flight?.bookedBy?.firstName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Apellido</div>
                  <h5>{flight?.bookedBy?.lastName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Email</div>
                  <h5>{flight?.bookedBy?.email || "No proporcionado"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Número de teléfono</div>
                  <h5>{flight?.bookedBy?.mobileNo || "No proporcionado"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Número de pasaporte</div>
                  <h5>{flight?.bookedBy?.passportNo || "No proporcionado"}</h5>
                </div>
              </div>
            </>
          )}

          <div className="p-3 text-right">
            <div>Precio total</div>
            {flight?.details?.price.currency}-{flight?.details?.price?.total}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Cerrar
          </Button>
          {(userType === "user" || !isAuthorized || isAuthorized) &&
          userType !== "admin" ? (
            !readOnly ? (
              <button
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking,
                  }
                )}`}
                style={loadingButtonStyle}
                disabled={user && !user.passportNo}
                onClick={handleClickBookNow}
              >
                Reservar ahora
              </button>
            ) : bookingStatus?.bookingStatus === "Pending" ? (
              <button
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking,
                  }
                )}`}
                disabled={bookingStatus?.bookingStatus !== "Pending"}
                style={loadingButtonStyle}
                onClick={() => handleClickChangeStatus("Canceled")}
              >
                Cancelar Reserva
              </button>
            ) : (
              <StripeCheckout
                token={makePayment}
                stripeKey={
                  "pk_test_51O2dNEBn1XTEN6aVWW88OgXfTpJ8U0POpDofgmjBHL9ogslBz7bDRdEYktZgiLswCfR97di3rm2Bg0zkS4G5iGpN006goRqDag"
                }
                name="PaymentForFlight"
                amount={parseInt(flight?.details?.price?.total, 10) * 100}
                currency="PKR"
              >
                <button
                  className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                    {
                      "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking,
                    }
                  )}`}
                  disabled={bookingStatus?.bookingStatus !== "Aprobado"}
                  style={loadingButtonStyle}
                  // onClick={() => handleClickChangeStatus("Canceled")}
                >
                  Confirmar para pagar
                </button>
              </StripeCheckout>
            )
          ) : (
            <button
              className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                {
                  "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking,
                }
              )}`}
              disabled={bookingStatus?.bookingStatus !== "Pendiente"}
              style={loadingButtonStyle}
              onClick={() => handleClickChangeStatus("Approved")}
            >
              Aprovar reserva
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={showLogin} onHide={() => setShowLogin(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login isModal={true} handleLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default FlightDetails;
