import React,{useState} from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InstanceList from './InstanceList';
import InstanceDetailPage from './InstanceDetailPage';

function App() {
    const [instances, setInstances] = useState([]);
    return (
        <Router>
            <Routes>
<Route path="/" element={
    <InstanceList 
        instances={instances} 
        setInstances={setInstances} 
    />
} />
                <Route path="/instance/:id" element={<InstanceDetailPage instances={instances} />} />
            </Routes>
        </Router>
    );
}

export default App;
