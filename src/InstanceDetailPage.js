import React from 'react';
import { useParams } from 'react-router-dom';

function InstanceDetailPage({ data }) {
    const { id } = useParams();
    const instance = data.find(inst => inst.trackedEntityInstance === id);

    if (!instance) return <p>Instance not found.</p>;

    return (
        <div>
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

export default InstanceDetailPage;
