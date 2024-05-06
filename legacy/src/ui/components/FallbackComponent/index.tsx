import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Box } from '../boxes';
import { icons } from '../icons';
import { H3, Paragraph } from '../typographies';
import { iconColors } from '../../../constants';

const Icon = () => (
  <svg
    width="150"
    height="150"
    viewBox="0 0 24 24"
    fill="#828282"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.083 14.167h1.834V9H9.083ZM10 7.729q.417 0 .698-.281.281-.281.281-.698 0-.417-.281-.698-.281-.281-.698-.281-.417 0-.698.281-.281.281-.281.698 0 .417.281.698.281.281.698.281Zm0 10.667q-1.75 0-3.271-.656-1.521-.657-2.667-1.802-1.145-1.146-1.802-2.667Q1.604 11.75 1.604 10q0-1.771.656-3.281.657-1.511 1.802-2.656Q5.208 2.917 6.729 2.26 8.25 1.604 10 1.604q1.771 0 3.281.656 1.511.657 2.657 1.803 1.145 1.145 1.802 2.666.656 1.521.656 3.271t-.656 3.271q-.657 1.521-1.802 2.667-1.146 1.145-2.667 1.802-1.521.656-3.271.656Zm0-2.042q2.667 0 4.51-1.844 1.844-1.843 1.844-4.51T14.51 5.49Q12.667 3.646 10 3.646T5.49 5.49Q3.646 7.333 3.646 10t1.844 4.51q1.843 1.844 4.51 1.844ZM10 10Z" />
  </svg>
);

export function MyFallbackComponent({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <Box
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Icon />
          <H3 bold>Oops, Something went wrong {':('}</H3>

          <div style={{ marginTop: '12px' }}>
            <Paragraph color="grey" bold>
              We're sorry. but we encountered an issue while processing your
              request.
            </Paragraph>
            <Paragraph color="grey" bold>
              Please try again later.
            </Paragraph>
          </div>

          <div
            onClick={resetErrorBoundary}
            style={{
              marginTop: '24px',
              padding: '8px 12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#431D93',
              borderRadius: '8px',
            }}
          >
            <icons.back style={{ marginTop: '2px' }} color={iconColors.white} />
            <Paragraph color="white">Go to Dashboard</Paragraph>
          </div>

          <div style={{ marginTop: '18px' }}>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/zenml-io/zenml-dashboard/issues"
            >
              <Paragraph
                color="primary"
                style={{ textDecoration: 'underline' }}
              >
                Report an Issue
              </Paragraph>
            </a>
          </div>
        </div>
      </Box>
    </div>
  );
}
