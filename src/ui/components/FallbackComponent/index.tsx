import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Box } from '../boxes';
import { H3 } from '../typographies';

export function MyFallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <Box
        style={{
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto',
        }}
        paddingVertical="xxl"
      >
        <H3>
          <p> Something went wrong</p>
          <p onClick={resetErrorBoundary} style={{ color: 'rgb(52,123, 246)' }}>
            Goto dashboard
          </p>{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/zenml-io/zenml-dashboard/issues"
          >
            Report issue
          </a>
        </H3>
      </Box>
    </div>
  );
}
