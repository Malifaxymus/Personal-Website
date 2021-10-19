import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Home from './home.jsx';
import About from './about.jsx';
import ContactMe from './contactMe.jsx';
import bannerLogo from '../assets/ArcadeTop.svg';
import arcadeBottom from '../assets/arcadeBottom.svg';
import GlobalFonts from '../fonts/fonts';

const App = (props) => {

  var keyState = {};
  window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
  });
  window.addEventListener('keyup',function(e){
    if (e.keyCode !== 32) {
      keyState[e.keyCode || e.which] = false;
    }
  });
  useEffect(() => {
  let game = {
    gameWindow: document.getElementById('gameWindow'),
    player: document.getElementById('player'),
    bullet: document.getElementById('bullet'),
    position: 0,
    y: 0,
    move: (dir) => {
      game.position += dir;
      player.style.left = `${game.position}px`;
      bullet.style.left = `${game.position + 10}px`;
    },
    shoot: () => {
      if (game.y < 0 || collision(bullet, document.getElementById('home')) || collision(bullet, document.getElementById('about')) || collision(bullet, document.getElementById('contactMe'))) {
        keyState[32] = false;
        game.y = game.gameWindow.getBoundingClientRect().bottom - 15;
        game.bullet.style.top = `${game.y}px`;
        return;
      }
      game.y -= 20;
      game.bullet.style.top = `${game.y}px`;
    }
  };

  const startPosition = () => {
    game.gameWindow = document.getElementById('gameWindow');
    game.y = game.gameWindow.getBoundingClientRect().bottom;
    game.position = game.gameWindow.getBoundingClientRect().right / 2;
    game.bullet.style.left = `${game.gameWindow.getBoundingClientRect().right / 2 + 10}px`;
    game.player.style.left = `${game.gameWindow.getBoundingClientRect().right / 2}px`;
    game.player.style.top = `${game.gameWindow.getBoundingClientRect().bottom - 35}px`;
    game.bullet.style.top = `${game.gameWindow.getBoundingClientRect().bottom - 15}px`;
  }
  startPosition()

  const gameLoop = () => {
    if ((keyState[37] || keyState[65]) && game.position > game.gameWindow.getBoundingClientRect().left){
      game.move(-5);
    };
    if ((keyState[39] || keyState[68]) && game.position < game.gameWindow.getBoundingClientRect().right - 20){
      game.move(+5);
    };
    if (keyState[32]) {
      game.shoot();
    };
    window.requestAnimationFrame(gameLoop)
    };
  gameLoop()
  window.addEventListener('resize', x => {
    updateDimensions()
    startPosition()
  })
  }, []);

  const CurrentPage = ({currentPage}) => {
    if (currentPage === 'home') { return <Home/>; };
    if (currentPage === 'about') { return <About/> };
    if (currentPage === 'contactMe') { return <ContactMe/> };
    return <div>whoops</div>
  };

  const updateDimensions = () => {
    setWidth(document.getElementById('app').clientWidth)
    setHeight(document.getElementById('app').clientHeight)
  }

  const changePage = (e) => {
    setCurrentPage(e.target.id)
  };

  const [ currentPage, setCurrentPage ] = useState('home');
  const [height, setHeight] = useState(document.getElementById('app').clientHeight);
  const [width, setWidth] = useState(document.getElementById('app').clientWidth);



  return (
    <Container height={height} width={width} updateDimensions={updateDimensions}>
      <GlobalFonts />
      <ArcadeTop/>
      <GameWindow id='gameWindow' height={height}>
        <Tabs>
          <Button onClick={changePage}  id='home'>Home</Button>
          <Button onClick={changePage} id='about'>About</Button>
          <Button onClick={changePage}  id='contactMe'>Contact</Button>
        </Tabs>
        <CurrentPage currentPage={currentPage}></CurrentPage>
        <Player id='player'/>
        <Bullet id='bullet'/>
      </GameWindow>
      <ArcadeBottom/>
    </Container>
  )
};

const collision = (a, b) => {
  let aB = a.getBoundingClientRect();
  let bB = b.getBoundingClientRect();
  if (aB.top < bB.bottom && aB.left >= bB.left && aB.right <= bB.right) {
    b.click();
    return true;
  }
}

const ArcadeTop = styled.div`
  grid-row: 1 / 1;
  grid-column: 2 / 2;
  height: 100%;
  width: 100%;
  background-image: url(${bannerLogo});
  background-size: contain;
  align-self: center;
  border-radius: 8% 8% 0 0;

  @media (max-aspect-ratio: 6/10) {
    grid-column: 1 / 1;
  }
`

const ArcadeBottom = styled.div`
  grid-row: 3 / 3;
  grid-column: 2 / 2;
  height: 100%;
  width: 100%;
  background-image: url(${arcadeBottom});
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;

  @media (max-aspect-ratio: 6/10) {
    grid-column: 1 / 1;
  }
`

const Container = styled.div`
  height: 100%;
  min-width: 100%;
  display: grid;
  grid-template-rows: ${props => props.height * .15}px ${props => props.height * .6}px 1fr;
  grid-template-columns: 1fr ${props => props.height * .6}px 1fr;
  align-self: center;
  font-size: ${props => props.height * .02}px;
  background: black;
  font-family: 'Arcade';

  @media (max-aspect-ratio: 6/10) {
    grid-template-rows: ${props => props.width * .24}px ${props => props.width}px 1fr;
    grid-template-columns: 100%;
  }
`

const GameWindow = styled.div`
  grid-row: 2 / 2;
  grid-column: 2 / 2;
  min-height: 100%;
  align-self: center;
  border-left: ${props => props.height * .02}px solid black;
  border-right: ${props => props.height * .02}px solid black;
  border-image: linear-gradient(to bottom,#111111,#5c5c5c,#5a5a5a) 1 100%;
  background: linear-gradient(0deg, #e4e4e4 75%, #a7a7a7 80%);
  background-clip: content-box;
  border-radius: 15%;


  @media (max-aspect-ratio: 6/10) {
    grid-column: 1 / 1;
  }
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 8%;
  width: 100%;
  /* justify-content: space-evenly; */

`

const Player = styled.div`
  width: 0;
  height: 0;
  border-left: .5em solid transparent;
  border-right: .5em solid transparent;

  border-bottom: 1.5em solid black;
  position: absolute;
`

const Bullet = styled.div`
  width: .1em;
  height: .3em;
  background-color: black;

  position: absolute;
`

const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 200%;
  height: 100%;
  font-family: 'Arcade';
`

export default App;