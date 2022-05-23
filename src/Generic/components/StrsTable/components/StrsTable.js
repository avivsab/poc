import * as React from 'react';
import {useEffect, useState} from 'react';
import StrsMenuBar from "./StrsMenuBar";
import {findSortingHandler} from "../utils/StrsHelper";
import Table from "./Table";

const StrsTable = (props) => {
    const [columns, setColumns] = useState([]);
    const [showHeaders, setShowHeaders] = useState(true);
    const [rows, setRows] = useState([]);
    const [rowsCopy, setRowsCopy] = useState([]);

    const handleTableSearch = (term) => {
        setRows(rowsCopy)
        const filteredRows = rowsCopy.filter(row => {
            for (const rowKey in row) {
                if (typeof row[rowKey] === 'string') {
                    return row[rowKey].toLowerCase().includes(term.toLowerCase())
                }
            }
            return true;
        })
        setRows(filteredRows)
    }

        useEffect(() => {
            const {noHeaders, data} = props;

            // assuming values of all rows are stable meaning no duplicate keys
            const tableColumns = Object.keys(data[0]);
            const columns = tableColumns.map((col, i) => {
                const rowValues = Object.values(data[0]);
                return {name: col, sortedBy: findSortingHandler(rowValues[i])}
                });
            setColumns(columns);
            setShowHeaders(!noHeaders); // only if explicitly being told to hide headers...
            const tableRows = data.slice(0, 10);
            setRows(tableRows);
            setRowsCopy(tableRows);
        }, []);

    return (
        <div style={{ height: 300, width: '100%' }}>
            <StrsMenuBar
            sorters ={columns}
            handleTableSearch={handleTableSearch}
            />
               {props.children}
            <Table
                headers={showHeaders && columns}
                rows={rows}
            />
        </div>
    );
}

export default StrsTable;
