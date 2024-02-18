"use client";

import { Fragment, useEffect, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ExclamationTriangleIcon,
  UserIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import Image from "next/legacy/image";
import { IAppContext, useAppContext } from "@starwars-app/context/appContext";
import { useApi } from "@starwars-app/utils/hooks/useApi";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Search() {
  const [rawQuery, setRawQuery] = useState<string>("");

  const {
    isSearchOpened,
    setIsSearchOpened,
    setIsOneCharacterModalVisible,
    setSelectedCharacter,
  }: IAppContext = useAppContext();

  const query = rawQuery.toLowerCase().replace(/^[#@]/, "");

  const [data, loading, error] = useApi<Person[]>(
    "GET",
    `/people?search=${rawQuery}`
  );
  const filteredData = data?.results?.filter((character) => {
    return character?.name.toLowerCase().includes(query);
  });

  useEffect(() => {
    const onKeyDown = (event: any) => {
      const FREEZE_KEY = "k";
      if (event.metaKey && event.key === FREEZE_KEY) {
        setIsSearchOpened(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition.Root
      show={isSearchOpened}
      as={Fragment}
      afterLeave={() => setRawQuery("")}
      appear
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsSearchOpened((prevState: boolean) => !prevState)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox>
                <div className="relative border-sky-500	">
                  <MagnifyingGlassIcon
                    className=" pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-30  bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:text-sm"
                    placeholder="Search..."
                    onChange={(event: any) => setRawQuery(event.target.value)}
                  />
                </div>

                {(filteredData?.length > 0 || filteredData?.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-10 scroll-py-10 scroll-pb-2 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredData.length > 0 && (
                      <li>
                        <h2 className="text-xs font-semibold text-gray-900">
                          Characters
                        </h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {filteredData.map((character) => (
                            <Combobox.Option
                              key={character?.name} //id?
                              value={character}
                              className={({ active }: any) =>
                                classNames(
                                  "flex cursor-default select-none items-center px-4 py-2",
                                  active && "bg-sky-500 text-white"
                                )
                              }
                              onClick={() => {
                                setSelectedCharacter(character);
                                setIsOneCharacterModalVisible(true);
                                setIsSearchOpened(!isSearchOpened);
                              }}
                            >
                              {({ active }: any) => (
                                <>
                                  <UserIcon
                                    className={classNames(
                                      "h-6 w-6 flex-none",
                                      active ? "text-white" : "text-gray-400"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {character?.name}
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {query !== "" &&
                  rawQuery !== "?" &&
                  filteredData.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <ExclamationTriangleIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        No results found
                      </p>
                      <p className="mt-2 text-gray-500">
                        We couldn’t find anything with that term. Please try
                        again.
                      </p>
                    </div>
                  )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
