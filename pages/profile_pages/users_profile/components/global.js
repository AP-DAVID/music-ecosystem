import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Card from '../shared/card'
import Slickdiv from '../shared/Slickdiv'
import {SONGS} from './dummydata'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));
  

const Global = ({text1, text2}) => {
    const classes = useStyles();

    return ( 
        <div>
          <Grid container style={{}} >
              <div style={{display : "flex", flexDirection : "column", borderRadius: 20,  border : '1px solid #9e9e9e', backgroundColor : '#9999', width : "150vh", height : 200, overflow : "hidden"}}>
                  <div style={{display : "flex", flexDirection : "row", justifyContent: "space-between"}}>
                    <Typography variant="'body1'" style={{fontFamily: 'Lora', marginLeft : 20, fontSize : 10,  color : "#37474f" }}>{text1}</Typography>
                      
                    <Typography variant="h6" style={{fontFamily: 'Lobster', marginRight : 20, fontSize : 10, color : "#424242" }}>{text2}</Typography>
                    
                   
                  
                  </div>


              
               <div >
                  <Slickdiv images={SONGS} slidesToShow = {4} />
               </div>
                
                
              
              </div>
              
          </Grid>
                
       </div>
     )
}
 
export default Global;