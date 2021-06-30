import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import ChatTwoTone from '@material-ui/icons/ChatTwoTone';

import { AudioOutlined } from '@ant-design/icons';

import Hidden from "@material-ui/core/Hidden";
import { Input, Space } from 'antd';
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "../CustomButtons/Button.js";
import $ from 'jquery';
const { Search } = Input;
import Searches from './search.js'

import styles from "../../assets/jss/nextjs-material-dashboard/components/headerStyle.js";

export default function Header(props) {

  
  // used for checking current route
  const router = useRouter();
  // create styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  function makeBrand() {
    var name =`Welcome, ${props.userName}`;
    props.routes.map((prop) => {
      if (router.route.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
        
        <div style={{display : "flex", flexDirection : "column", alignItems : "flex-start"}}>
        
          <div style={{display : "flex", flexDirection : "row", alignItems : "flex-start"}}>
              <Button color="transparent" href="#" className={classes.title} >
                <h5 style={{color : "black"}}>{makeBrand()}</h5> 
              </Button>


            <IconButton aria-label="delete" onClick={props.goHome}>
              <HomeTwoToneIcon style={{ width: 50}}/>
            </IconButton> 


           
           </div>

           

            
          
          <div style={{display:"flex", flexDirection : "row", justifyContent : "flex-start", alignItems : "center"}}>
            <IconButton aria-label="chat" onClick={props.goChat}>
              <ChatTwoTone style={{ width: 50}}/>
            </IconButton> 

           
            {/* <Search
                placeholder="search for a user"
                allowClear
                enterButton
                size="middle"
                onSearch ={props.onSearch}
                style={{width : 220}}
            /> */}

           <Searches onSearch={props.onSearch} />


        </div>
         

          
         </div>
        

        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks onLogout = {props.onLogout}/>}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
