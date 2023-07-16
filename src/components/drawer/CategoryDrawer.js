import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Error from "../form/Error";
import Title from "../form/Title";
import InputArea from "../form/InputArea";
import LabelArea from "../form/LabelArea";
import DrawerButton from "../form/DrawerButton";
import useCategorySubmit from "../../hooks/useCategorySubmit";
import { ChromePicker } from "react-color";
const CategoryDrawer = ({ id }) => {
  const [color, setColor] = useState("#fff");
  const { register, handleSubmit, onSubmit, errors } = useCategorySubmit(
    id,
    color
  );
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Subject"
            description="Update your subject and information from here"
          />
        ) : (
          <Title
            title="Add Subject"
            description=" Add your subject and information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Subject ID" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Subject ID"
                  name="subjectID"
                  type="text"
                  placeholder="Subject ID"
                />
                <Error errorName={errors.type} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Subject Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Subject Name"
                  name="name"
                  type="text"
                  placeholder="Subject Name"
                />
                <Error errorName={errors.parent} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Subject Color" />
              <div className="col-span-8 sm:col-span-4">
                <ChromePicker
                  color={color}
                  onChangeComplete={(color) => setColor(color.hex)}
                />
                <Error errorName={errors.parent} />
              </div>
            </div>
          </div>
          <DrawerButton id={id} title="Subject" />
        </form>
      </Scrollbars>
    </>
  );
};
export default CategoryDrawer;
