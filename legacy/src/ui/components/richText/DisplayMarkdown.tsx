import React from 'react';
import ReactMarkdown from 'react-markdown';
import { H1, H2, H3, H4, Paragraph } from '../typographies';

const renderChildren = (Component: React.FC) => ({
  children,
}: {
  children: React.ReactNode & React.ReactNode[];
}) => <Component>{children}</Component>;

export const DisplayMarkdown: React.FC<{ markdown: string }> = ({
  markdown,
}) => {
  return (
    <ReactMarkdown
      components={{
        h1: renderChildren(H1),
        h2: renderChildren(H2),
        h3: renderChildren(H3),
        h4: renderChildren(H4),
        p: renderChildren(Paragraph),
        li: renderChildren(Paragraph),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
