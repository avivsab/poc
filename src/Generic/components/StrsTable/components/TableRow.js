import React from 'react';

function TableRow(props) {
    const {row}=props;
    const border = '1px solid lightgray';
    const records = Object.values(row);
    return (
        <tbody>
            <tr>
                {records.map((cellData, i) => {
                    return <td key={i} style={{
                        borderBottom: border,
                        borderRight: border,
                        padding: '5px'}}>
                        {cellData}
                    </td>
                })}
            </tr>
        </tbody>
    );
}

export default TableRow;
