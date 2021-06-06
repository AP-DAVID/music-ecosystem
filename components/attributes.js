import MediaCard from '../shared/cards'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Footer from '../shared/footer'
import Link from 'next/link'


const Attributes = () => {


    return ( 
        <div className="container" style={{display: "flex", flexDirection : "column", justifyContent: "space-around", marginTop: 40, marginLeft: 20, marginRight: 20,}}>
            <Grid container spacing={3}>
               
               
               <Link href='/registers'><Grid item xs={6} sm={3}>
                   <MediaCard svg="/users.svg" textName="Individual User"/>
                </Grid></Link> 
              
               <Link href="/registers/music_artist"><Grid item xs={6} sm={3}>
                   <MediaCard svg="/musicalArtist.svg" textName="Music Artist"/>  
                </Grid></Link> 
                
                <Link href="/registers/videographer"><Grid item xs={6} sm={3}>
                   <MediaCard svg="/cinematographers.svg" textName="Videographers"/>
                </Grid></Link>
                
                <Link href="/registers/record_label"><Grid item xs={6} sm={3}>
                    <MediaCard svg="/recordLabel.svg" textName="Record label"/>
                </Grid></Link>
                  

            </Grid>
        </div>


     )
}
 
export default Attributes;