import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft : 60,
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(14),
      },
    },
  }));
  


const Card = () => {
    const classes = useStyles();
    return ( 
       <div className={classes.root}>
           <Paper variant="outlined" style={{fontFamily: "Lora", borderRadius : 25}}><Typography variant="body1" style={{paddingLeft : 10, fontFamily: "Lora"}}>Songs</Typography></Paper>
           <Paper variant="outlined" style={{fontFamily: "Lora", borderRadius : 25}}><Typography variant="body1" style={{paddingLeft : 10, fontFamily: "Lora"}}>Songs</Typography></Paper>
           <Paper variant="outlined" style={{fontFamily: "Lora", borderRadius : 25}}><Typography variant="body1" style={{paddingLeft : 10, fontFamily: "Lora"}}>Songs</Typography></Paper>
           <Paper variant="outlined" style={{fontFamily: "Lora", borderRadius : 25}}><Typography variant="body1" style={{paddingLeft : 10, fontFamily: "Lora"}}>Songs</Typography></Paper>
       </div>
     )
}
 
export default Card;


