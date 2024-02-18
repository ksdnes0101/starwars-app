"use client";

import React from "react";
import useMounted from "@starwars-app/utils/hooks/useMounted";
import { Home } from "@starwars-app/screens/home/Home";

export default function Page() {
  const mounted = useMounted();

  return mounted && <Home />;
}
