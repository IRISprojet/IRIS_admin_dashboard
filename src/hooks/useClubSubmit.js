import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import ClubServices from "../services/ClubServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useClubSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const board = [];
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("datinputFieldsa", data);
    if (!imageUrl) {
      notifyError("Icon is required!");
      return;
    }
    const clubData = {
      name: data.name,
      email: data.email,
      budget: data.budget,
      photoURL: imageUrl,
      ExecutivePhoto:imageUrl2,
      description:data.description,
      board: board,
    };

    if (id) {
      ClubServices.updateClub(id, clubData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ClubServices.addClub(clubData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("email");
      setValue("budget")
      setValue("description");
      setImageUrl("");
      setImageUrl2("");
      clearErrors("name");
      clearErrors("email");
      clearErrors("budget");
      clearErrors("description");

      return;
    }
    if (id) {
      ClubServices.getClubById(id)
        .then((res) => {
          if (res) {
            setValue("name", res.name);
            setValue("email", res.email);
            setValue("budget", res.budget);
            setValue("description", res.description);
            setImageUrl(res.photoURL);
            setImageUrl2(res.ExecutivePhoto);

          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    setImageUrl2,
    imageUrl2,
  };
};

export default useClubSubmit;
