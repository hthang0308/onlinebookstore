import { Icon } from "@iconify/react";
// import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import carfill from "@iconify/icons-eva/car-fill";
import coinBagSolid from "@iconify/icons-clarity/coin-bag-solid";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import { Button, Box, Divider, MenuItem, Typography } from "@mui/material";
// hooks
import useIsMountedRef from "./useIsMountedRef";
// components
import MIconButton from "./MIconButton";
import MenuPopover from "./MenuPopover";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import Avatar from "@mui/material/Avatar";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "My Account",
    icon: personFill,
    linkTo: "/change-account-info",
  },
  {
    label: "My Purchases",
    icon: carfill,
    linkTo: "/view-my-purchases",
  },
  {
    label: "Top Up",
    icon: coinBagSolid,
    linkTo: "/top-up",
  },
];
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      LocalStorageUtils.clear();
      navigate("/");
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      alert(error);
      // enqueueSnackbar("Unable to logout", { variant: "error" });
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src="https://pbs.twimg.com/media/EYVxlOSXsAExOpX.jpg" />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {LocalStorageUtils.getUser().username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Balance:{" "}
            {Number(LocalStorageUtils.getUser().balance).toLocaleString()}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
