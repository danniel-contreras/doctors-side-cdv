import React from "react";
import InputIcon from "./InputIcon";

export default function InputSearch({ handleChange, placeholder, label }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-600 text-xs font-semibold">{label}</label>
      <div className="relative mt-1 text-gray-600 focus-within:text-gray-400">
        <InputIcon />
        <input
          type="search"
          name="q"
          className="w-full py-1 text-xs text-gray-500 font-semibold pl-10 rounded border outline-none"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
