
import _ from "lodash";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';

import Pagination from "../Pagination";
import BookCardMini from "../BookCardMini";

function ReccomandTab(props) {

    const books = props.books;
    const thisBook = props.product;
    const [listReccomend, setListReccomend] = useState([]);
    useEffect(() => {
        let list = [];
        for (let book of books) {
            if (book.bookName != thisBook.bookName && (book.authorName == thisBook.authorName || _.isEqual(book.categories.sort(), thisBook.categories.sort()))) {
                list.push(book);
            }
        }
        console.log(list);
        setListReccomend(list);
    }, []);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Pagination
                        data={listReccomend.map((dataDetail) => {
                            return (
                                <BookCardMini
                                    data={dataDetail}
                                    key={dataDetail._id}
                                />
                            );
                        })}
                    />
                </Grid>
            </Grid>

        </>
    );
}

export default ReccomandTab;