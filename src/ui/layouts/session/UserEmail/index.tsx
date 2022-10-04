import React from 'react';

import {
  H2,
  Paragraph,
  Container,
  FlexBox,
  Box,
  EaseInBox,
  Image,
} from '../../../components';

import { Form } from './Form';

import styles from './index.module.scss';
import image from '../imageNew.png';

import { getTranslateByScope } from '../../../../services';
import { routePaths } from '../../../../routes/routePaths';
import { Link } from 'react-router-dom';

const UserEmail: React.FC = () => {
  const translate = getTranslateByScope('ui.layouts.UserEmail');

  return (
    <EaseInBox>
      <Container className={styles.signUp} fluid>
            <Box style={{ overflowY: 'auto' }}>
              <Box margin="lg" style={{ textAlign: 'center' }}>
                <Link to={routePaths.signup}>
                  <Image src={image} />
                </Link>
              </Box>
              <FlexBox.Column
                paddingHorizontal="sm"
                justifyContent="center"
                className={styles.pageContent}
              >
                <Box marginTop="xl" marginBottom='lg'>
                  <Box paddingBottom="md" style={{ textAlign: 'center'}}>
                    <H2 bold color='white' >{translate('title')}</H2>
                  </Box>
                  <Box className={styles.pageContentBox}>
                    <Paragraph color="grey">{translate('subtitle1')}</Paragraph>
                  </Box>
                  <Box marginTop='md' className={styles.pageContentBox}>
                    <Paragraph color="grey">{translate('subtitle2')}</Paragraph>
                  </Box>
                </Box>

                <Box className={styles.formBox}>
                  <Form />
                </Box>         
              </FlexBox.Column>
            </Box>
      </Container>
    </EaseInBox>
  );
};

export default UserEmail;
