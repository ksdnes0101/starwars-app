import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "@starwars-app/utils/hooks/useOutsideClick";
import { IAppContext, useAppContext } from "@starwars-app/context/appContext";
import { useApi } from "@starwars-app/utils/hooks/useApi";
import axios from "axios";
import { motion } from "framer-motion";

function OneCharacter() {
  const {
    isOneCharacterModalVisible,
    setIsOneCharacterModalVisible,
    selectedCharacter,
  }: IAppContext = useAppContext();
  const [filmTitles, setFilmTitles] = useState([]);
  const modal = useRef(null);

  useOutsideClick({
    ref: modal,
    isOpen: isOneCharacterModalVisible,
    setIsOpen: setIsOneCharacterModalVisible,
  });
  useEffect(() => {
    const fetchFilmTitles = async () => {
      if (
        !selectedCharacter ||
        !selectedCharacter?.films ||
        selectedCharacter.films?.length === 0
      )
        return;

      const filmTitles = await Promise.all(
        selectedCharacter?.films.map(async (filmUrl) => {
          try {
            const response = await axios.get(filmUrl);
            return response?.data.title;
          } catch (error) {
            console.error("Error fetching film:", error);
            return null;
          }
        })
      );
      setFilmTitles(filmTitles.filter((title) => title !== null));
    };
    fetchFilmTitles();
  }, [selectedCharacter]);

  return (
    <>
      <motion.div
        animate={{ opacity: isOneCharacterModalVisible ? 1 : 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        {isOneCharacterModalVisible && (
          <div
            className="fixed z-50 w-screen h-screen flex items-center justify-center"
            ref={modal}
          >
            <div
              className="absolute w-full h-full bg-black opacity-25 "
              onClick={() => {
                setIsOneCharacterModalVisible(!isOneCharacterModalVisible);
              }}
            ></div>
            <div className="z-10 w-[500px] h-[500px] bg-white rounded border border-neutral-200 flex-col justify-start items-center inline-flex">
              <div className="self-stretch h-[72px] px-6 py-4 flex-col justify-start items-center flex">
                <div className="self-stretch h-10 flex-col justify-center items-start gap-2 flex">
                  <div className="self-stretch justify-between items-center inline-flex">
                    <div className="grow shrink basis-0 text-neutral-950 text-sm font-semibold font-Inter">
                      {selectedCharacter?.name}
                    </div>
                    <button className="w-4 h-4 relative">
                      <XMarkIcon
                        onClick={() => {
                          setIsOneCharacterModalVisible(
                            !isOneCharacterModalVisible
                          );
                        }}
                      />
                    </button>
                  </div>
                  <div className="text-neutral-950 text-xs font-normal font-Inter">
                    This is the modal of {selectedCharacter?.name}
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[0px] border border-neutral-200"></div>
              <div className="self-stretch grow shrink basis-0 justify-start items-start inline-flex">
                <div className="w-px self-stretch bg-zinc-300"></div>
                <div className="grow shrink basis-0 self-stretch px-6 py-4 flex-col justify-between items-center inline-flex">
                  <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch h-[52px] flex-col justify-start items-start gap-1 flex">
                      <div className="text-neutral-950 text-sm font-semibold font-Inter">
                        Scharacter Name
                      </div>
                      <div className="self-stretch p-2 bg-neutral-50 rounded border border-neutral-100 justify-start items-start inline-flex grow shrink basis-0 text-neutral-500 text-xs font-medium font-Inter">
                        {selectedCharacter?.name}
                      </div>
                    </div>
                    <div className="self-stretch h-[52px] flex-col justify-start items-start gap-1 flex">
                      <div className="text-neutral-950 text-sm font-semibold font-Inter">
                        Height
                      </div>
                      <div className="self-stretch p-2 bg-neutral-50 rounded border border-neutral-100 justify-start items-start inline-flex grow shrink basis-0 text-neutral-500 text-xs font-medium font-Inter">
                        {selectedCharacter?.height}
                      </div>
                    </div>
                    <div className="self-stretch h-[52px] flex-col justify-start items-start gap-1 flex">
                      <div className="text-neutral-950 text-sm font-semibold font-Inter">
                        Mass
                      </div>
                      <div className="self-stretch p-2 bg-neutral-50 rounded border border-neutral-100 justify-start items-start inline-flex grow shrink basis-0 text-neutral-500 text-xs font-medium font-Inter">
                        {selectedCharacter?.mass}
                      </div>
                    </div>
                    <div className="self-stretch h-[52px] flex-col justify-start items-start gap-1 flex">
                      <div className="text-neutral-950 text-sm font-semibold font-Inter">
                        Appears in films:
                      </div>
                      <div className="self-stretch p-2 bg-neutral-50 rounded border border-neutral-100 justify-start items-start inline-flex grow shrink basis-0 text-neutral-500 text-xs font-medium font-Inter">
                        {filmTitles?.length > 0 && (
                          <div>
                            <ul>
                              {filmTitles.map((title, index) => (
                                <li key={index}>{title}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-end items-end gap-2 inline-flex"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default OneCharacter;
