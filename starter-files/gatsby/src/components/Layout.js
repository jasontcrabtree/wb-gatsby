import React from 'react';
import 'normalize.css';

import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Nav from './Nav';
import Footer from './Footer';
import stripes from '../assets/images/stripes.svg';

const ContentStyles = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 2rem;
`;

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background: white url(${stripes});
  background-size: 80em;
  padding: 5px;
  padding: clamp(5 px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.096);
  border: 5px solid white;
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <SiteBorderStyles>
      <ContentStyles>
        <Nav />
        {children}
        <Footer />
      </ContentStyles>
    </SiteBorderStyles>
  </>
);

export default Layout;
