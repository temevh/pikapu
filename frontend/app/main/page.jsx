"use client";
import { SubjectDropdown, DateTimePicker, SubDataGrid } from "./components";
import FetchSubsButton from "./components/buttons/fetchsubsbutton";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("Valitse aine");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [substitutes, setSubstitutes] = useState([]);

  useEffect(() => {
    console.log("selected subject:", selectedSubject);
    console.log("selected date and time:", selectedDate);
  }, [selectedSubject, selectedDate]);

  const fetchPressed = async () => {
    console.log("fetching", selectedSubject, selectedDate);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/substitutes/getsubs",
        {
          selectedSubject: selectedSubject,
          selectedDate: selectedDate,
        }
      );
      console.log(response.data);
      setSubstitutes(response.data.substitutes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center min-h-screen gap-4 w-1/2 mx-auto">
        <SubjectDropdown
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <DateTimePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <FetchSubsButton fetchPressed={fetchPressed} />
      </div>
      <SubDataGrid substitutes={substitutes} />
    </div>
  );
};

export default MainPage;
