// import React from 'react';
// import { Box, ExternalSecondaryLink } from '../../../components';
// import { translate } from './translate';

// export const DocumentationLink: React.FC = () => (
//   <Box className="d-none d-lg-block" paddingVertical="sm" paddingLeft="sm">
//     <ExternalSecondaryLink
//       text={translate('externalLink.text')}
//       href={translate('externalLink.href')}
//     />
//   </Box>
// );

import React from 'react';
import { Box, ExternalSecondaryLink } from '../../../components';
import { translate } from './translate';
interface Props {
  text?: string;
}
export const DocumentationLink: React.FC<Props> = ({ text }: Props) => (
  <Box className="d-none d-lg-block" paddingVertical="sm" paddingLeft="sm">
    <ExternalSecondaryLink text={translate('externalLink.text')} href={text} />
  </Box>
);
