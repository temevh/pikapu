import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { fiFI } from "@mui/x-date-pickers/locales";

const DateCalendar = ({ selectedDate, setSelectedDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
      ></DemoContainer>
      <DemoItem label="Static variant">
        <StaticDatePicker
          value={dayjs(selectedDate)}
          onChange={(newDate) => setSelectedDate(newDate.toDate())}
          displayWeekNumber={true}
          disablePast={true}
          localeText={fiFI}
        />
      </DemoItem>
    </LocalizationProvider>
  );
};
export default DateCalendar;
