import React from 'react';
import TableRow from "./TableRow";

function Table(props) {
    const {headers, rows} = props;
    return (<div>
            <table>
                <thead>
                <tr>
                    {headers && headers.map(tHeader => <th key={tHeader.name}>{tHeader.name}</th>)}
                </tr>
                </thead>
                {rows.map(row => {
                    return (<TableRow row={row} key={row.id}/>)
                })}
            </table>
        </div>);
}

export default Table;
