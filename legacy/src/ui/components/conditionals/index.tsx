import React from 'react';

interface IfElseProps {
  condition: boolean;
  renderWhenFalse: () => JSX.Element | null;
  renderWhenTrue: () => JSX.Element | null;
}

export const IfElse: React.FC<IfElseProps> = ({
  condition,
  renderWhenFalse,
  renderWhenTrue,
}) => {
  if (condition) return renderWhenTrue();
  return renderWhenFalse();
};

interface IfProps {
  condition: boolean;
  children: () => JSX.Element | null;
}

export const If: React.FC<IfProps> = ({ condition, children }) =>
  IfElse({ condition, renderWhenTrue: children, renderWhenFalse: () => null });
