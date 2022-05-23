import MyInvoiceCard from "./MyInvoiceCard";
import HeaderBreadcrumbs from "./HeaderBreadcrumbs";
import { Container } from "@mui/material";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { useEffect, useState } from "react";
import { get } from "../../utils/ApiCaller";

export default function EcommerceInvoice() {
  const [dataContent, setDataContent] = useState([]);
  useEffect(() => {
    get("/api/purchasing/my-purchase", {
      username: LocalStorageUtils.getUser()?.username,
    }).then((res) => setDataContent(res.data.content.reverse()));
  }, []);
  return (
    <Container maxWidth="lg">
      <HeaderBreadcrumbs
        heading="Your Purchases"
        links={[
          { name: "Account", href: "/my-account" },
          { name: "Your Purchases" },
        ]}
      />
      {dataContent.map((dataDetail) => {
        return <MyInvoiceCard INVOICE={dataDetail} />;
      })}
    </Container>
  );
}
