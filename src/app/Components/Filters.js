import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

const Filters = ({ filters, handleChangeFilters }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="d-flex justify-content-sm-end flex-wrap align-items-center ">
      <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
        <DropdownToggle
          className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0"
          caret
        >
          {filters.bookingStatus !== ""
            ? filters.bookingStatus
            : "Select Booking Status"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => handleChangeFilters("bookingStatus", "")}
          >
            Todos
          </DropdownItem>

          <DropdownItem
            onClick={() => handleChangeFilters("bookingStatus", "Pending")}
          >
            Pendientes
          </DropdownItem>
          <DropdownItem
            onClick={() => handleChangeFilters("bookingStatus", "Approved")}
          >
            Aprovados
          </DropdownItem>
          <DropdownItem
            onClick={() => handleChangeFilters("bookingStatus", "Confirmed")}
          >
            Confirmados
          </DropdownItem>
          <DropdownItem
            onClick={() => handleChangeFilters("bookingStatus", "Canceled")}
          >
            Cancelados
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Filters;
