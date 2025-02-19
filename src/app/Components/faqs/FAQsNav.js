import React, {useState} from 'react';
import {Collapse} from 'reactstrap'
const FaQsNav = () => {
  const [collapse, setCollapse] = useState(true)
  return (
    <div className="col-md-3">
      <ul className="kt-nav" id="kt_nav" role="tablist">
        <li className="kt-nav__item  kt-nav__item--active">
          <span className="kt-nav__link" role="tab" onClick={() => setCollapse(!collapse)} >
            <span className="kt-nav__link-text">Lorem Ipsum</span>
            <span className="kt-nav__link-arrow"/>
          </span>
          <Collapse isOpen={collapse} style={{transition: 'all 0.3s ease-out !important'}}>
            <ul className="kt-nav__sub show" role="tabpanel"  >
              <li className="kt-nav__item">
                <span className="kt-nav__link">
                  <span className="kt-nav__link-bullet kt-nav__link-bullet--line"/>
                  <span className="kt-nav__link-text">Nuevo</span>
                </span>
              </li>
              <li className="kt-nav__item">
                <span className="kt-nav__link">
                  <span className="kt-nav__link-bullet kt-nav__link-bullet--line"/>
                  <span className="kt-nav__link-text">Pendiente</span>
                </span>
              </li>
              <li className="kt-nav__item">
                <span className="kt-nav__link">
                  <span className="kt-nav__link-bullet kt-nav__link-bullet--line"/>
                  <span className="kt-nav__link-text">Respondido</span>
                </span>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className="kt-nav__item">
          <span className="kt-nav__link">
            <span className="kt-nav__link-text">Lorem Ipsum</span>
          </span>
        </li>
        <li className="kt-nav__item">
          <span className="kt-nav__link">
            <span className="kt-nav__link-text">
            Entrega y envío
            </span>
          </span>
        </li>
        <li className="kt-nav__item">
          <span className="kt-nav__link">
            <span className="kt-nav__link-text">Asistencia al cliente</span>
          </span>
        </li>
        <li className="kt-nav__item">
          <span className="kt-nav__link">
            <span className="kt-nav__link-text">Métodos de pago</span>
          </span>
        </li>
        <li className="kt-nav__item">
          <span className="kt-nav__link">
            <span className="kt-nav__link-text">Reglas de entrega</span>
          </span>
        </li>
        <li className="kt-nav__item">
          <span className="kt-nav__link">
            <span className="kt-nav__link-text">Política de reembolso</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default FaQsNav;