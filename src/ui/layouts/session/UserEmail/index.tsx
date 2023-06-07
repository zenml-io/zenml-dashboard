import React, { useState, useEffect } from 'react';
import {
  H2,
  Paragraph,
  Container,
  FlexBox,
  Box,
  EaseInBox,
  Image,
  FullWidthSpinner,
  InnerTextLink,
} from '../../../components';
import { Form } from './Form';

import styles from './index.module.scss';
import image from '../imageNew.png';

import { getTranslateByScope } from '../../../../services';
import { routePaths } from '../../../../routes/routePaths';
import { sessionSelectors } from '../../../../redux/selectors';
import { useDispatch, usePushRoute, useSelector } from '../../../hooks';
// import { loggedInRoute } from '../../../../constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { stackComponentsActions } from '../../../../redux/actions';
import { loggedInRoute } from '../../../../constants';

const UserEmail: React.FC = () => {
  const translate = getTranslateByScope('ui.layouts.UserEmail');
  const { push } = usePushRoute();
  const dispatch = useDispatch();
  const authToken = useSelector(sessionSelectors.authenticationToken);

  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    const getUser = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/current-user`, {
          headers: {
            Authorization: `bearer ${authToken}`,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data) {
            if (data?.email_opted_in !== null) {
              dispatch(stackComponentsActions.getTypes());
              push(loggedInRoute);
            }
          }
          setPageLoading(false);
        });
    };
    getUser();

    // eslint-disable-next-line
  }, []);

  if (pageLoading) {
    return <FullWidthSpinner color="black" size="md" />;
  }

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
            <Box marginTop="xl" marginBottom="lg">
              <Box paddingBottom="md" style={{ textAlign: 'center' }}>
                <H2 bold color="white">
                  {translate('title')}
                </H2>
              </Box>
              <Box className={styles.pageContentBox}>
                <Paragraph color="grey">{translate('subtitle1')}</Paragraph>
              </Box>
              <Box marginTop="md" className={styles.pageContentBox}>
                <Paragraph color="grey">
                  {translate('subtitle2-1')}&nbsp;
                  <InnerTextLink
                    text={'Click Here'}
                    href={
                      'https://docs.zenml.io/user-guide/advanced-guide/global-settings-of-zenml#usage-analytics'
                    }
                  />
                  &nbsp;{translate('subtitle2-2')}
                </Paragraph>
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
