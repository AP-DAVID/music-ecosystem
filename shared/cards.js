import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    cursor: "pointer",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    cursor: "pointer",
  },
  image: {
    width: 128,
    height: 128,
    cursor: "pointer",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    cursor: "pointer",
  },
}));

export default function MediaCard({ svg, textName }) {
  const classes = useStyles();
  const object = {
    key1: { textName },
  };

  return (
    <motion.div
      className={classes.root}
      whileHover={{ scale: 1.3, originX: 0, color: "#fe8112" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <Image src={svg} height={100} width={100} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  style={{ fontFamily: "Merriweather" }}
                >
                  {textName}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ fontFamily: "Newsreader", fontSize: 15 }}
                >
                  Register as {textName}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography> */}
              </Grid>
              <Grid item></Grid>
            </Grid>
            {/* <Grid item>
              <Typography variant="subtitle1">something is yeah</Typography>
            </Grid> */}
          </Grid>
        </Grid>
      </motion.Paper>
    </motion.div>
  );
}
