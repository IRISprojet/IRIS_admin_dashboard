// import React, { useState } from "react";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import Title from "../form/Title";
// import Error from "../form/Error";
// import LabelArea from "../form/LabelArea";
// import InputArea from "../form/InputArea";
// import InputValue from "../form/InputValue";
// import SelectOption from "../form/SelectOption";
// import DrawerButton from "../form/DrawerButton";
// import Uploader from "../image-uploader/Uploader";
// import useClubSubmit from "../../hooks/useClubSubmit";
// import { Textarea, Select } from "@windmill/react-ui";

// import { FiPlus } from "react-icons/fi";
// const ClubDrawer = ({ id }) => {
//   // const { register, handleSubmit, onSubmit, errors } =
//   //   useClubSubmit(id);

//   // const [inputFields, setInputFields] = useState([
//   //   {
//   //     boardMemberName: "",
//   //     boardMemberPosition: "",
//   //   },
//   // ]);
//   // const addInputField = () => {
//   //   setInputFields([
//   //     ...inputFields,
//   //     {
//   //       boardMemberName: "",
//   //       boardMemberPosition: "",
//   //     },
//   //   ]);
//   // };
//   // const handleChange = (index, evnt) => {
//   //   const { name, value } = evnt.target;
//   //   const list = [...inputFields];
//   //   list[index][name] = value;
//   //   setInputFields(list);
//   // };

//   return (
//     <>
//       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
//         {id ? (
//           <Title
//             title="Update Club"
//             description="Updated your club and necessary information from here"
//           />
//         ) : (
//           <Title
//             title="Add Club"
//             description="Add your club and necessary information from here"
//           />
//         )}
//       </div>
//       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Club Banner Image" />
//               <div className="col-span-8 sm:col-span-4">
//                 <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Club ExecutivePhoto Image" />
//               <div className="col-span-8 sm:col-span-4">
//                 <Uploader imageUrl={imageUrl2} setImageUrl={setImageUrl2} />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Club Name" />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="Club name"
//                   name="name"
//                   type="text"
//                   placeholder="Club name"
//                 />
//                 <Error errorName={errors.name} />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Club description" />
//               <div className="col-span-8 sm:col-span-4">
//               <Textarea
//                   className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
//                   {...register("description", {
//                     required: "Description is required!",
//                     minLength: {
//                       value: 20,
//                       message: "Minimum 20 character!",
//                     },
//                   })}
//                   name="description"
//                   placeholder="Club details"
//                   rows="4"
//                   spellCheck="false"
//                 />
//                 <Error errorName={errors.description} />
//               </div>
//             </div>
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Club Email" />
//               <div className="col-span-8 sm:col-span-4">
//                 <InputArea
//                   register={register}
//                   label="Club Email"
//                   name="email"
//                   type="text"
//                   placeholder="Club Email"
//                 />
//                 <Error errorName={errors.email} />
//               </div>
//             </div>
//             {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Board Members" />
//               <div className="col-span-8 sm:col-span-4">
//                 {inputFields.map((inputField, index) => {
//                   const { boardMemberName, boardMemberPosition } = inputField;
//                   return (
//                     <div className="flex flex-row " key={index}>
//                       <InputValue
//                         register={register}
//                         value={boardMemberName}
//                         name="boardMemberName"
//                         type="text"
//                         placeholder="Name"
//                         onChange={(evnt) => handleChange(index, evnt)}
//                       />
//                       <Error errorName={errors.boardMemberName} />
//                       <InputValue
//                         register={register}
//                         value={boardMemberPosition}
//                         name="boardMemberPosition"
//                         type="text"
//                         placeholder="Position"
//                         onChange={(evnt) => handleChange(index, evnt)}
//                       />
//                       <Error errorName={errors.boardMemberPosition} />
//                     </div>
//                   );
//                 })}
//                 <button
//                   onClick={() => {
//                     addInputField();
//                   }}
//                   type="button"
//                   className="flex items-center ml-2 mt-3 justify-center w-10 h-6 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                   <FiPlus />
//                 </button>
//               </div>
//             </div> */}
//             <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//               <LabelArea label="Club Budget" />
//               <div className="col-span-8 sm:col-span-4">
//                 <div className="flex flex-row">
//                   <InputValue
//                     register={register}
//                     maxValue={200000}
//                     minValue={5}
//                     label="Club Budget"
//                     name="budget"
//                     type="number"
//                     placeholder="Club Budget"
//                   />
//                   <span className="mt-3 ml-1 font-bold">TND</span>
//                 </div>
//                 <Error errorName={errors.budget} />
//               </div>
//             </div>
//           </div>
//           <DrawerButton id={id} title="Club" />
//         </form>
//       </Scrollbars>
//     </>
//   );
// };
// export default ClubDrawer;
