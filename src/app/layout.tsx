"use client";
import "./globals.css";
import React, { useState } from "react";
import { AppContextProvider } from "@starwars-app/context/appContext";
import OneCharacter from "@starwars-app/components/oneCharacter/oneCharacter";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"overflow-auto	"}>
        <AppContextProvider>
          <div>
            <OneCharacter />
          </div>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
