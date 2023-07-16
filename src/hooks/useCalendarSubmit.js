import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import CalendarServices from "../services/CalendarServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useCalendarSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const CalendarData = {
      title: data.title,
      color: data.color,
    };

    if (id) {
      CalendarServices.updateCalendar(id, CalendarData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CalendarServices.addCalendar(CalendarData)
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
      setValue("title");
      setValue("color");

      clearErrors("title");
      clearErrors("color");

      return;
    }
    if (id) {
      CalendarServices.getCalendarById(id)
        .then((res) => {
          if (res) {
            setValue("title", res.title);
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

export default useCalendarSubmit;
