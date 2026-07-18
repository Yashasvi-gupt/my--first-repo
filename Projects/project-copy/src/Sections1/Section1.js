import React from 'react';
import SectionLayout from '../components/SectionLayout';
import T1 from './Templet-S1/T-1';
import T2 from './Templet-S1/T-2';
import T3 from './Templet-S1/T-3';
import codes from './SectionStor';

const Section1 = () => {
  const templates = [T1, T2, T3];

  return <SectionLayout templates={templates} codes={codes} />;
};

export default Section1