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
        <option value="cours">cours</option>
        <option value="td">td</option>
        <option value="examen">examen</option>
        <option value="enregistrement">enregistrement </option>
        <option value="resumé">resumé </option>
        
      </Select>
    </>
  );
};

export default SelectOption;
