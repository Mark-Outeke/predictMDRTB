import React, { useState } from 'react';
import InstanceList from './InstanceList';
import InstanceDetails from './InstanceDetails';


function App() {
    const [selectedInstance, setSelectedInstance] = useState(null);
    
    return (
        <div className="App" style={{ display: 'flex', marginTop: '5px' }}>
            <div style={{ flex: '1', paddingRight: '10px' }}>
                <thead>

                
                <InstanceList onSelectInstance={setSelectedInstance} />

                </thead>
            </div>
            <div style={{ flex: '1' }}>
                <InstanceDetails instance={selectedInstance} />
            </div>
        </div>
        
    );
}

export default App;
