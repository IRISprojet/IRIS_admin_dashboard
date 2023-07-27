import React from "react";
import { Select } from "@windmill/react-ui";

const SelectOption = ({ register, name, label}) => {
  return (
    <>
       <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>Select type</option>
        <option value="stage pfe">stage pfe </option>
        <option value="stage d'été">stage d'été</option>
        <option value="autre..">autre..</option>
        
        
      </Select>
    </>
  );
};

export default SelectOption;
