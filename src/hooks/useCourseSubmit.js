import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import CourseServices from '../services/CourseServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useCourseSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const [children, setChildren] = useState('');
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
   

    const productData = {
      title: data.title,
      description: data.description,
      level: data.level,
      category: data.category,
      type: data.type,
      duration: data.duration,
     
    
    
      tag: JSON.stringify(tag),
    };

    if (id) {
      CourseServices.updateCourse(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CourseServices.addCourse(productData)
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
      
      setValue('title');
      setValue('level');
      setValue('type');
      setValue('description');
      setValue('duration');
      
      clearErrors('title');
      clearErrors('level');
      clearErrors('type');
      clearErrors('description');
      clearErrors('duration');
    
      return;
    }

    if (id) {
      CourseServices.getCoursetById(id)
        .then((res) => {
          if (res) {
            setValue('title',res.title);
            setValue('level',res.level);
            setValue('type',res.type);
            setValue('description',res.description);
            setValue('duration',res.duration);

         
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch('children'));
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

export default useCourseSubmit;
