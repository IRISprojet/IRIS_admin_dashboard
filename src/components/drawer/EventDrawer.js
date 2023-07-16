import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Select } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import DrawerButton from "../form/DrawerButton";
import useEventSubmit from "../../hooks/useEventSubmit";
import CalendarServices from "../../services/CalendarServices";
import { useEffect, useState } from "react";

const EventDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors, onSuccess, onClose } =
    useEventSubmit(id);

  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      const calendarsData = await CalendarServices.getAllCalendars();
      setCalendars(calendarsData);
    };
    fetchCalendars();
  }, []);

  const handleFormSubmit = (formData) => {
    const data = {
      ...formData,
      label: calendars.find((calendar) => calendar.title === formData.label)
        ._id,
    };
    onSubmit(data, onSuccess, onClose); // Envoi des données au formulaire pour être soumis
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Event"
            description="Update your event and necessary information from here"
          />
        ) : (
          <Title
            title="Add Event"
            description="Add your event and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Title" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Title"
                  name="title"
                  type="text"
                  placeholder="Event title"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Description" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Description"
                  name="desc"
                  type="text"
                  placeholder="Event description"
                />
                <Error errorName={errors.desc} />
              </div>
            </div>
            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Label" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Label"
                  name="label"
                  type="text"
                  placeholder="Event label"
                />
                <Error errorName={errors.label} />
              </div>
            </div> */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Label" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  {...register("label", {
                    required: "Please select a label",
                  })}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                >
                  <option value="" disabled>
                    Select a label
                  </option>
                  {calendars.map((calendar) => (
                    <option key={calendar._id} value={calendar._id}>
                      {calendar.title}
                    </option>
                  ))}
                </Select>
                <Error errorName={errors.label} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="All-day event" name="allDay" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="allDay"
                  {...register("allDay", {
                    required: "All-day event is required!",
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select option
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
                <Error errorName={errors.allDay} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Start date and Time" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Start Date and Time"
                  name="start"
                  type="datetime-local"
                  placeholder="Coupon validation end time"
                />
                <Error errorName={errors.endTime} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="End date and Time" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="End Date and Time"
                  name="end"
                  type="datetime-local"
                  placeholder="Coupon validation end time"
                />
                <Error errorName={errors.endTime} />
              </div>
            </div>

            <DrawerButton id={id} title="Event" />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default EventDrawer;
