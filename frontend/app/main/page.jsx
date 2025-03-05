"use client";
import { SubjectDropdown, DateCalendar } from "./components";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("Valitse aine");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log("selected subject", selectedSubject);
  }, [selectedSubject]);

  return (
    <div>
      <p>Main page</p>
      <SubjectDropdown
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />
      <DateCalendar />
    </div>
  );
};

export default MainPage;
