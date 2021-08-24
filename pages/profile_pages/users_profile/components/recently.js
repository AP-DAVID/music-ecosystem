import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Slickdiv from '../shared/Slickdiv'
import {SONGS} from '../../../../shared/data'

const Recently = ({text1, text2}) => {

    return ( 
        <div className="container" style={{display: 'flex', marginTop:20}}>
          <Grid container>
              <div style={{display : "flex", flexDirection : "column", justifyContent: "space-between", borderRadius: 20, backgroundColor : '#9999',  border : '1px solid #9e9e9e', width : "150vh", height : 250, overflow : "hidden"}}>
                  
              <div style={{display : "flex", flexDirection : "row", justifyContent: "space-between"}}>
                  <Typography variant="h6" style={{fontFamily: 'Lora', marginLeft : 20, fontSize: 15, color : "#37474f" }}>{text1}</Typography>

                  <Typography variant="h6" style={{fontFamily: 'Lobster', marginRight : 20, fontSize : 15, color : "#424242" }}>{text2}</Typography>
             </div>
                  
              
              <div >
                  <Slickdiv images={SONGS} slidesToShow = {4} />
               </div>

              </div>

              
          </Grid>

       </div>
     )
}
 
export default Recently;