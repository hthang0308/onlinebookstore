import { styled } from "@mui/material/styles";
import { sum } from "lodash";
import {
  Box,
  Grid,
  Card,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from "@mui/material";
import { fCurrency } from "./formatNumber";
import Label from "./Label";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { format } from "date-fns";

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  "& td": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const MyInvoiceCard = (props) => {
  const INVOICE = {
    ...props.INVOICE,
    ...{
      taxes: 30000,
      discount: 0,
      status: "paid",
      invoiceFrom: {
        name: "Nhóm TKPM",
        address: "Trường đại học Khoa học Tự nhiên, ĐHQG TP.HCM",
        phone: "097-185-1387",
      },
      invoiceTo: {
        name: LocalStorageUtils.getUser()?.fullname,
        address: LocalStorageUtils.getUser()?.address,
        phone: LocalStorageUtils.getUser()?.phone,
      },
    },
  };
  const subTotal = sum(
    INVOICE.items.map((item) => item.book.price * item.quantity)
  );
  const total = subTotal - INVOICE.discount + INVOICE.taxes;
  return (
    <>
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box
              component="img"
              alt="logo"
              src="/logo.png"
              sx={{ height: 48 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: "right" } }}>
              <Label color="success" sx={{ textTransform: "uppercase", mb: 1 }}>
                {INVOICE.status}
              </Label>
              <Typography variant="h6">
                {format(new Date(INVOICE.date), "dd MMMM yyyy HH:mm:ss")}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: "text.disabled" }}
            >
              Invoice from
            </Typography>
            <Typography variant="body2">{INVOICE.invoiceFrom.name}</Typography>
            <Typography variant="body2">
              {INVOICE.invoiceFrom.address}
            </Typography>
            <Typography variant="body2">
              Phone: {INVOICE.invoiceFrom.phone}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant="overline"
              sx={{ color: "text.disabled" }}
            >
              Invoice to
            </Typography>
            <Typography variant="body2">{INVOICE.invoiceTo.name}</Typography>
            <Typography variant="body2">{INVOICE.invoiceTo.address}</Typography>
            <Typography variant="body2">
              Phone: {INVOICE.invoiceTo.phone}
            </Typography>
          </Grid>
        </Grid>

        <TableContainer sx={{ minWidth: 960 }}>
          <Table>
            <TableHead
              sx={{
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                "& th": { backgroundColor: "transparent" },
              }}
            >
              <TableRow>
                <TableCell width={40}>#</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Qty</TableCell>
                <TableCell align="right">Unit price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {INVOICE.items.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    borderBottom: (theme) =>
                      `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="left">
                    <Box sx={{ maxWidth: 560 }}>
                      <Typography variant="subtitle2">
                        {row.book.bookName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        noWrap
                      >
                        {row.book.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="right">
                    {fCurrency(row.book.price)}
                  </TableCell>
                  <TableCell align="right">
                    {fCurrency(row.book.price * row.quantity)}
                  </TableCell>
                </TableRow>
              ))}

              <RowResultStyle>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Box sx={{ mt: 2 }} />
                  <Typography variant="body1">Subtotal</Typography>
                </TableCell>
                <TableCell align="right" width={120}>
                  <Box sx={{ mt: 2 }} />
                  <Typography variant="body1">{fCurrency(subTotal)}</Typography>
                </TableCell>
              </RowResultStyle>
              <RowResultStyle>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Typography variant="body1">Discount</Typography>
                </TableCell>
                <TableCell align="right" width={120}>
                  <Typography sx={{ color: "error.main" }}>
                    {fCurrency(-INVOICE.discount)}
                  </Typography>
                </TableCell>
              </RowResultStyle>
              <RowResultStyle>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Typography variant="body1">Shipping Fee</Typography>
                </TableCell>
                <TableCell align="right" width={120}>
                  <Typography variant="body1">
                    {fCurrency(INVOICE.taxes)}
                  </Typography>
                </TableCell>
              </RowResultStyle>
              <RowResultStyle>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell align="right" width={140}>
                  <Typography variant="h6">{fCurrency(total)}</Typography>
                </TableCell>
              </RowResultStyle>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <br />
      <br />
    </>
  );
};

export default MyInvoiceCard;
