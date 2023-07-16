import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Textarea, Select } from '@windmill/react-ui';

import Title from '../form/Title';
import Error from '../form/Error';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import DrawerButton from '../form/DrawerButton';
import usePostSubmit from '../../hooks/usePostSubmit';

const PostDrawer = ({ id }) => {
   
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    
  } = usePostSubmit(id);
 
 
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update post"
            description="Updated your post and necessary information from here"
          />
        ) : (
          <Title
            title="Add post"
            description="Add your post and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Course Image" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div> */}

            

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="post message" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register('message', {
                    required: 'message is required!',
                    minLength: {
                      value: 20,
                      message: 'Minimum 20 character!',
                    },
                  })}
                  name="message"
                  placeholder="post message"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.message} />
              </div>
            </div>
            

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="type" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="type"
                  {...register('type', {
                    required: 'Course type is required!',
                  })}
                >
                  <option value="" defaultValue hidden>
                    Select  type</option>
                  <option>video</option>
                  <option>status</option>
                  <option>image</option>
                  

                  
                </Select>
                <Error errorName={errors.type} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Post likes" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="likes"
                  name="likes"
                  type="number"
                  placeholder="likes"
                />
                <Error errorName={errors.likes} />
              </div>
            </div>

           


            
          </div>

          <DrawerButton id={id} title="post" />
        </form>
      </Scrollbars>
    </>
  );
};

export default PostDrawer;
