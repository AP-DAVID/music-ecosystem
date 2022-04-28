import React, { useState } from "react";
import Slider from "react-slick";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import styles from "./Slickdiv.module.css";
import Musiccard from "./Musiccard";

const NextArrow = ({ onClick }) => {
  return (
    <div className="nextArrow" onClick={onClick}>
      <BsChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="prevArrow" onClick={onClick}>
      <BsChevronLeft />
    </div>
  );
};

const Slickdiv = ({ images, slidesToShow = 3 }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    dots: false,
    speed: 300,
    slidesToShow: slidesToShow,
    centerPadding: "0",
    focusOnSelect: true,
    nextArrow: <NextArrow onClick />,
    prevArrow: <PrevArrow onClick />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const templateImages = images?.map((image, idx) => {
    if (image !== null) {
      return (
        <div
          className={idx === imageIndex ? "activeSlide" : styles.slide}
          key={image.id}
        >
          {/* <motion.div
           className="slideWrapper"
           whileHover={{ scale: 1.1 }}
           style={{height : 150}}
           whileTap={{ scale: 0.9 }}
          >
            {image.code ? image.code : <img src={image.picture} alt="placeholder Image" />}
          </motion.div> */}

          <Musiccard
            source={image.picture}
            song={image.src}
            text={image.text}
            artist={image.artist}
          />
        </div>
      );
    }
    return null;
  });

  return <Slider {...settings}>{templateImages}</Slider>;
};

export default Slickdiv;
