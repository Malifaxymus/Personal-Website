import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeStyle>use the arrow keys!</HomeStyle>
  )
};

const HomeStyle = styled.div`
  margin: 1em;
  text-align: center;
  font-size: 200%
`

export default Home;