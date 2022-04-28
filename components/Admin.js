import React from "react";
import { useRouter } from "next/router";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../componentss/Navbars/Navbar.js";
import Footer from "../componentss/Footer/Footer.js";
import Sidebar from "../componentss/Sidebar/Sidebar.js";
import FixedPlugin from "../componentss/FixedPlugin/FixedPlugin.js";

import routes from "../routes.js";

import styles from "../assets/jss/nextjs-material-dashboard/layouts/adminStyle.js";

import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import { motion } from "framer-motion";

let ps;

export default function Admin({
  goChat,
  goHome,
  onLogout,
  session,
  userPicture,
  onSearch,
  userName,
  userEmail,
  children,
  ...rest
}) {
  // used for checking current route
  const router = useRouter();
  // styles
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("white");
  const [sidebars, setSidebars] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const Variants = {
    hidden: {
      opacity: 0.5,
    },

    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 2 },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };

  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return router.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <motion.div
      className={classes.wrapper}
      variants={Variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Sidebar
        userPicture={userPicture}
        routes={routes}
        logoText={"Musco"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          goChat={goChat}
          goHome={goHome}
          onLogout={onLogout}
          onSearch={onSearch}
          session={session}
          userEmail={userEmail}
          userName={userName}
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>
        ) : (
          <div className={classes.map}>{children}</div>
        )}
        {getRoute() ? <Footer /> : null}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </motion.div>
  );
}
