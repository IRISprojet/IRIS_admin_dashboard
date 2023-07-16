import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Textarea, Select } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectOption from "../form/SelectOption";
import DrawerButton from "../form/DrawerButton";
import useCourseSubmit from "../../hooks/useCourseSubmit";
import CategoryServices from "../../services/CategoryServices";
import useAsync from "../../hooks/useAsync";
import Uploader from "../image-uploader/Uploader";

const CourseDrawer = ({ id }) => {
  const { data } = useAsync(CategoryServices.getAllCategory);
  const { register, handleSubmit, onSubmit, errors, imageUrl, setImageUrl } =
    useCourseSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Course"
            description="Updated your course and necessary information from here"
          />
        ) : (
          <Title
            title="Add Course"
            description="Add your course and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Course Content" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  format="pdf"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Course Title/Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Course Title/Name"
                  name="title"
                  type="text"
                  placeholder="Course title"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Course Description" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", {
                    required: "Description is required!",
                    minLength: {
                      value: 20,
                      message: "Minimum 20 character!",
                    },
                  })}
                  name="description"
                  placeholder="Course details"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="category" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="category"
                  {...register("category", {
                    required: "category level is required!",
                  })}>
                  <option value="" defaultValue hidden>
                    Select category
                  </option>
                  {data.map((c) => (
                    <option key={c.id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </Select>
                <Error errorName={errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="level" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="level"
                  {...register("level", {
                    required: "Course level is required!",
                  })}>
                  <option value="" defaultValue hidden>
                    Select level
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Select>
                <Error errorName={errors.level} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="total steps" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="totalSteps"
                  name="totalSteps"
                  type="number"
                  placeholder="totalSteps"
                />
                <Error errorName={errors.totalsteps} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="duration" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="duration"
                  name="duration"
                  type="number"
                  placeholder="duration"
                />
                <Error errorName={errors.duration} />
              </div>
            </div>
       

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Course Type" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOption
                  register={register}
                  label="Course type"
                  name="type"
                />
                <Error errorName={errors.type} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Course" />
        </form>
      </Scrollbars>
    </>
  );
};

export default CourseDrawer;
