import React from 'react';
import SectionLayout from '../components/SectionLayout';
import T1 from './Templet-S3/3T-1';
import T2 from './Templet-S3/3T-2';
import T3 from './Templet-S3/3T-3';
import codes from './SectionStor3';

const Section3 = () => {
  const templates = [T1, T2, T3];

  return <SectionLayout templates={templates} codes={codes} />;
};

export default Section3