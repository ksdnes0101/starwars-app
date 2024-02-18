import React, { useState, useEffect } from "react";
import { IAppContext, useAppContext } from "@starwars-app/context/appContext";

function Filter() {
  const genders = [
    {
      id: 1,
      gender: "female",
    },
    {
      id: 2,
      gender: "male",
    },
    {
      id: 3,
      gender: "unknown",
    },
    {
      id: 4,
      gender: "n/a",
    },
  ];

  const {
    setSelectedGender,
    selectedGender,
    selectedHomeWorld,
    setSelectedHomeWorld,
  }: IAppContext = useAppContext();
  const [allPlanets, setAllPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState("");

  async function fetchAllPlanets() {
    try {
      const response = await fetch("https://swapi.dev/api/planets");
      const data = await response.json();
      setAllPlanets(data.results);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  }

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleHomeWorldChange = (e) => {
    setSelectedHomeWorld(e.target.value);
  };

  useEffect(() => {
    fetchAllPlanets();
  }, []);

  return (
    <>
      <div>
        <div className="self-stretch h-[53px] flex-col justify-start items-start gap-1 flex">
          <div className="text-neutral-950 text-sm font-semibold font-inter">
            Seniority level
          </div>
          <div className="self-stretch p-2 bg-neutral-50 rounded border border-neutral-100 justify-start items-center inline-flex">
            <select
              onChange={handleGenderChange}
              value={selectedGender}
              className="grow shrink basis-0 text-neutral-500 text-xs font-medium font-inter outline-none bg-neutral-50"
            >
              <option value="" disabled>
                Select gender...
              </option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.gender}>
                  {gender.gender}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="self-stretch h-[53px] flex-col justify-start items-start gap-1 flex">
          <div className="text-neutral-950 text-sm font-semibold font-inter">
            Home World
          </div>
          <div className="self-stretch p-2 bg-neutral-50 rounded border border-neutral-100 justify-start items-center inline-flex">
            <select
              onChange={handleHomeWorldChange}
              value={selectedHomeWorld}
              className="grow shrink basis-0 text-neutral-500 text-xs font-medium font-inter outline-none bg-neutral-50"
            >
              <option value="" disabled>
                Select planet...
              </option>
              {allPlanets.map((planet) => (
                <option key={planet.url} value={planet.name}>
                  {planet.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
