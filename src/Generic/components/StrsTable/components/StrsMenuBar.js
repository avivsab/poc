import * as React from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {Button, Stack} from "@mui/material";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function StrsMenuBar(props) {
    const {sorters, handleTableSearch, handleColumnSort} = props;
    const activeSorters = sorters.filter(item => item.sortedBy !== false);

    const handleSearch = (event) => {
        handleTableSearch(event.target.value)
    }

    const sortColumn = (sortObj) => {
        handleColumnSort(sortObj)
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color={'info'} style={{overflow: 'scroll'}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        STRS
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search???"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearch}
                        />
                    </Search>
                    <h3>SMART SORTERS: </h3>
                    <Stack spacing={2} direction="row">
                        {activeSorters.map(sorter => {
                            return <Button
                                key={sorter.name}
                                variant="outlined"
                                color="secondary"
                                onClick={() => sortColumn(sorter)}
                            >
                               {sorter.name}
                            </Button>
                        })}
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
