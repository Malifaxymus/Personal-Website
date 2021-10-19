import React from 'react';
import styled from 'styled-components';

const ContactMe = () => {
  return (
    <ContactDiv>
      <List>
        <li>
          maxymus.ross@gmail.com
        </li>
        <li>
          <ContactAnchor href="https://www.linkedin.com/in/maximus-ross/">LinkedIn</ContactAnchor>
        </li>
        <li>
          <ContactAnchor href="https://github.com/Malifaxymus">GitHub</ContactAnchor>
        </li>
      </List>
    </ContactDiv>
  )
}

const ContactDiv = styled.div`
  margin: 1em;
  font-size: 200%;
`
const ContactAnchor = styled.a`
  color: black;
`
const List = styled.ul`
  list-style-type: square;
`

export default ContactMe;