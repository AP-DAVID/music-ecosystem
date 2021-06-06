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

const dashboardRoutes = [
  {
    path: "/",
    name: "Home",
    rtlName: "منزل، بيت",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Artists",
    rtlName: "الفنانين",
    icon: Person,

    layout: "/getArtist",
  },
  {
    path: "/albums",
    name: "Albums",
    rtlName: "ألبومات",
    icon: "content_paste",

    layout: "/admin",
  },
  {
    path: "/recent",
    name: "recent",
    rtlName: "الأخيرة",
    icon: LibraryBooks,

    layout: "/admin",
  },
  {
    path: "/Favourite",
    name: "Favourite",
    rtlName: "المفضل",
    icon: BubbleChart,

    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Local",
    rtlName: "محلي",
    icon: LocationOn,

    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Create New playlist",
    rtlName: "إنشاء قائمة تشغيل جديدة",
    icon: Notifications,

    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "إعدادات",
    icon: Language,

    layout: "/rtl",
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