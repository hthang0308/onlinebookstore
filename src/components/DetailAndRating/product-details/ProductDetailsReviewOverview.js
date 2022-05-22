import { over, sumBy } from "lodash";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Link as ScrollLink } from "react-scroll";
import edit2Fill from "@iconify/icons-eva/edit-2-fill";
// material
import { styled } from "@mui/material/styles";
import {
  Grid,
  Rating,
  Button,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
// utils
import { fShortenNumber } from "./formatNumber";

// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  "&:nth-of-type(2)": {
    [theme.breakpoints.up("md")]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number,
};

function ProgressItem({ star, total }) {
  const { name, reviewCount } = star;
  const barlength = total === 0 ? 0 : (reviewCount / total) * 100;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={barlength}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: "divider",
        }}
      />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", minWidth: 64, textAlign: "right" }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}

ProductDetailsReviewOverview.propTypes = {
  product: PropTypes.object,
  onOpen: PropTypes.func,
};

export default function ProductDetailsReviewOverview({ product, onOpen }) {
  // const { totalRating, totalReview, ratings } = product;
  const { rating } = product;
  const total = sumBy(rating, (tmp) => tmp.star);
  const overallLevel = rating.reduce(function (r, a) {
    r[a.star] = (r[a.star] || 0) + 1;
    return r;
  }, {});
  const avgRating =
    rating.length === 0 ? "?" : (total / rating.length).toFixed(1);
  //create 5 object named starlist1 to starlist5 with name, starCount, reviewCount
  const starlist = [
    {
      name: "1 star",
      reviewCount: overallLevel[1] ? overallLevel[1] : 0,
    },
    {
      name: "2 stars",
      reviewCount: overallLevel[2] ? overallLevel[2] : 0,
    },
    {
      name: "3 stars",
      reviewCount: overallLevel[3] ? overallLevel[3] : 0,
    },
    {
      name: "4 stars",
      reviewCount: overallLevel[4] ? overallLevel[4] : 0,
    },
    {
      name: "5 stars",
      reviewCount: overallLevel[5] ? overallLevel[5] : 0,
    },
  ];
  return (
    <Grid container>
      <GridStyle item xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: "error.main" }}>
          {avgRating}
        </Typography>
        <RatingStyle readOnly value={avgRating} precision={0.5} />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          ({fShortenNumber(rating.length)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {starlist
            .slice(0)
            .reverse()
            .map((rat) => (
              <ProgressItem star={rat} total={rating.length} />
            ))}
        </Stack>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <ScrollLink to="move_add_review" spy smooth offset={-200}>
          <Button
            size="large"
            onClick={onOpen}
            variant="outlined"
            startIcon={<Icon icon={edit2Fill} />}
          >
            Write your review
          </Button>
        </ScrollLink>
      </GridStyle>
    </Grid>
  );
}
