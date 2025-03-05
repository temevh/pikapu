"use client";
import { SubjectDropdown, DateTimePicker } from "./components";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("Valitse aine");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log("selected subject:", selectedSubject);
    console.log("selected date and time:", selectedDate);
  }, [selectedSubject, selectedDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>Main page</p>
      <SubjectDropdown
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />
      <DateTimePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default MainPage;
