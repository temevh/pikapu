import * as React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/fi";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

dayjs.extend(utc);
dayjs.extend(timezone);

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
      <div className="flex flex-row gap-6">
        <MobileDatePicker
          label="Päivämäärä"
          value={dayjs(selectedDate)}
          onChange={handleDateChange}
          timezone="Europe/Helsinki"
        />
        <MobileTimePicker
          label="Aika"
          value={dayjs(selectedDate)}
          onChange={handleTimeChange}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
