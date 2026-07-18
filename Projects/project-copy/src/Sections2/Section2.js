import React from 'react';
import SectionLayout from '../components/SectionLayout';
import T1 from './Templet-S2/2T-1';
import T2 from './Templet-S2/2T-2';
import T3 from './Templet-S2/2T-3';
import codes from './SectionStor2';

const Section2 = () => {
  const templates = [T1, T2, T3];

  return <SectionLayout templates={templates} codes={codes} />;
};

export default Section2