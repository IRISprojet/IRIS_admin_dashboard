import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import DrawerButton from "../form/DrawerButton";
import useCalendarSubmit from "../../hooks/useCalendarSubmit";

const CalendarDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors } = useCalendarSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Calendar"
            description="Updated your Calendar and necessary information from here"
          />
        ) : (
          <Title
            title="Add Calendar"
            description="Add your Calendar and necessary information from here"
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Calendar Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Calendar title"
                  name="title"
                  type="text"
                  placeholder="Calendar Title"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Campaign Code" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Calendar color"
                  name="color"
                  type="text"
                  placeholder="Calendar color (hex code)"
                />
                <Error errorName={errors.color} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Calendar" />
        </form>
      </Scrollbars>
    </>
  );
};

export default CalendarDrawer;
