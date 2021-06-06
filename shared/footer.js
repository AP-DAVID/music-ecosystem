import {
    AppBar,
    Toolbar,
    Typography,
    Container,
  } from "@material-ui/core";

export default function Footer() {
    return (
     <div   style={{ display: 'flex', flexDirection:"column", justifyContent: 'flex-end', marginTop : 50,}}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop : 100,}}>
            <Typography variant="body2" >©2021 Musco</Typography>
        </div>
    </div>
    )
}