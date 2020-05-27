import React, { useEffect, useState } from 'react';
// import './index.css';
import Portrait from '../components/svgComponents/portrait';
import { useRef } from 'react';
import Speed from '../components/svgComponents/Speed';
import Responsive from '../components/svgComponents/Responsive';
import Intutive from '../components/svgComponents/Intutive';
import Dynamic from '../components/svgComponents/Dynamic';
import { Helmet } from 'react-helmet';
import ScrollTopArrow from '../components/ScrollTopArrow';
import Toggle from '../components/Toggle';
import styled from 'styled-components';
import Facebook from '../components/svgComponents/fb';
import Instagram from '../components/svgComponents/instagram';
import LinkedIn from '../components/svgComponents/linkedIn';
import Logo from '../components/svgComponents/logo';
import HotelBg from '../components/svgComponents/HotelBg';
import Contact from '../components/svgComponents/contact';
import { connect } from 'react-redux';
import Typer from '../components/typer';
// import css from './index.css';
import Input from '../components/input';

import Macbook from '../images/macbook.png';
import TopLeft from '../images/topLeft.png';
import TopRight from '../images/topRight.png';
import BottomLeft from '../images/bottomLeft.png';
import BottomRight from '../images/bottomRight.png';

import Ipad from '../images/iPad.png';
import Mac from '../images/mac.png';
import Iphone from '../images/iPhone.png';

import { ThemeProvider } from 'styled-components';
import { useDarkMode } from '../../helpers/useDarkMode';
import { lightTheme, darkTheme } from '../../helpers/theme';
import { GlobalStyles } from '../../helpers/global';
import FaceLeft from '../components/faceLeft';
import FaceRight from '../components/faceRight';
import ProfileImg from '../components/profileImg';

const Header = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: ${(props) => (props.theme === 'light' ? '#d0d0d0' : '#2e2e2f')};
  // background: transparent;
  transition: all 0.25s linear;
  @media (max-width: 600px) {
    padding: 0 15px;
  }
`;

const Button = styled.button`
  border: 2px solid orange;
  color: orange;
  padding: 10px 20px;
  font-size: 1rem;
  background: orange;
  width: fit-content;
  align-self: flex-end;
  font-family: 'rsb';
  cursor: pointer;
  outline: none;
  margin-top: 30px;
  transition: 0.5s all ease;

  .loader {
    position: absolute;
    width: calc(0% - 4px);
    height: calc(100% - 4px);
    background-color: orange;
    left: 2px;
    top: 2px;
  }
  &.active .loader {
    width: calc(100% - 4px);
    transition: 1.3s ease-in-out;
    transition-delay: 0.5s;
  }
  &.active .send {
    padding: 0px 80px;
    transition: 0.4s cubic-bezier(0.35, -0.77, 0.67, 1.88);
  }
  &.active .text {
    transform: translateY(-350%) scale(0);
    transition: 0.35s cubic-bezier(0.34, -0.61, 1, 0.64);
  }
  &.active .done {
    color: #fff;
    margin-top: -20px;
    transform: translateY(300%) scale(0);
  }
  &.finished .done {
    transform: translateY(0%) scale(1);
    transition: 0.4s cubic-bezier(0.34, -0.61, 1, 0.64);
  }
  &.finished {
    padding: 15px 80px;
    transition: 0.4s cubic-bezier(0.35, -0.77, 0.67, 1.88);
  }
`;

const ButtonOutline = styled.div`
  border: 2px solid orange;
  color: orange;
  padding: 10px 20px;
  font-size: 1rem;
  width: fit-content;
  margin-top: 30px;
  font-family: rb;
`;

const Footer = styled.div`
  padding: 20px 30px;
  background: #00000052;
  position: relative;
  margin-left: -50px;
  margin-right: -50px;
  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 10px;
    text-align: center;
    margin: 0;
  }
`;
const FooterTop = styled.div`
  right: 0;
  width: 70px;
  margin: 0 auto;
  left: 0;
  height: 0;
  border: 40px solid transparent;
  border-bottom: 40px solid #00000052;
  position: relative;
  top: -80px;
  position: absolute;
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    height: 30px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    &:hover {
      opacity: 1;
    }
    svg {
      margin-right: 10px;
    }
  }
`;

const Nav = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  div {
    cursor: pointer;
    margin-right: 5px;
    text-decoration: none;
    font-family: 'rsb';
    font-size: 19px;
    margin-top: 5px;
    margin-left: 15px;
    border: 2px solid transparent;
    &:hover {
      transition: all 0.25s linear;
      border-bottom: 2px solid orange;
    }
    &:active {
      border-bottom: 1px solid #000;
    }
  }
`;

const StyledMenu = styled.nav`
  @media (min-width: 600px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: left;
  position: absolute;
  top: 48px;
  left: 0;
  box-shadow: ${({ open }) => (open ? '1px 3px 5px 0px rgba(102, 102, 102, 1)' : 'none')};
  transition: transform 0.3s ease-in-out;
  div {
    padding: 15px;
    font-family: 'rb';
  }
  background: #000000b5;
  width: 100%;
  .menuWrap {
    @media (max-width: 576px) {
      width: 50%;
      height: 100%;
      background: ${(props) => (props.theme === 'dark' ? '#565656' : '#fff')};
    }
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-family: 'rb';
    letter-spacing: 0.5rem;
    color: #0d0c1d;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`;

const StyledBurger = styled.button`
  @media (min-width: 600px) {
    display: none;
  }
  position: absolute;
  top: 25%;
  left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 2px;
    background: ${({ theme }) => (theme === 'light' ? '#444' : '#fff')};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = ({ open, setOpen, theme }) => {
  return (
    <StyledBurger theme={theme} open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const options = {
      rootMargin: '-25% 0px',
    };
    let refNode = domRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }, options);
    observer.observe(refNode);
    return () => observer.disconnect(refNode);
  }, [isVisible]);
  return (
    <div className={`${isVisible ? 'animated' : ''}`} ref={domRef}>
      {props.children}
    </div>
  );
}

const head = () => {
  return (
    <Helmet key={Math.random()}>
      <title>{`findsumith.com`}</title>
      <meta property="og:title" content={`Portfolio`} />
      <meta name="description" content={`Sumith's portfolio`} />
      <meta name="robots" content="index, follow" />
      <link
        rel="canonical"
        href={`https://agile-retreat-19126.herokuapp.com${location.pathname}`}
      />
    </Helmet>
  );
};

const Feature = ({ title, desc, children }) => {
  return (
    <div className="iconWrap">
      <div className="hex-wrap flip-in-x">
        <div className="hexagon">{children}</div>
      </div>
      <h2 className="fade-in">{title}</h2>
      <p className="fade-in">{desc}</p>
    </div>
  );
};

const Bars = ({ title, perc }) => {
  return (
    <div className="bar flex">
      <div className="bar fill">
        <div className="tag bold flex-center">{title}</div>
      </div>
      <span>{perc}</span>
    </div>
  );
};

const HomePage = () => {
  //For theme
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const node = React.useRef();
  const submitBtnRef = useRef();
  const designerImgRef = useRef();
  const coderImgRef = useRef();
  let navRef = useRef(null);
  let homeRef = useRef(null);
  let protfolioRef = useRef(null);
  let projectRef = useRef(null);
  let contactRef = useRef(null);

  useEffect(() => {
    console.log('mounted');
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
      cursor.setAttribute(
        'style',
        'top: ' + (e.pageY - 10) + 'px; left: ' + (e.pageX - 10) + 'px;'
      );
    });
    document.addEventListener('click', () => {
      cursor.classList.add('expand');

      setTimeout(() => {
        cursor.classList.remove('expand');
      }, 500);
    });
  }, []);

  const handleInputChange = (e) => {
    let input = e.target.name;
    if (input === 'name') {
      setName(e.target.value);
    } else if (input === 'email') {
      setEmail(e.target.value);
    } else if (input === 'message') {
      setMessage(e.target.value);
    }
    if (name && email && message) {
      setError(false);
    }
  };

  const handleSubmit = () => {
    let btn = submitBtnRef.current;
    if (!name || !email || !message) {
      setError(true);
      return;
    }
    console.log(btn);
    btn.classList.add('active');
    setTimeout(() => {
      btn.classList.add('finished');
    }, 1700);
    setTimeout(() => {
      btn.classList.remove('active');
      btn.classList.remove('finished');
    }, 4000);
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleAnchor = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };

  const onMouseMove = (e) => {
    setMouseX(e.offsetX);
    setMouseY(e.offsetY);
  };

  const onImgOver = (e) => {
    // console.log(e);
    // designerImgRef.current.style.width = mouseX;
  };

  if (!componentMounted) {
    return <div />;
  }
  return (
    <ThemeProvider theme={themeMode}>
      {head()}
      <div onMouseMove={(e) => onMouseMove(e)}>
        <GlobalStyles />
        <div className="showTilt">
          <Portrait />
          <div>Please Rotate your phone</div>
        </div>
        <Header theme={theme} className="header">
          <div ref={node} className="mobileNav">
            <Burger open={open} setOpen={setOpen} theme={theme} />
            <StyledMenu open={open} theme={theme}>
              <div className="menuWrap">
                <div onClick={() => handleAnchor(homeRef)}>HOME</div>
                <div onClick={() => handleAnchor(protfolioRef)}>ABOUT</div>
                <div onClick={() => handleAnchor(projectRef)}>PORTFOLIO</div>
                <div onClick={() => handleAnchor(contactRef)}>CONTACT</div>
              </div>
              <div className="overlay" onClick={() => setOpen(false)} />
            </StyledMenu>
            <Logo theme={theme} style={{ marginLeft: '45px', marginTop: '5px' }} />
          </div>
          <Nav theme={theme} className="navigation" ref={navRef}>
            <Logo theme={theme} />
            <div onClick={() => handleAnchor(homeRef)}>HOME</div>
            <div onClick={() => handleAnchor(protfolioRef)}>ABOUT</div>
            <div onClick={() => handleAnchor(projectRef)}>PORTFOLIO</div>
            <div onClick={() => handleAnchor(contactRef)}>CONTACT</div>
          </Nav>
          <Social>
            <a href="https://www.facebook.com/sumithkk/">
              <Facebook theme={theme} />
            </a>
            <a href="https://www.instagram.com/sumith_kk/">
              <Instagram theme={theme} />
            </a>
            <a href="https://www.linkedin.com/in/sumith-kk-87a77077/">
              <LinkedIn theme={theme} />
            </a>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </Social>
        </Header>
        <div className="home" id="content container">
          <FadeInSection>
            <section id="section" className="face" ref={homeRef}>
              <div id="designer" className="designer" style={{ opacity: 1 }}>
                <div id="designer-desc" className="description" style={{ opacity: 1 }}>
                  <h1>designer</h1>
                  <p>
                    UI/UX Designer with a passion for designing beautiful and functional user
                    experiences.
                  </p>
                </div>
              </div>
              <div id="coder" className="coder" style={{ opacity: 1 }}>
                <div
                  id="coder-desc"
                  className="description"
                  style={{ opacity: 1, textAlign: 'right' }}
                >
                  <h1>&lt;coder&gt;</h1>
                  <p>
                    Front End Engineer who focuses on writing clean, elegant and efficient code.
                  </p>
                </div>
              </div>
              <div
                id="designer-img"
                className={`designer-img slide-in-left`}
                ref={designerImgRef}
                style={{ left: '100px', opacity: 1, width: '420px' }}
              ></div>
              <div
                id="coder-img"
                className={`coder-img slide-in-right`}
                ref={coderImgRef}
                style={{ right: '100px', opacity: 1, width: '420px' }}
              ></div>
              <FaceLeft />
              <FaceRight />
              <div
                id="designer-bg"
                className={`designer-bg slide-in-left`}
                style={{ left: '100px', opacity: 1 }}
              ></div>
              <div
                id="coder-bg"
                className={`coder-bg slide-in-right`}
                style={{ right: '100px', opacity: 1 }}
              ></div>
            </section>
          </FadeInSection>
          <FadeInSection>
            <section className="section portfolio" id="about">
              <div className="aboutIcons">
                <Feature
                  title="Fast"
                  desc="Fast load times and lag free interaction, my highest priority."
                >
                  <Speed height="45px" width="45px" className="icon" />
                </Feature>
                <Feature
                  title="Responsive"
                  desc="My layouts will work on any device, big or small. It is responsive."
                >
                  <Responsive height="45px" className="icon" width="45px" />
                </Feature>
                <Feature
                  title="Intuitive"
                  desc="Strong preference for easy to use, intuitive UX/UI, that users will love."
                >
                  <Intutive height="45px" className="icon" width="45px" />
                </Feature>
                <Feature
                  title="Dynamic"
                  desc="Websites don't have to be static, I love making pages come to life."
                >
                  <Dynamic height="45px" width="45px" className="icon" />
                </Feature>
              </div>
            </section>
          </FadeInSection>
          <FadeInSection>
            <div className="flex" style={{ flexDirection: 'column' }} ref={protfolioRef}>
              {/* <h1 >
                a Little <span className="underline">ABOUT</span> Me !
              </h1> */}
              <div className="aboutTech section">
                {/* <h1 className="contactTitleMob">
                  Lets <span className="underline">Talk</span> !
                </h1> */}
                <div className="aboutInfo">
                  <div className="myName" style={{ border: 'none' }}>
                    Hi My Name is <span style={{ color: 'orange' }}>Sumith</span>
                    <Typer
                      dataText={[
                        'Websites.',
                        'Webapps.',
                        'Motion.',
                        'Micro interactions.',
                        'things.',
                      ]}
                    />
                  </div>
                  <p className="fade-in" style={{ fontSize: '19px' }}>
                    I'm a Front-End Engineer from Kannur in Kerala. I have serious passion for UI
                    effects, animations and creating intuitive, dynamic user experiences. Let's make
                    something special.
                  </p>
                  <div className="sectionTitle" style={{ position: 'absolute', bottom: '-35px' }}>
                    ABOUT
                  </div>
                </div>
                <div className="aboutMe">
                  <ProfileImg />
                </div>
              </div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <section
              className="section skills"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div className="technology">
                <div style={{ display: 'block' }} className="flex flex-50-gt-sm bars-wrap">
                  <Bars title="CSS" perc="90%" />
                  <Bars title="React" perc="90%" />
                  <Bars title="JavaScript" perc="80%" />
                  <Bars title="Angular" perc="80%" />
                  <Bars title="Node.js" perc="65%" />
                  <Bars title="MySql" perc="40%" />
                  <Bars title="UI Design" perc="50%" />
                  <Bars title="Photoshop" perc="60%" />
                  <Bars title="Illustrator" perc="50%" />
                </div>
              </div>
              <div className="skillSet">
                <div className="coderSkills">
                  <div className="ps-about-card">
                    <img className="card" src={Macbook} alt="" />
                    <img className="elements elements-top-left" src={TopLeft} alt="" />
                    <img className="elements elements-top-right" src={TopRight} alt="" />
                    <img className="elements elements-bottom-left" src={BottomLeft} alt="" />
                    <img className="elements elements-bottom-right" src={BottomRight} alt="" />
                  </div>
                </div>

                <div className="sectionTitle">SKILLS</div>
              </div>
            </section>
          </FadeInSection>
          <FadeInSection>
            <section className="section" ref={projectRef}>
              <h1>
                Some of the <span className="underline">Things</span> I've Built
              </h1>
              <div className="projects">
                <div style={{ alignSelf: 'flex-start' }}>
                  <h2
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: '50px',
                      fontSize: '2.2rem',
                      color: 'orange',
                    }}
                  >
                    Hotel Listing
                  </h2>
                  <p style={{ opacity: '0.5', fontSize: '1.2rem' }}>
                    React | Redux | Node | Express | Styled-Components | Rapid api
                  </p>
                  <div className="cardTitle">
                    A web app for Searching and booking hotels around the world. Used Intersection
                    api for infinite scrolling, micro-interactions and smooth scrolling. All
                    elements are custom build [ No thirdparty libraries used ]. For data I used
                    Rapid api. This app is build with react, styled-components and postcss as
                    frontend; node and express as backend.
                    <ButtonOutline>
                      <a href="/hotels/new">Explore</a>
                    </ButtonOutline>
                  </div>
                  <div className="sectionTitle" style={{ position: 'absolute', bottom: '-50px' }}>
                    WORKS
                  </div>
                </div>
                <div className="work-card fade-in-section">
                  {/* <a href="/works/hotels"> */}
                  {/* <HotelBg theme={theme} /> */}
                  <div className="works">
                    <img className="device" src={Ipad} alt="" />
                    <img className="device" src={Mac} alt="" />
                    <img className="device" src={Iphone} alt="" />
                  </div>
                  {/* </a> */}
                </div>
              </div>
            </section>
          </FadeInSection>
          <FadeInSection>
            <section
              className="section contactSection"
              ref={contactRef}
              style={{ position: 'relative' }}
            >
              <div className="contact">
                <h1 className="contactTitleMob">
                  Lets <span className="underline">Talk</span> !
                </h1>
                <div className="contactImage">
                  <h1
                    className="contactTitle"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '135px',
                      margin: '0 auto',
                      width: 'fit-content',
                    }}
                  >
                    Lets <span className="underline">Talk</span> !
                  </h1>
                  <Contact theme={theme} width="75%" height="100%" />
                </div>
                <form>
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                  />

                  <Input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => handleInputChange(e)}
                  />

                  <textarea
                    className="inputBox"
                    type="text"
                    value={message}
                    onChange={(e) => handleInputChange(e)}
                    style={{ background: `${theme === 'light' ? '#fff' : '#00000060'}` }}
                    name="message"
                    placeholder="Your message"
                  />
                  {error && <div style={{ color: 'red' }}>Please fill the Fields</div>}
                  <Button
                    className="send"
                    type="button"
                    ref={submitBtnRef}
                    onClick={() => handleSubmit()}
                  >
                    {' '}
                    <div className="text">SEND</div>
                    <div className="loader"></div>
                    <div className="done">SUCCESS</div>
                  </Button>
                  <div
                    className="sectionTitle"
                    style={{ position: 'absolute', bottom: '65px', right: '25px' }}
                  >
                    CONTACT
                  </div>
                </form>
              </div>
              {/* <ScrollTopArrow /> */}
            </section>
          </FadeInSection>
        </div>
        <Footer>
          <FooterTop />© 2020 Sumith kk - [ Designed and Developed By Sumith ]
        </Footer>
      </div>
    </ThemeProvider>
  );
};

export default {
  component: connect()(HomePage),
};
