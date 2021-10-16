/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import { Chat, Twitter } from "@material-ui/icons";

const dashboardRoutes = [
  
  {
    path: "/",
    name: "Artists",
    rtlName: "الفنانين",
    icon: Person,

    layout: "/artists",
  },
  {
    path: "/",
    name: "Music",
    rtlName: "ألبومات",
    icon: "content_paste",

    layout: "/music",
  },
  {
    path: "/",
    name: "Profile",
    rtlName: " الملف الشخصي  ",
    icon: LibraryBooks,

    layout: "/user",
  },
  {
    path: "/",
    name: "Favourite",
    rtlName: "المفضل",
    icon: BubbleChart,

    layout: "/favourite",
  },
  {
    path: "/",
    name: "Music Tweets",
    rtlName: "تغريدة الموسيقى",
    icon: Twitter,

    layout: "/tweet",
  },
  {
    path: "/",
    name: "Local",
    rtlName: "محلي",
    icon: LocationOn,

    layout: "/maps",
  },
  {
    path: "/",
    name: "Notifications",
    rtlName: "إشعارات",
    icon: Notifications,

    layout: "/notifications",
  },
  {
    path: "/",
    name: "Settings",
    rtlName: "إعدادات",
    icon: Language,

    layout: "/settings",
  },
  {
    path: "/Logout",
    name: "Log out",
    rtlName: "تسجيل خروج",
    icon: Unarchive,

    layout: "/logout",
  },
];

export default dashboardRoutes;