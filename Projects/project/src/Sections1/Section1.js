import React from 'react';
import './Section1.css';
import Code1 from './code-for-section/Csection1';
import T1 from './Templet-S1/T-1';
import T2 from './Templet-S1/T-2';
import T3 from './Templet-S1/T-3';

const Section1 = () => {
    return (
        <div>
            
            <section className='section1'>
            
                <div className='ds1'>
                    <T1/>
                </div>
                <Code1 index={0} />
            </section>
            <section className='section1'>
           
                <div className='ds1'>
                    <T2/>
                </div>
                <Code1 index={1} />
            </section>
            <section className='section1'>
           
                <div className='ds1'>
                    <T3/>
                </div>
                <Code1 index={2} />
            </section>
        </div>

    )
}

export default Section1