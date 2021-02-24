import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Home from './home.jsx';
import About from './about.jsx';
import ContactMe from './contactMe.jsx';

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
      if (game.y < 0) {
        collision(bullet, document.getElementById('home'));
        collision(bullet, document.getElementById('about'));
        collision(bullet, document.getElementById('contactMe'));
        keyState[32] = false;
        game.y = game.gameWindow.getBoundingClientRect().bottom + 25;
      }
      game.y -= 20;
      game.bullet.style.top = `${game.y}px`;
    }
  };

    game.y = game.gameWindow.getBoundingClientRect().bottom;
    game.position = game.gameWindow.getBoundingClientRect().right / 2
    game.bullet.style.left = `${game.gameWindow.getBoundingClientRect().right / 2 + 10}px`;
    game.player.style.left = `${game.gameWindow.getBoundingClientRect().right / 2}px`;
    game.player.style.top = `${game.gameWindow.getBoundingClientRect().bottom}px`;
    game.bullet.style.top = `${game.gameWindow.getBoundingClientRect().bottom + 15}px`;

  const gameLoop = () => {
    if ((keyState[37] || keyState[65]) && game.position > 0){
      game.move(-5);
    };
    if ((keyState[39] || keyState[68]) && game.position < game.gameWindow.getBoundingClientRect().right){
      game.move(+5);
    };
    if (keyState[32]) {
      game.shoot();
    };
    window.requestAnimationFrame(gameLoop)
    };
  gameLoop()
  }, []);

  const CurrentPage = ({currentPage}) => {
    if (currentPage === 'home') { return <Home/>; };
    if (currentPage === 'about') { return <About/> };
    if (currentPage === 'contactMe') { return <ContactMe/> };
    return <div>whoops</div>
  };
  const [ currentPage, setCurrentPage ] = useState('home');

  const changePage = (e) => {
    setCurrentPage(e.target.id)
  };

  return (
    <div>
      <GameWindow id='gameWindow'>
        <Tabs>
          <a onClick={changePage}  id='home'>Home</a>
          <a onClick={changePage} id='about'>About</a>
          <a onClick={changePage}  id='contactMe'>Contact Me</a>
        </Tabs>
        <CurrentPage currentPage={currentPage}></CurrentPage>
        <Player id='player'/>
        <Bullet id='bullet'/>
      </GameWindow>
    </div>
  )
};

const Projects = () => {
  return (
    <div>Projects</div>
  )
}

const collision = (a, b) => {
  let aB = a.getBoundingClientRect();
  let bB = b.getBoundingClientRect();
  if (aB.top < bB.bottom && aB.left >= bB.left && aB.right <= bB.right) {
    b.click();
  }
}

const GameWindow = styled.div`
  height: 500px;
  width: 65%;
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Player = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-bottom: 30px solid black;
  position: absolute;
`

const Bullet = styled.div`
  width: 2px;
  height: 10px;
  background-color: black;

  position: absolute;
`

export default App;