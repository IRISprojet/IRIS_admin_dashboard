import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import CategoryServices from "../services/CategoryServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useCategorySubmit = (id, color) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ subjectID, name }) => {
    const categoryData = {
      id: subjectID,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      title: name,
      color: color,
    };

    if (id) {
      CategoryServices.updateCategory(id, categoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CategoryServices.addCategory(categoryData)
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
      setValue("title", "");
      setValue("subjectID", "");
      setValue("color", "");
      clearErrors("title");
      clearErrors("id");
      clearErrors("color");
      return;
    }
    if (id) {
      CategoryServices.getCategoryById(id)
        .then((res) => {
          if (res) {
            setValue("subjectID", res.id);
            setValue("name", res.title);
            setValue("color", res.color);
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
  };
};

export default useCategorySubmit;
