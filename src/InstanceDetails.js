import React from 'react';
import './App.css';

function InstanceDetails({ instance }) {
    if (!instance) return <p>Select an instance to see details.</p>;

    return (
        
            <div id="instance-details">
                <h3>Details for Instance {instance.trackedEntityInstance}</h3>
                <table className="u-table-entity">
                    <thead>
                        <tr>
                            {instance.attributes.map(attr => (
                                <th key={attr.attribute}>{attr.displayName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="u-table-alt-grey-5 u-table-body">
                        <tr>
                            {instance.attributes.map(attr => (
                                <td key={attr.attribute} className="u-table-cell">
                                    {attr.value}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
export default InstanceDetails;
