import React from "react";
import InputIcon from "./InputIcon";

export default function InputSearch({ handleChange, placeholder, label }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-600 text-xs font-semibold">{label}</label>
      <div className="relative mt-1 text-gray-600 ">
        <InputIcon />
        <input
          type="text"
          name="q"
          className="w-full py-4 text-xs text-gray-500 font-semibold pl-10 rounded-xl border border-gray-300 bg-blue-50 outline-none"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
