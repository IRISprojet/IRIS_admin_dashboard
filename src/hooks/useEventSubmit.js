import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";

import EventServices from "../services/EventServices";
import { notifyError, notifySuccess } from "../utils/toast";
import moment from "moment";

const useEventSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState("");
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const startDate = moment(data.start);
    const endDate = moment(data.end);
    const eventData = {
      title: data.title,
      allDay: data.allDay,
      start: startDate.toISOString(), // format date with toISOString()
      end: endDate.toISOString(),
      extendedProps: {
        desc: data.desc,
        label: data.label,
      },
      tag: JSON.stringify(tag),
    };

    if (id) {
      EventServices.updateEvent(id, eventData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      EventServices.addEvent(eventData)
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
      setValue("allDay");
      setValue("desc");
      setValue("label");
      setValue("start");
      setValue("end");

      clearErrors("title");
      clearErrors("allDay");
      clearErrors("desc");
      clearErrors("label");
      clearErrors("start");
      clearErrors("end");

      return;
    }

    if (id) {
      EventServices.getEventById(id)
        .then((res) => {
          if (res) {
            setValue("title", res.title);
            setValue("allDay", res.allDay);
            setValue("desc", res.extendedProps.desc);
            setValue("label", res.extendedProps.label);
            setValue("start", res.start);
            setValue("end", res.end);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  };
};

export default useEventSubmit;
