import React from 'react';
import './Section2.css';
import Code2 from './code-for-section/Csection2';
import T1 from './Templet-S1/2T-1';
import T2 from './Templet-S1/2T-2';
import T3 from './Templet-S1/2T-3';

const Section1 = () => {
    return (
        <div>
            
            <section className='section2'>
            
                <div className='ds'>
                    <T1/>
                </div>
                <Code2 index={0} />
            </section>
            <section className='section2'>
           
                <div className='ds'>
                   <T2/>
                </div>
                <Code2 index={1} />
            </section>
            <section className='section2'>
           
           <div className='ds'>
              <T3/>
           </div>
           <Code2 index={1} />
       </section>
        </div>

    )
}

export default Section1