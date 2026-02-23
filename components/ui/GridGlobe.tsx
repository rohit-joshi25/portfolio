"use client";

import React from "react";

const GridGlobe = () => {
  return (
    <div className="flex items-center justify-center absolute -left-5 top-36 md:top-40 w-full h-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-96 px-4">
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-white dark:to-black z-40" />
        {/* Globe visualization would go here - currently hidden to avoid empty black box */}
      </div>
    </div>
  );
};

export default GridGlobe;
