import React from 'react';
import InnerHTML from 'dangerously-set-html-content';

const GraphComp = ({ plotData }) => {
    return (
        <div style={{ width: '80%', margin: 'auto', marginTop: '50px' }}>
            <div style={{ width: '100%', height: '70vh', border: '1px solid black', overflow: 'auto' }}>
                {plotData}
            </div>
        </div>
    );
}
export default GraphComp;