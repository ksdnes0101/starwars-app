// appContext.tsx

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface Character {
  name: string;
  height: string;
  mass: string;
  films: string[];
  gender: string;
  homeworld: string;
}

interface IAppContext {
  isOneCharacterModalVisible: boolean;
  setIsOneCharacterModalVisible: (visible: boolean) => void;
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character) => void;
  paginationNumber: number;
  setPaginationNumber: Dispatch<SetStateAction<number>>;
  isSearchOpened: boolean;
  setIsSearchOpened: Function;
  selectedGender: string;
  setSelectedGender: Function;
  selectedHomeWorld: string;
  setSelectedHomeWorld: Function;
}

const AppContext = createContext<IAppContext>({
  isOneCharacterModalVisible: false,
  setIsOneCharacterModalVisible: () => {},
  selectedCharacter: null,
  setSelectedCharacter: () => {},
  paginationNumber: 1,
  setPaginationNumber: () => {},
  setIsSearchOpened: () => {},
  isSearchOpened: false,
  selectedGender: null,
  setSelectedGender: () => {},
  selectedHomeWorld: null,
  setSelectedHomeWorld: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [isOneCharacterModalVisible, setIsOneCharacterModalVisible] =
    useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [selectedHomeWorld, setSelectedHomeWorld] = useState<string>(null);

  const [selectedGender, setSelectedGender] = useState<string>(null);
  const [paginationNumber, setPaginationNumber] = useState<number>(1);
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isOneCharacterModalVisible,
        setIsOneCharacterModalVisible,
        selectedCharacter,
        setSelectedCharacter,
        paginationNumber,
        setPaginationNumber,
        isSearchOpened,
        setIsSearchOpened,
        selectedGender,
        setSelectedGender,
        selectedHomeWorld,
        setSelectedHomeWorld,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
