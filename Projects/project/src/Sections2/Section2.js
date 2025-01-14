import React from 'react';
import './Section2.css';
import Code1 from './code-for-section/Csection1';
import T1 from './Templet-S1/T-1';

const Section1 = () => {
    return (
        <div>
            
            <section className='section2'>
            
                <div className='ds'>
                    <T1/>
                </div>
                <Code1 index={0} />
            </section>
            <section className='section2'>
           
                <div className='ds'>
                    <pre>Gatter</pre>
                </div>
                <Code1 index={1} />
            </section>
        </div>

    )
}

export default Section1