import React, { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { IAppContext, useAppContext } from "@starwars-app/context/appContext";

export function Pagination() {
  //todo: get the maximum page number, and return the next button if the number is equal with it
  const { paginationNumber, setPaginationNumber }: IAppContext =
    useAppContext();

  const next = () => {
    if (paginationNumber === 9) {
      return;
    }
    setPaginationNumber((preNumber) => preNumber + 1);
  };

  const prev = () => {
    if (paginationNumber === 1) return;
    setPaginationNumber((preNumber) => preNumber - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <button
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={paginationNumber === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </button>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{paginationNumber}</strong>
      </Typography>
      <button size="sm" variant="outlined" onClick={next}>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </button>
    </div>
  );
}
