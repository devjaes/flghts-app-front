/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../utils/utils";
import * as builder from "../../ducks/builder";

class Footer extends React.Component {
  render() {
    const today = new Date().getFullYear();
    const {
      footerSelfLayoutIsExtended,
      footerClasses,
      footerContainerClasses
    } = this.props;
    return (
      <div
        className={`kt-footer ${footerClasses} kt-grid__item`}
        id="kt_footer"
        style={{backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-2.jpg")})`}}
      >
        {footerSelfLayoutIsExtended && (
          <div className="kt-footer__top">
            <div className={`kt-container ${footerContainerClasses}`}>
              <div className="row">
                <div className="col-lg-4">
                  <div className="kt-footer__section">
                    <h3 className="kt-footer__title">Sobre</h3>
                    <div className="kt-footer__content">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="kt-footer__section">
                    <h3 className="kt-footer__title">Accesos Rápidos</h3>
                    <div className="kt-footer__content">
                      <div className="kt-footer__nav">
                        <div className="kt-footer__nav-section">
                          <a href="#">Reportes Generales</a>
                          <a href="#">Widgets del Dashboard</a>
                          <a href="#">Custom Pages</a>
                        </div>
                        <div className="kt-footer__nav-section">
                          <a href="#">Ajustes de usuario</a>
                          <a href="#">Páginas personalizadas</a>
                          <a href="#">Configuración de intranet</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="kt-footer__section">
                    <h3 className="kt-footer__title">Contáctate</h3>
                    <div className="kt-footer__content">
                      <form action="" className="kt-footer__subscribe">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Email"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-brand" type="button">
                              Únete
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="kt-footer__bottom" style={{backgroundColor: "transparent"}}>
          <div className={`kt-container ${footerContainerClasses}`}>
            <div className="kt-footer__wrapper">
              <div className="kt-footer__logo">
                <Link to={"/"} className="kt-header__brand-logo">
                  <img
                    alt="Logo"
                    className="kt-header__brand-logo-sticky"
                    src={toAbsoluteUrl("/media/logos/logo-4-sm.png")}
                  />
                </Link>
                <div className="kt-footer__copyright">
                  {today}&nbsp;&copy;&nbsp;
                  <a href="http://keenthemes.com/metronic" target="_blank">
                    Keenthemes
                  </a>
                </div>
              </div>
              <div className="kt-footer__menu">
                <a href="http://keenthemes.com/metronic" target="_blank">
                  Comprar licencia
                </a>
                <a href="http://keenthemes.com/metronic" target="_blank">
                  Equipo
                </a>
                <a href="http://keenthemes.com/metronic" target="_blank">
                  Contacto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  footerSelfLayoutIsExtended:
    objectPath.get(store.builder.layoutConfig, "footer.self.layout") ===
    "extended",
  footerClasses: builder.selectors.getClasses(store, {
    path: "footer",
    toString: true
  }),
  footerContainerClasses: builder.selectors.getClasses(store, {
    path: "footer_container",
    toString: true
  })
});

export default connect(mapStateToProps)(Footer);
