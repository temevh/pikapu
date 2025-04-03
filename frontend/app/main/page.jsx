"use client";
import { SubjectDropdown, DateTimePicker, SubDataGrid } from "./components";
import FetchSubsButton from "./components/buttons/fetchsubsbutton";
import CreatePostButton from "./components/buttons/createpostbutton";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("Valitse aine");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [substitutes, setSubstitutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("selected subject:", selectedSubject);
    console.log("selected date and time:", selectedDate);
  }, [selectedSubject, selectedDate]);

  const fetchPressed = async () => {
    setIsLoading(true);
    setError(null);
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
      setError("Sijaisopettajien haku epäonnistui. Yritä uudelleen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Etsi sijaisopettajia
          </h1>
          <p className="text-lg text-gray-600">
            Valitse aine ja päivämäärä löytääksesi saatavilla olevat
            sijaisopettajat
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <CreatePostButton />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SubjectDropdown
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
            />
            <DateTimePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <FetchSubsButton
              fetchPressed={fetchPressed}
              isLoading={isLoading}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Sijaisopettajien haku epäonnistui. Yritä uudelleen.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sijaisopettajat
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : substitutes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Sijaisopettajia ei löytynyt. Kokeile valita eri hakukriteerit.
              </p>
            </div>
          ) : (
            <SubDataGrid substitutes={substitutes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
