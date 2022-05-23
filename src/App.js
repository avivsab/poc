import './App.css';
import PageWrapper from "./views/wrappers/page-wrapper";
import StrsTable from "./Generic/components/StrsTable/components/StrsTable";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Paper} from "@mui/material";

function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('MOCK_DATA.json')
            .then(data => data.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <div className="App">
            <PageWrapper>
                <div>another content...</div>
                {data.length &&
                <StrsTable data={data} noHeaders={false}>
                    <h1>smart separation</h1>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 128,
                                height: 128,
                            },
                        }}
                    >
                        <Paper elevation={2} />
                        <Paper />
                        <Paper elevation={3} />
                    </Box>
                </StrsTable>}
            </PageWrapper>
        </div>
    );
}

export default App;
