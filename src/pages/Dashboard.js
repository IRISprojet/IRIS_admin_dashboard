import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui';
import { ImStack, ImFire,ImFolder } from 'react-icons/im';
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck } from 'react-icons/fi';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import OrderServices from '../services/OrderServices';
import Loading from '../components/preloader/Loading';
import ChartCard from '../components/chart/ChartCard';
import CardItem from '../components/dashboard/CardItem';
import PageTitle from '../components/Typography/PageTitle';
import OrderTable from '../components/dashboard/OrderTable';
import CardItemTwo from '../components/dashboard/CardItemTwo';
import { barOptions, doughnutOptions } from '../utils/chartsData';
import ClubService from "../services/ClubServices";
import PostServices from "../services/PostServices";
import CourseServices from "../services/CourseServices";

import { useEffect } from 'react';
import { useState } from 'react';



const Dashboard = () => {
  const [clubCount, setClubCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const clubData = await ClubService.getAllClubs();
        const postData = await PostServices.getAllPosts();
        const courseData = await CourseServices.getAllCourses();

      

        const clubTableCount =clubData.length;
       
        const postTableCount = postData.length;
        const courseTableCount = courseData.length;

        setClubCount(clubTableCount);
        setPostCount(postTableCount);
        setCourseCount(courseTableCount);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />; // Render a loading component while data is being fetched
  }

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3">
        <CardItemTwo
          title="Courses"
          Icon={ImStack}
          price={courseCount}
          className="text-white dark:text-green-100 bg-teal-500"
        />
        <CardItemTwo
          title="Posts"
          Icon={ImFolder}
          price={postCount}
          className="text-white dark:text-green-100 bg-blue-500"
        />
        <CardItemTwo
          title="Clubs"
          Icon={ImFire}
          price={clubCount}
          className="text-white dark:text-green-100 bg-green-500"
        />
      </div>
      
    </>
  );
};

export default Dashboard;