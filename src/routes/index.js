import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Course = lazy(() => import("../pages/Course"));
const PostDetails = lazy(() => import("../pages/PostDetails"));
const Category = lazy(() => import("../pages/Category"));
const Staff = lazy(() => import("../pages/Staff"));
const Customers = lazy(() => import("../pages/Customers"));
const CustomerOrder = lazy(() => import("../pages/CustomerOrder"));
const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import("../pages/404"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Events = lazy(() => import("../pages/Events"));
const Post = lazy(() => import("../pages/Post"));
const Comment = lazy(() => import("../pages/Comment"));
const Clubs = lazy(() => import("../pages/Clubs"));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/Courses",
    component: Course,
  },
  {
    path: "/Post/:id",
    component: PostDetails,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/Post",
    component: Post,
  },

  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/events",
    component: Events,
  },
  {
    path: "/customer-order/:id",
    component: CustomerOrder,
  },
  {
    path: "/our-staff",
    component: Staff,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/order/:id",
    component: OrderInvoice,
  },

  { path: "/setting", component: EditProfile },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    path: "/clubs",
    component: Clubs,
  },
];

export default routes;
