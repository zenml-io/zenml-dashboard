import React from 'react';
import { Paragraph } from '../../typographies';

interface MetadataTabProps {
  metadata: Record<string, any>;
}

const MetadataTab = ({ metadata }: MetadataTabProps) => {
  if (Object.entries(metadata.run_metadata).length < 1)
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paragraph>No Metadata available</Paragraph>
      </div>
    );

  return (
    <table className="sidebar_table">
      <tbody>
        {Object.entries(metadata.run_metadata).map(([_, value]: any, i) => (
          <tr key={i}>
            {value.body.type !== 'dict' ? (
              <>
                {' '}
                <td className="td_key">{value.body.key}</td>
                <td className="td_value">
                  {value.body.type === 'Uri' ? (
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={value.body.value}
                    >
                      {value.body.value}
                    </a>
                  ) : (
                    `${value.body.value.toString()} ${
                      value.body.type === 'StorageSize' ? 'Bytes' : ''
                    }`
                  )}
                </td>
              </>
            ) : (
              <div style={{ width: '100%' }}>
                <details>
                  <summary style={{ width: '100%' }} className="td_key">
                    {value.body.key}
                  </summary>
                  <table>
                    <tbody>
                      {Object.entries(value.body.value || {}).map(
                        (item: any) => (
                          <tr>
                            <td className="td_key">{item[0]}</td>
                            <td
                              style={{ lineHeight: 'unset' }}
                              className="td_value"
                            >
                              {item[1].toString() || 'n/a'}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </details>{' '}
              </div>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default MetadataTab;
