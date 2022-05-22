import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container, CircularProgress } from "@mui/material";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { get } from "../../utils/ApiCaller";
import MyBookCard from "./MyBookCard";
import { format } from "date-fns";
export default function LabTabs() {
  const [dataContent, setDataContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState("1");
  useEffect(() => {
    setIsLoading(true);
    get("/api/purchasing/my-purchase", {
      username: LocalStorageUtils.getUser()?.username,
    })
      .then((res) => setDataContent(res.data.content))
      .then(() => setIsLoading(false));
  }, []);
  console.log(dataContent);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <div>
        <div className="title m-2 ml-4">My Books</div>
        {!isLoading && dataContent.length > 0 && (
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  {dataContent.map((dataDetail, idx) => (
                    <Tab
                      label={format(new Date(dataDetail.date), "dd MMMM yyyy")}
                      value={idx}
                    ></Tab>
                  ))}
                </TabList>
              </Box>
              {dataContent.map((dataDetail, idx) => (
                <TabPanel value={idx}>
                  {dataDetail.items.map((bookitem) => {
                    return (
                      <>
                        <MyBookCard
                          data={bookitem.book}
                          key={bookitem.book}
                          quantity={bookitem.quantity}
                        />
                        {/* <a href={"/#/book/" + bookitem.book.slug}>
                          {bookitem.book.bookName}
                        </a>
                        x {bookitem.quantity}
                        <br /> */}
                      </>
                    );
                  })}
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        )}
        {!isLoading && dataContent.length === 0 && (
          <div className="ml-2">No book buy yet!</div>
        )}
        {isLoading && <CircularProgress className="m-2" />}
      </div>
    </Container>
  );
}
