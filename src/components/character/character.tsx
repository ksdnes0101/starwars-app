import React, { ReactElement } from "react";
import { useAppContext } from "@starwars-app/context/appContext";
import Image from "next/image";

interface Character {
  name: string;
  height: string;
  mass: string;
  films: string[];
  gender: string;
  homeworld: string;
}

interface CharacterCardProps {
  character: Character;
  index: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterProp,
  index,
}) => {
  const { setIsOneCharacterModalVisible, setSelectedCharacter } =
    useAppContext();

  const handleClick = () => {
    setSelectedCharacter(characterProp);
    setIsOneCharacterModalVisible(true);
  };

  return (
    <div className="max-w-xs flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div
        className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <img
          src="https://parade.com/.image/t_share/MTkwNTgxMzUwMjEwMjgzMzg4/star-wars-characters-grogu-baby-yoda.jpg"
          alt={characterProp?.name}
          className="w-full h-auto rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="font-bold justify-center text-xl mb-2 text-neutral-400">
            {characterProp?.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
