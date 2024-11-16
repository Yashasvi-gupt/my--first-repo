import React from 'react';
import './Section2.css';
import Code1 from './code-for-section/Csection1';

const Section2 = () => {
    return (
        <div>
        <section className='section'>
            <div className='ds'>
                <pre>Gatter</pre>
            </div>
            <Code1 />
        </section>
        <section className='section'>
            <div className='ds'>
                <pre>Gatter</pre>
            </div>
            <Code1 />
        </section>
        </div>
       
    )
} 

export default Section2