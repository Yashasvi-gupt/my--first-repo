import React from 'react';
import './SectionLayout.css';
import CodeViewer from './CodeViewer';

const SectionLayout = ({ templates, codes }) => {
  return (
    <div className="section-layout">
      {templates.map((Template, index) => (
        <section className="section-card" key={index}>
          <div className="section-preview">
            <Template />
          </div>
          <CodeViewer code={codes[index]} />
        </section>
      ))}
    </div>
  );
};

export default SectionLayout;
