import React from "react";
import { toAbsoluteUrl } from "../../../_metronic";
import "../../../_metronic/_assets/sass/pages/error/error-3.scss";

export function ErrorPage3() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          className="kt-grid__item kt-grid__item--fluid kt-grid kt-error-v3"
          style={{
            backgroundImage: `url(${toAbsoluteUrl(
              "/media/error/bg3.jpg"
            )})`
          }}
        >
          <div className="kt-error_container">
            <div className="kt-error_number">
              <h1>404</h1>
            </div>
            <p className="kt-error_title kt-font-light">Cómo llegaste aquí</p>
            <p className="kt-error_subtitle">
              No podemos encontrar la página que buscas.
            </p>
            <p className="kt-error_description">
              Parece que escribiste la url equivocada,
              <br />
              o la página que buscas ya no existe.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
