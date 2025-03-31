import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  items: BreadcrumbItem[];
  heading: string;
}

export function PageHeader({ items, heading }: PageHeaderProps) {
  return (
    <>
      <div className="flex items-center space-x-2">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground leading-0">
          {items.map((item, index) => (
            <React.Fragment key={item.label}>
              {item.href ? (
                <a href={item.href} className="text-foreground hover:text-primary">
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
              {index < items.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight heading !font-bold leading-10">
        {heading}
      </h1>
    </>
  );
}
