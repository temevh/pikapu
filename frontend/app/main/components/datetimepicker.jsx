import * as React from "react";
import dayjs from "dayjs";
import "dayjs/locale/fi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const DateTimePicker = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (newDate) => {
    const updatedDate = dayjs(selectedDate)
      .set("year", newDate.year())
      .set("month", newDate.month())
      .set("date", newDate.date());

    setSelectedDate(updatedDate.toDate());
  };

  const handleTimeChange = (newTime) => {
    const updatedDate = dayjs(selectedDate)
      .set("hour", newTime.hour())
      .set("minute", newTime.minute());

    setSelectedDate(updatedDate.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fi"}>
      <div className="flex flex-row">
        <MobileDatePicker
          label="Date"
          value={dayjs(selectedDate)}
          onChange={handleDateChange}
        />
        <MobileTimePicker
          label="Time"
          value={dayjs(selectedDate)}
          onChange={handleTimeChange}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
