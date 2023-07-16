import {
  FiGrid,
  FiBook,
  FiUsers,
  FiUser,
  FiSettings,
  FiBookOpen,
  FiCalendar,
  FiGift,
} from "react-icons/fi";
import { TfiComments } from "react-icons/tfi";
import { CiChat1 } from "react-icons/ci";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/Courses",
    icon: FiBook,
    name: "internship",
  },
  {
    path: "/category",
    icon: FiBookOpen,
    name: "Subjects",
  },
  {
    path: "/Post",
    icon: TfiComments,
    name: "Event",
  },

  // {
  //   path: "/calendar",
  //   icon: FiCalendar,
  //   name: "Calendar",
  // },
  // {
  //   path: "/events",
  //   icon: FiCalendar,
  //   name: "Events",
  // },
  // {
  //   path: "/clubs",
  //   icon: FiGift,
  //   name: "Clubs",
  // },
  {
    path: "/customers",
    icon: FiUsers,
    name: "Users",
  },
  {
    path: "/our-staff",
    icon: FiUser,
    name: "Our Staff",
  },
  // {
  //   path: "/setting",
  //   icon: FiSettings,
  //   name: "Settings",
  // },
];

export default sidebar;
