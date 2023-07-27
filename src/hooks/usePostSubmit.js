import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import PostServices from '../services/PostServices';
import { notifyError, notifySuccess } from '../utils/toast';

const usePostSubmit = (id) => {
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
   

    const postData = {
        message: data.message,
        type: data.type
     ,
     media: imageUrl,
     time: data.time,
     likes: data.likes,
     comments: data.comments,
     user: data.user,
  
     
    
    
      tag: JSON.stringify(tag),
    };

    if (id) {
        PostServices.updatePost(id, postData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
        PostServices.addPost(postData)
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
      setValue('media');
      setValue('message');
      setValue('type');
     
      clearErrors('media');

      clearErrors('message');
      clearErrors('type');
      
    
      return;
    }

    if (id) {
        PostServices.getPost(id)
        .then((res) => {
          if (res) {
            setValue('media',res.media);

            setValue('title',res.message);
            setValue('type',res.type);
            setValue('time',res.time);
            setValue('type',res.type);
           

         
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

export default usePostSubmit;
