import React, { ReactElement, useEffect, useState } from "react";
import { useApi } from "@starwars-app/utils/hooks/useApi";
import CharacterCard from "@starwars-app/components/character/character";
import { Pagination } from "@starwars-app/components/pagination/pagination";
import { IAppContext, useAppContext } from "@starwars-app/context/appContext";
import Search from "@starwars-app/components/search/search";
import Filter from "@starwars-app/components/filter/filter";

interface IRequiredProps {}
interface IOptionalProps {}
interface IProps extends IRequiredProps, IOptionalProps {}

export function Home(): ReactElement {
  const { paginationNumber, selectedGender, selectedHomeWorld }: IAppContext =
    useAppContext();
  const [data, loading, error] = useApi<Person[]>(
    "GET",
    `/people?page=${paginationNumber}`
  );
  const [allPlanets, setAllPlanets] = useState([]);

  useEffect(() => {
    fetchAllPlanets();
  }, []);

  async function fetchAllPlanets() {
    try {
      const response = await fetch("https://swapi.dev/api/planets");
      const data = await response.json();
      setAllPlanets(data.results);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to find the planet ID based on its name
  const findPlanetId = (planetName) => {
    const planet = allPlanets.find((planet) => planet.name === planetName);
    return planet ? planet.url.split("/").slice(-2, -1)[0] : null;
  };

  // Get the home world ID based on the selected home world name
  const homeWorldId = selectedHomeWorld
    ? findPlanetId(selectedHomeWorld)
    : null;

  // Filter data based on selected gender and home world ID
  const filteredData = data?.results.filter((character) => {
    const genderMatch = !selectedGender || character.gender === selectedGender;
    const homeWorldMatch =
      !homeWorldId || character.homeworld.includes(homeWorldId);
    return genderMatch && homeWorldMatch;
  });

  return (
    <>
      <div className="w-full flex justify-center items-center h-full m-3">
        <h1> HST management próbafeladat</h1>
      </div>
      <Search />
      <Filter allPlanets={allPlanets} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          padding: "1rem",
        }}
      >
        {filteredData?.map((character, index) => (
          <CharacterCard key={index} characterProp={character} index={index} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center h-full">
        <Pagination />
      </div>
    </>
  );
}
