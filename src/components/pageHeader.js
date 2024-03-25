"use client";

import React, { useState } from "react";

const PageHeader = ({ header, description, img }) => {
  return (
    <div
      className="relative bg-cover bg-center py-16 min-w-full"
      style={{ backgroundImage: `${img}` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 text-center text-white">
          {header}
        </h1>
        <p className="text-xl mb-8 text-center text-white">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
