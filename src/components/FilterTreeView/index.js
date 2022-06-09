import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import Label from '@mui/icons-material/Label';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import StyledTreeItem from '../StlyedTreeView';
export default function FilterTreeView(props) {
    const categories = props.categories;
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultEndIcon={false}
            sx={{ height: '100%', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            <StyledTreeItem nodeId="1" labelText="All Books" labelIcon={Label} onClick={() => props.filterHandler("all", 'All Books')} />

            <StyledTreeItem nodeId="2" labelText="Category" labelIcon={Label}>
                {categories.length > 0 && categories.map((item, index) => (
                    <StyledTreeItem key={index} nodeId={"" + (index + 3)} labelText={item} labelIcon={Label} onClick={() => props.filterHandler("category", item)} />
                ))}
            </StyledTreeItem>
        </TreeView>
    );
}