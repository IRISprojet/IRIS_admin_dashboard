import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useLocation } from "react-router";

import AdminServices from "../services/AdminServices";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";

const useStaffSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  // const [imageUrl, setImageUrl] = useState("");
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // if (!imageUrl) {
    //   notifyError("Image is required!");
    //   return;
    // }
    const staffData = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      role: data.role,
      // photoURL: imageUrl,
    };

    if (id) {
      AdminServices.updateStaff(id, { data: staffData })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess("Staff Updated Successfully!");
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      AdminServices.addStaff( staffData )
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
          console.log(data);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("displayName");
      setValue("email");
      setValue("password");
     // setValue("joiningDate");
      setValue("role");
      // setImageUrl("");
      clearErrors("displayName");
      clearErrors("email");
      clearErrors("password");
     // clearErrors("joiningDate");
      clearErrors("role");
      return;
    }
    if (id) {
      AdminServices.getStaffById(id)
        .then((res) => {
          if (res) {
            setValue("displayName", res.displayName);
            setValue("email", res.email);
            setValue("password", res.password);
            setValue("joiningDate", res.createdAt);
            setValue("role", res.role);
            // setImageUrl(res.photoURL);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email]);

  useEffect(() => {
    if (
      location.pathname === "/setting" ||
      (location.pathname === "/edit-profile" && Cookies.get("adminInfo"))
    ) {
      const user = JSON.parse(Cookies.get("adminInfo"));
      setValue("displayName", user.displayName);
      setValue("email", user.email);
      setValue("password", user.password);
      setValue("role", user.role);
      // setImageUrl(user.image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
 
  };
};

export default useStaffSubmit;
