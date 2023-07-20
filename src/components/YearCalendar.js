import React from "react";
import Calendar from "react-calendar";
import "../styles/YearCalendar.css";

export const YearCalendar = (props) => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 128; // Set the minimum year
  const maxYear = currentYear; // Set the maximum year

  const handleYearChange = (date) => {
    props.setPrevSelectedYear(props.selectedYear);
    props.setSelectedYear(date.getFullYear().toString());

    if (props.prevSelectedYear === props.selectedYear) {
      return;
    } else {
      props.setPageNumber(1);
    }
  };

  const handleModalClose = () => {
    props.onClose();
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <Calendar
          view="decade"
          onClickYear={handleYearChange}
          calendarType="US"
          showNavigation={true}
          showNeighboringMonth={false}
          minDate={new Date(minYear, 0, 1)}
          maxDate={new Date(maxYear, 11, 31)}
        />
        <p>Selected year: {props.selectedYear}</p>
        <button className="button" onClick={handleModalClose}>
          CLOSE
        </button>
      </div>
    </div>
  );
};
