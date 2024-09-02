import React, { useEffect, useState } from 'react';
import {useTable} from 'react-table';
import { Link } from 'react-router-dom';

function InstanceList({ onSelectInstance }) {
    const [instances, setInstances] = useState([]);
    const [error, setError] = useState(null);
  
    const [loading, setLoading] = useState(true);
    
    
    const apiUrl = `${process.env.REACT_APP_DHIS2_API_URL}/trackedEntityInstances.json?paging=false&fields*&trackedEntityType=MCPQUTHX1Ze&ou=GuJvMV22ihs`;

    useEffect(() => {
        const fetchInstances = async () => {
            setLoading(true);
            try {
                const response = await fetch(apiUrl, {
                    headers: {
                        'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_DHIS2_USERNAME}:${process.env.REACT_APP_DHIS2_PASSWORD}`)
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setInstances(data.trackedEntityInstances || []);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstances();
    }, [apiUrl]);

    

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'trackedEntityInstance',
                cell: ({value})=>(
                    <Link to={`/instance/${value}`}>
                        {value}
                    </Link>  
                ),
            },
            {
                Header: 'Patient Details',
                accessor: 'attributes',
                Cell: ({ value }) => (
                    <ul>
                        {value.filter(attr => ['sB1IHYu2xQT', 'ENRjVGxVL6l', 'oindugucx72']
                            .includes(attr.attribute))
                            .map(attr => (
                                <li key={attr.attribute}>
                                    <strong>{attr.attribute}: </strong> {attr.value}
                                </li>
                            ))}
                    </ul>
                ),
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: instances });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div id="instance-list">
            <h2>Tracked Entity Instances</h2>
            <table {...getTableProps()}>
            <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} onClick={() => {
                                if (onSelectInstance) {
                                    onSelectInstance(row.original);
                                }
                               
                            }}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}            

export default InstanceList;
