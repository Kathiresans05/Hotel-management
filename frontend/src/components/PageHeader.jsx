import React from 'react';

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">{title}</h1>
        {subtitle && <p className="text-text-secondary mt-1 text-sm">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
