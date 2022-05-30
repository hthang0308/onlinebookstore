import PropTypes from "prop-types";
import { motion } from "framer-motion";
// material
import { Box } from "@mui/material";
//
const varSmallClick = {
  hover: { scale: 1.04 },
  tap: { scale: 0.96 },
};

const varMediumClick = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

// ----------------------------------------------------------------------

ButtonAnimate.propTypes = {
  mediumClick: PropTypes.bool,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default function ButtonAnimate({
  mediumClick = false,
  children,
  sx,
  ...other
}) {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: "inline-flex", ...sx }}
      {...other}
    >
      {children}
    </Box>
  );
}
