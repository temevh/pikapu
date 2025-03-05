"use client";
import { SubjectDropdown, DateCalendar } from "./components";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("Valitse aine");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log("selected subject", selectedSubject);
    console.log("selected date", selectedDate);
  }, [selectedSubject, selectedDate]);

  return (
    <div>
      <p>Main page</p>
      <SubjectDropdown
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />
      <DateCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default MainPage;
