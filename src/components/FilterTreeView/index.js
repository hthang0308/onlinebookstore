import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function FilterTreeView(props) {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            <TreeItem nodeId="1" label="All book" onClick={() => props.filterHandler("all", '')}>
            </TreeItem>

            <TreeItem nodeId="2" label="Category">
                {props.categories.length > 0 &&
                    props.categories.map((item) => (
                        <TreeItem label={item} onClick={() => props.filterHandler("category", item)}></TreeItem>
                    ))}
            </TreeItem>
        </TreeView>
    );
}