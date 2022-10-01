import React from 'react';
import { styled, Typography } from '@mui/material';
import { ReactComponent as HandClick } from '../images/hand_click.svg';

const Wrapper = styled('div')({
  paddingBlock: 100,

  width: '100vw',
  height: '100vh',

  display: 'flex',
  justifyContent: 'center',

  background: '#131313',
  color: 'white',
});

const ContentWrapper = styled('div')({
  width: 980,
});

const Header = styled('header')({
  marginBottom: 54,

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const TypographyHeaderLeft = styled(Typography)({
  padding: 7,

  fontWeight: 500,
  fontSize: 12,
  lineHeight: '112.68%',
  textTransform: 'uppercase',

  border: '1px solid #FFF',
});

const TypographyHeaderRight = styled(Typography)({
  width: 150,

  display: 'flex',
  alignItems: 'center',
  gap: 10,

  fontWeight: 600,
  fontSize: 12,
  lineHeight: '100%',

  '& svg': {
    width: '25%',
  },
});

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Header>
          <TypographyHeaderLeft>Покемоны API</TypographyHeaderLeft>
          <TypographyHeaderRight>
            <HandClick />
            Нажмите на нужного Покемона
          </TypographyHeaderRight>
        </Header>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Layout;
