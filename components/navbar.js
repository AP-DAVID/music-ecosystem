import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link,
    MenuItem,
  } from "@material-ui/core";
  import MenuIcon from "@material-ui/icons/Menu";
  import React, { useState, useEffect } from "react";
  import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
  import {Link as nextLink} from 'next/link'
  import { motion } from 'framer-motion'


  
  

  
  
  
  
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#6D4C41",
      background: 'transparent',
      boxShadow: 'none',
      paddingRight: "79px",
      paddingLeft: "118px",
      width: '1024px',
      height: '500px',
      fontFamily : "Lora",
      height : '90px',
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    image: {
          borderRadius: 30,
          height : 50,
          marginRight : 30
        },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: 85,

    },
    drawerContainer: {
      padding: "20px 30px",
    },
  }));
  
  export default function Navbar() {
    const { header, logo, menuButton, toolbar, drawerContainer, image } = useStyles();

    const customTheme = createMuiTheme({
        palette: {
          secondary: {
            main: "#00838F",
            contrastText: "#000000"
          }
        }
      });
  
  
  
    const headersData = [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Help",
        href: "/help",
    
      },
      {
        label: "Log in",
        href: "logins/login"
      },
    ];
    
  
  
  
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false,
    });
  
    const { mobileView, drawerOpen } = state;
  
    useEffect(() => {
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
  
      window.addEventListener("resize", () => setResponsiveness());
    }, []);
  
  
  
  
    const displayDesktop = () => {
      return (
        <motion.Toolbar
           className={toolbar}
           initial ={{y : -150}}
            animate = {{y : 20}}
            transition={{delay : 0.2, type:'spring', stiffness : 120}}
        
        >
          
            <h1 style={{fontFamily : 'Lora'}}>Musco</h1>
            <div>{getMenuButtons()}</div>
            
        </motion.Toolbar>
      );
    };
  
   
   
   
    const displayMobile = () => {
      const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
      const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
  
      return (
        <Toolbar>
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>
  
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>
  
          <div><h1 style={{fontFamily : 'Lora'}}>Musco</h1></div>
        </Toolbar>
      );
    };





  
    const getDrawerChoices = () => {
      return headersData.map(({ label, href }) => {
        return (
          <Link
            {...{
              component : nextLink,
              href: href,
              color: "inherit",
              style: { textDecoration: "none",},
              key: label,
            }}
            style={{fontFamily : 'Newsreader'}}
          >
            <MenuItem style={{fontFamily : 'Newsreader'}}>{label}</MenuItem>
          </Link>
        );
      });
    };
  
  



    const getMenuButtons = () => {
      return headersData.map(({ label, href, onclick}) => {
        return (
          <motion
            whileHover={{ scale : 1.3, originX : 0, color : '#fe8112'}}
          >
            <Button
              {...{
                key: label,
                href: href,
                component : nextLink,
                className: menuButton,
              }}
              onClick ={onclick}
              
            >
              {label}
            </Button>
          </motion>
        );
      });
    };
  
    return (
  
      <motion.header
        // initial={{y: -500}}
        // animate = {{ y : 0}}
      >
           
            <ThemeProvider theme={customTheme}>
                <AppBar color={"secondary"}  >
                {mobileView ? displayMobile() : displayDesktop()}

                </AppBar>

        </ThemeProvider>
      </motion.header>
  
  )
    
  }
  
                
                
                
                
          
  