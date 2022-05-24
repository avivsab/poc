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

    function sortBy(column, sortHandler, currentRows) {
        switch (sortHandler) {
            case 'sortByNum':
                sortByNum(column, currentRows);
                break;
            case 'sortByString':
                sortByString(column, currentRows);
                break;
            case 'sortByDate':
                sortByDate(column, currentRows);
                break;
            default:
                return;
        }
    }

    // Next 3 functions will be in StrsHelper file:

    function sortByNum(column, currentRows) {
        if (currentRows[0][column] > currentRows[1][column]) {
            setRows([].concat(rows).sort((a, b) => parseFloat(a[column]) - parseFloat(b[column])));
        } else {
            setRows([].concat(rows).sort((a, b) => parseFloat(b[column]) - parseFloat(a[column])));
        }
    }

    function sortByString(column, currentRows) {
        if (currentRows[0][column] > currentRows[1][column]) {
            setRows([].concat(rows).sort((a, b) => a[column].localeCompare(b[column])));
        } else {
            setRows([].concat(rows).sort((a, b) => b[column].localeCompare(a[column])));
        }
    }

    function sortByDate(column, currentRows) {
        if (new Date(currentRows[0][column]) > new Date(currentRows[1][column])) {
            setRows([].concat(rows).sort((a, b) => new Date(a[column]) - new Date(b[column])));
        } else {
            setRows([].concat(rows).sort((a, b) => new Date(b[column]) - new Date(a[column])));
        }
    }
    // ============================================================

    const handleColumnSort = (sortingAttr) => {
        const {name, sortedBy} = sortingAttr;
        sortBy(name, sortedBy, rows)
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
    }, [props]);

    return (
        <div style={{height: 300, width: '100%'}}>
            <StrsMenuBar
                sorters={columns}
                handleTableSearch={handleTableSearch}
                handleColumnSort={handleColumnSort}
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
