import ClearAllIcon from '@material-ui/icons/ClearAll';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';


const Header = () =>{
   return(
       <div className="container" style={{display: 'flex', padding : 20,}}>
          <Grid container direction="row" justify="space-around"  >
              <div style={{display : "flex", flexDirection : "row", justifyContent: "space-between", width : "150vh"}}>
                  <Typography variant="h6" style={{fontFamily: 'Merriweather' }}>Menu</Typography>

              <icon><ClearAllIcon/></icon>
              
              </div>
              
          </Grid>

       </div>
   )


}
export default Header