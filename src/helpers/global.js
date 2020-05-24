import { createGlobalStyle } from 'styled-components';
import RajdhaniLite from '../fonts/Rajdhani-Light.ttf';
import Banner from '../client/images/sprite-sumith.png';
// import RajdhaniReg from '../fonts/Rajdhani-Regular.ttf';
// import RajdhaniMed from '../fonts/Rajdhani-Medium.ttf';
// import RajdhaniSemiBold from '../fonts/Rajdhani-SemiBold.ttf';
// import RajdhaniBold from '../fonts/Rajdhani-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }


// @font-face {
//   font-family: 'rr';
//   src: url(${RajdhaniLite}) format('truetype');
//   font-weight: 300;
//   font-style: normal;
//   font-display: auto;
// }


#root {
  // width: 100%;
  max-width: 100%;
  padding: 0 50px;
  margin: 0 auto;
}

body{
  cursor: none;
}

#cursor {
  border-left: .1em solid $font;
  animation: blink .7s steps(1) infinite;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

@media only screen and (max-width: 600px) {
  #root {
    padding:0;
  }
}

  body {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    // min-height: 100vh;
    font-weight: 500;
    padding: 0;
    margin: 0;
    // font-family: 'rr' !important;
    transition: all 0.25s linear;
  }

  footer {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }

  small {
    display: block;
  }

  button {
    display: block;
  }

  a {
    color: ${({ theme }) => theme.text};
  }


  .home {
    margin-top: 50px;
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  small {
    font-size: 1rem;
  }
  .underline {
    border-bottom: 1px solid orange;
  }
  /* Homepage Half Face */
  .face {
    width: 100%;
    position: relative;
    margin: 0 auto;
    /* Show default image */
    /* Descriptions */
    /* Inline media queries */
  }
  .face .face-img {
    display: block;
    margin: 0px;
    max-width: 100%;
  }
  .face a {
    /* color: #666666; */
    text-decoration: none;
  }
  .face .coder,
  .face .designer {
    position: absolute;
    width: 40%;
    display: block;
    z-index: 10;
    height: 15%;
    margin: auto;
    top: 0;
    bottom: 0;
  }
  
  .face .designer {
    left: 0;
  }
  .face .coder {
    right: 0;
    text-align: right;
  }
  /*Send button*/
  button {
    outline: 0;
  }
  button.active {
    outline: 0;
  }
  button.send {
    border: 1px solid orange;
    color: orange;
    padding: 15px 80px;
    background: transparent;
    position: relative;
    overflow: hidden;
    transform: translateY(-50%);
  }
  button.send.active .text {
    transform: translateY(-350%) scale(0);
    transition: 0.35s cubic-bezier(0.34, -0.61, 1, 0.64);
  }
  button.active .send {
    padding: 0px 80px;
    transition: 0.4s cubic-bezier(0.35, -0.77, 0.67, 1.88);
  }
  button.send .loader {
    position: absolute;
    width: calc(0% - 4px);
    height: calc(100% - 4px);
    background-color: orange;
    left: 2px;
    top: 2px;
  }
  button.send.active .loader {
    width: calc(100% - 4px);
    transition: 1.3s ease-in-out;
    transition-delay: 0.5s;
  }
  button.send .done {
    margin-top: -20px;
    transform: translateY(300%) scale(0);
  }
  button.send.finished .done {
    transform: translateY(0%) scale(1);
    transition: 0.4s cubic-bezier(0.34, -0.61, 1, 0.64);
  }
  button.send.finished {
    padding: 15px 80px;
    transition: 0.4s cubic-bezier(0.35, -0.77, 0.67, 1.88);
  }
  
  /* .face .designer-img,
  .face .coder-img,
  .face .designer-bg,
  .face .coder-bg,
  .face .coder p,
  .face .designer p {
    display: none;
  } */
  /* @media only screen and (min-width: 321px) {
    .face .coder h1,
    .face .designer h1 {
      font-size: 26px;
      font-size: 2.6rem;
    }
  }
  @media only screen and (min-width: 376px) {
    .face .coder h1,
    .face .designer h1 {
      font-size: 30px;
      font-size: 3rem;
    }
  }
  @media only screen and (min-width: 500px) {
    .face .coder h1,
    .face .designer h1 {
      font-size: 42px;
      font-size: 4.2rem;
    }
  } */
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes flipInX {
    from {
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
      -webkit-transform: perspective(400px) rotateY(90deg);
      transform: perspective(400px) rotateY(90deg);
    }
    40% {
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      -webkit-transform: perspective(400px) rotateY(-20deg);
      transform: perspective(400px) rotateY(-20deg);
    }
    60% {
      opacity: 1;
      -webkit-transform: perspective(400px) rotateY(10deg);
      transform: perspective(400px) rotateY(10deg);
    }
    80% {
      -webkit-transform: perspective(400px) rotateY(-5deg);
      transform: perspective(400px) rotateY(5deg);
    }
    to {
      opacity: 1;
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }
  }
  @keyframes popDown {
    0% {
      transform: translateY(-100px);
    }
  }
  @keyframes slideUp {
    0% {
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideDown {
    0% {
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(-200px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(200px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes toBottomFromTop {
    49% {
      transform: translateY(100%);
    }
    50% {
      opacity: 0;
      transform: translateY(-100%);
    }
    51% {
      opacity: 1;
    }
  }
  @keyframes popIn {
    0% {
      transform: scale(0);
    }
    60% {
      opacity: 1;
      transform: scale(1.05);
    }
    80% {
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @media only screen and (min-width: 600px) {
    .face .coder h1,
    .face .designer h1 {
      font-size: 47px;
      font-size: 4.7rem;
    }
  }
  @media only screen and (min-width: 750px) {
    .face .coder,
    .face .designer {
      width: 25%;
      height: 35%;
    }
    .face .coder h1,
    .face .designer h1 {
      font-size: 45px;
      font-size: 4.5rem;
    }
    .face .coder .more,
    .face .designer .more {
      display: none;
    }
    .face .coder p,
    .face .designer p {
      display: block;
      font-size: 14px;
      font-size: 1.4rem;
      margin: 0px;
    }
  }
  @media only screen and (min-width: 860px) {
    .face .coder,
    .face .designer {
      width: 30%;
      height: 30%;
    }
    .face .coder h1,
    .face .designer h1 {
      font-size: 58px;
      font-size: 5.8rem;
    }
    .face .coder p,
    .face .designer p {
      font-size: 17px;
      font-size: 1.7rem;
    }
  }
  @media only screen and (min-width: 1024px) {
    .face .coder,
    .face .designer {
      height: 40%;
    }
    .face .coder h1,
    .face .designer h1 {
      font-size: 30px;
      font-size: 3rem;
    }
    .face .coder .more,
    .face .designer .more {
      display: inline;
    }
  }

  @media (min-width: 1920px) and (max-width: 2560px)  {
    .card {
      width: 100% !important;
    }
    .work-card {
      width: 50% !important;
    }
    .section {
      padding: 100px 30px !important;
    }
}

  @media only screen and (min-width: 1140px) {
    .mobileNav {
      display: none;
    }
    .face {
      width: 1040px;
      height: 600px;
      position: relative;
      /* Face images */
      /* Background images */
      /* Hide default image with no effects */
    }
    .designerImg,
    .coderImg {
      display: none;
    }
    .face .coder,
    .face .designer {
      width: 520px;
      height: 600px;
      top: 0px;
      position: absolute;
    }
    .face .coder .description,
    .face .designer .description {
      position: absolute;
      top: 180px;
      width: 270px;
    }
    .face .coder .arrow,
    .face .designer .arrow {
      width: 85px;
      height: 140px;
      /* background: url(./sprite.png) no-repeat; */
      display: block;
      position: absolute;
      top: 20px;
    }
    .face .coder p,
    .face .designer p {
      font-size: 14px;
      font-size: 1.4rem;
      line-height: 1.4em;
    }
    .face .coder {
      text-align: left;
      right: -200px;
    }
    .face .coder .description {
      right: 0px;
    }
    .face .coder .arrow {
      right: 0px;
      background-position: 0px -751px;
    }
    .face .designer {
      left: -200px;
    }
    .face .designer .description {
      left: 0px;
    }
    .face .designer .arrow {
      left: 0px;
      background-position: 0px -892px;
    }
    .face .designer-img,
    .face .coder-img {
      width: 420px;
      height: 600px;
      position: absolute;
      top: 0;
      background: url(${Banner}) 0 0 no-repeat;
      display: block;
      z-index: 1;
    }
    .face .designer-img {
      background-position: 0px -600px;
      left: 100px;
    }
    .face .coder-img {
      background-position: 101% 0px;
      right: 100px;
    }
    .face .designer-bg,
    .face .coder-bg {
      width: 420px;
      height: 200px;
      position: absolute;
      bottom: 0px;
      background: url(${Banner}) 0 -1300px no-repeat;
      display: block;
    }
    .face .designer-bg {
      left: 100px;
    }
    .face .coder-bg {
      right: 100px;
      background-position: 100% -1300px;
    }
    .face .face-img {
      display: none;
    }
    .face .coder h1,
    .face .designer h1 {
      font-size: 22px;
      font-size: 4.2rem;
    }
    .iconWrap {
      margin: 30px 0 0 0;
    }
    .section h1 {
      margin-bottom: 40px;
      text-align: left !important;
      font-size: 2.5rem !important
    }
    .aboutTech {
      margin: 45px 0 45px 0;
    }
    .bar {
      margin-bottom: 20px !important;
    }
    .card, .iconWrap {
      width: 100%;
      font-size: 1.3rem;
    }
    .myName {
      transform: translate3d(0px, 110%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
      transform-style: preserve-3d;
      opacity: 0;
    }
    .animated .myName {
      transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
    opacity: 1;
    }
  }
  
  /* media ends for above 1120 */
  .myName {
    border: none;
    font-size: 2rem;
    font-weight: bold;
    align-self: flex-start;
  }
  .myName small {
    color: #666;
  }
  .portfolio {
    width: 100%;
    min-height: 500px;
    padding: 20px 30px;
    border-top: 1px solid orange;
    display: flex;
    align-items: center;
    /* flex-direction: column; */
    justify-content: flex-start;
  }
  .portfolio h1 {
    text-align: center;
  }
  .icon {
    position: relative;
    margin-top: 15px;
    z-index: 10;
  }
  .iconWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .iconWrap p {
    text-align: center;
  }
  .aboutTech {
    display: flex;
    align-self: center;
    justify-content: center;
  }
  .aboutMe {
    text-align: center;
    width: 50%;
  }
  .technology {
    width: 50%;
  }
  .section {
    border-top: 1px solid orange;
    padding: 50px 30px;
    padding-bottom: 50px;
    width: 100%;
    overflow: hidden;
  }
  .section h1 {
    text-align: center;
    margin-top: 0;
    font-size: 2rem;
    border-bottom: none;
  }
  .projects {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .work-card {
    width: 50%;
  }
  .card {
    // height: 400px;
    // min-width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: #fff; */
    margin-bottom: 20px;
    position: relative;
    /* animation: popIn 1s both; */
  }
  .card a {
    width: 100%;
    height: 100%;
  }
  .cardTitle {
    position: absolute;
    background: #00000065;
    color: #fff;
    bottom: 0;
    top: 0;
    left: 0;
    height: 137px;
    margin: auto;
    width: 45%;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 20px;
    font-size: 1.2rem;
    font-weight: 500;
  }
  .inputBox {
    padding: 15px !important;
    font-size: 1rem;
    font-family: 'Rajdhani', sans-serif;
    font-weight: bold;
    outline: none;
  }
  .btn {
    transition: 1s all ease;
  }
  
  /* Contact  popDown slideDown*/
  .man {
    /* transform: translateX(-100px); */
    display: inline;
  }
  @keyframes slideMan {
    0% {
      opacity: 0;
      transform: translateX(-340px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  .animated .man {
    animation: slideMan 1s ease both;
  }
  .contact {
    padding-bottom: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .contactSection {
    padding-top: 100px;
  }
  .contactTitleMob {
    display: none;
  }
  .contactImage {
    position: relative;
  }
  .animated .contactImage h1 {
    animation: popDown 1s ease both;
  }
  
  .contactTitle {
    position: absolute;
    left: 45px;
    right: 0;
    top: 135px;
  }
  .contact form {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-left: 4%;
    margin: 0 auto;
  }
  .contact input,
  .contact textarea {
    border: 0;
    padding: 10px 12px;
    margin-bottom: 5px;
  }
  
  .hex-wrap {
    display: inline-block;
    height: 100px;
    position: relative;
    text-align: center;
    width: 100px;
  }
  
  .hexagon {
    background-color: #04c2c9;
    display: inline-block;
    height: 80%;
    width: calc(100% * 0.57735);
    svg {
      width: 40px;
    height: 100px;
    z-index: 999;
    position: absolute;
    left: 30px;
    top: -10px;
    }
  }
  
  .hexagon:before {
    background-color: inherit;
    content: '';
    height: inherit;
    position: absolute;
    right: calc((100% / 2) - ((100% * 0.57735) / 2));
    top: 0;
    transform: rotateZ(60deg);
    width: inherit;
  }
  
  .hexagon:after {
    background-color: inherit;
    content: '';
    height: inherit;
    position: absolute;
    right: calc((100% / 2) - ((100% * 0.57735) / 2));
    top: 0;
    transform: rotateZ(-60deg);
    width: inherit;
  }
  
  .aboutIcons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // flex-basis: 60%;
    // margin: 0 auto;
    width: 100%;
  }
  
  /* bar styles */
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bars-wrap {
    width: calc(100% - 15px);
  }
  .bar.fill {
    left: 0;
    position: absolute;
    top: 0;
    background-color: #00a1a7;
    opacity: 1;
    padding: 0;
  }
  @keyframes progress {
    0% {
      max-width: 0;
    }
    100% {
      max-width: 100%;
    }
  }
  .fill {
    width: 0;
    animation: progress 1.2s;
  }
  /* :not(.animated) .fill {
    width: 0 !important;
  } */
  .bar {
    align-items: center;
    justify-content: flex-end;
    background-color: #eee;
    color: #666;
    font-size: 7pt;
    height: 25px;
    margin: 0 0 12px 0;
    position: relative;
  }
  .animated .bar:nth-child(1) .fill {
    width: 90%;
    transition: 1.1s 0.4s width ease-in-out;
  }
  .animated .bar:nth-child(2) .fill {
    width: 90%;
    transition: 1.2s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(3) .fill {
    width: 80%;
    transition: 1.3s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(4) .fill {
    width: 80%;
    transition: 1.4s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(5) .fill {
    width: 50%;
    transition: 1.5s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(6) .fill {
    width: 65%;
    transition: 1.6s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(7) .fill {
    width: 40%;
    transition: 1.7s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(8) .fill {
    width: 50%;
    transition: 1.8s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(9) .fill {
    width: 60%;
    transition: 1.9s 0.2s width ease-in-out;
  }
  .animated .bar:nth-child(10) .fill {
    width: 50%;
    transition: 2s 0.2s width ease-in-out;
  }
  .bar span {
    display: none;
  }
  .bar span {
    padding: 0 15px 0 0;
    z-index: 1;
    font-size: 18px;
  }
  
  .bar .tag {
    left: 0;
    position: absolute;
    top: 0;
    background-color: #04c2c9;
    color: #fff;
    height: 100%;
    width: 110px;
    width: 100px;
    font-size: 16px;
    font-weight: bold;
  }
  /* @media screen and (min-width: 960px) { */
  .animated .slide-up {
    animation: slideUp 1s ease both;
    animation-delay: 0.3s;
  }
  .animated .slide-down {
    animation: slideDown 1s ease both;
    animation-delay: 0.5s;
  }
  .animated .slide-in-left {
    animation: slideInLeft 1s ease both;
  }
  .animated .slide-in-right {
    animation: slideInRight 1s ease both;
  }
  .animated .flip-in-x {
    animation: flipInX 1s ease both;
  }
  .animated .fade-in {
    animation: fadeIn 1s ease both;
  }
  .animated .pop-in {
    animation: popIn 1s both;
  }
  .animated .aboutMe img {
    animation: fadeIn 1.5s linear;
  }
  /* } */
  
  /* Portrait */
  @media only screen and (min-device-width: 300px) and (max-device-width: 320px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    .face {
      height: 185px;
    }
    .designerImg,
    .coderImg {
      width: 50%;
    }
    .face .designer-img,
    .face .coder-img {
      /* width: 50% !important;
      height: 185px !important;
      position: absolute;
      top: 0;
      background: url(../sprite-sumith.png) 0 0 no-repeat;
      display: block;
      background-size: 162%;
      z-index: 1; */
      display: none;
    }
    /* .face .designer-img {
      background-position: 31px -185px !important;
      left: 0 !important;
    }
    .face .coder-img {
      background-position: -129px 0;
      right: 0 !important;
    } */
    .face .designer-bg,
    .face .coder-bg {
      /* width: 50% !important;
      height: 100px !important;
      position: absolute;
      bottom: 0;
      background: url(/static/media/sprite-sumith.fd47ee2b.png) 0 0 no-repeat;
      display: block;
      background-size: 196%;
      z-index: 1; */
      display: none;
    }
    .face .designer {
      left: 15px;
    }
    .face .coder {
      right: 15px;
    }
    .face .designer,
    .face .coder {
      top: -94px;
      width: 30%;
      font-size: 70%;
    }
    /* .face .designer-bg {
      left: 0 !important;
      background-position: -14% 98% !important;
    }
    .face .coder-bg {
      right: 0 !important;
      background-position: 119% 100% !important;
    } */
  
    /* Other Sections */
    .aboutMe,
    .technology {
      animation: fadeIn 1s linear !important;
    }
    .technology {
      padding-bottom: 40px;
    }
    .aboutIcons {
      margin: 20px auto;
    }
    .aboutIcons,
    .iconWrap {
      flex-wrap: wrap;
    }
    .hexagon {
      height: 80%;
    }
    .hexagon svg {
      margin-top: 15px;
    }
    .iconWrap {
      font-size: 80%;
      width: 50%;
      height: 250px;
    }
    .aboutTech,
    .projects {
      flex-direction: column;
    }
    .aboutMe,
    .technology {
      width: 100% !important;
    }
    .technology {
      padding-bottom: 40px;
    }
    .contact {
      width: 100%;
      flex-direction: column;
    }
    .contact form {
      width: 100%;
    }
    .section {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      padding: 30px;
    }
    .section h1 {
      font-size: 1.5rem;
      margin-top: 15px;
      margin-bottom: 0;
    }
  
    /* Menu changes */
    .menu {
      display: block;
    }
    .navigation {
      display: none;
    }
    .themeTxt {
      display: none;
    }
  
    .showNav {
      display: block;
      animation: slideFromLeft 1s ease both;
    }
    .hideNav {
      display: none;
      animation: slideToLeft 1s ease both;
    }
    .projects {
      margin-bottom: 100px;
    }
    .card {
      width: 100%;
      height: unset;
    }
    .card a {
      height: unset;
    }
    .cardTitle {
      bottom: -100px;
      top: unset;
      width: 100%;
    }
    .card svg {
      width: 100%;
      height: 65%;
    }
    .contact .h1 {
      display: block;
      margin-bottom: 35px;
    }
    .contactImage {
      display: none;
    }
    .inputBox {
      width: 100%;
    }
    button.send {
      width: 100%;
    }
  }
  
  /* Portrait */
  @media only screen and (min-device-width: 375px) and (max-device-width: 425px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    .face {
      height: 240px;
    }
    .face .designer-img,
    .face .coder-img {
      /* width: 50% !important;
      height: 216px !important;
      position: absolute;
      top: 30px;
      background: url(../sprite-sumith.png) 0 0 no-repeat;
      display: block;
      background-size: 162%;
      z-index: 2; */
      display: none;
    }
    /* .face .designer-img {
      background-position: 35px -218px !important;
      left: 0 !important;
    } */
    /* .face .coder-img {
      background-position: -154px -1px;
      right: 0 !important;
    } */
    .face .designer-bg,
    .face .coder-bg {
      /* width: 50% !important;
      height: 100px !important;
      position: absolute;
      bottom: 0;
      background: url(/static/media/sprite-sumith.fd47ee2b.png) 0 0 no-repeat;
      display: block;
      background-size: 196%;
      z-index: 1; */
      display: none;
    }
  
    .designerImg,
    .coderImg {
      width: 50%;
    }
    .face .designer,
    .face .coder {
      top: -150px;
      width: 30%;
      font-size: 80%;
    }
    .face .designer h1,
    .face .coder h1 {
      font-size: 1.8rem;
    }
    .face .designer {
      left: 15px;
    }
    .face .coder {
      right: 15px;
    }
    /* .face .designer-bg {
      left: 0 !important;
      background-position: -14% 98% !important;
    }
    .face .coder-bg {
      right: 0 !important;
      background-position: 119% 100% !important;
    } */
  
    /* Other Sections */
    .aboutMe,
    .technology {
      animation: fadeIn 1s linear !important;
      padding-bottom: 40px;
    }
    .aboutIcons {
      margin: 20px auto;
    }
    .aboutIcons,
    .iconWrap {
      flex-wrap: wrap;
    }
    .hexagon {
      height: 80%;
    }
    .hexagon svg {
      margin-top: 15px;
    }
    .iconWrap {
      font-size: 80%;
      width: 50%;
      height: 240px;
    }
    .aboutTech,
    .projects {
      flex-direction: column;
    }
    .aboutMe,
    .technology {
      width: 100% !important;
    }
    .contact {
      width: 100%;
      flex-direction: column;
    }
    .contact form {
      width: 100%;
    }
    .section {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      padding: 30px;
    }
    .section h1 {
      font-size: 1.5rem;
      margin-top: 15px;
      margin-bottom: 0;
    }
  
    /* Menu changes */
    .menu {
      display: block;
    }
    .navigation {
      display: none;
    }
    .themeTxt {
      display: none;
    }
  
    .showNav {
      display: block;
      animation: slideFromLeft 1s ease both;
    }
    .hideNav {
      display: none;
      animation: slideToLeft 1s ease both;
    }
    .projects {
      margin-bottom: 100px;
    }
    .card {
      width: 100%;
      height: unset;
    }
    .card a {
      height: unset;
    }
    .cardTitle {
      bottom: -100px;
      top: unset;
      width: 100%;
    }
    .card svg {
      width: 100%;
      height: 65%;
    }
    .contactImage {
      display: none;
    }
    .contact h1 {
      display: block;
      margin-bottom: 35px;
    }
    .inputBox {
      width: 100%;
    }
    button.send {
      width: 100%;
    }
  }
  
  @media screen and (min-width: 600px) {
    .bar span {
      display: initial;
    }
  }
  @media screen and (min-width: 425px) and (max-width: 600px) {
    .header {
      padding: 0 15px;
    }
    .navigation,
    .themeTxt {
      display: none;
    }
    .aboutMe {
      width: auto;
    }
    .technology {
      width: 100% !important;
      padding-bottom: 40px;
    }
    .contact {
      width: 100%;
    }
    .contact form {
      width: 100%;
    }
    .designer .description {
      margin-left: 15px;
    }
    .coder .description {
      margin-right: 15px;
    }
    .description h1 {
      font-size: 1.6rem !important;
    }
    .description p {
      display: block !important;
      font-size: 0.7rem;
    }
    .face {
      height: 245px;
    }
    .face .designer,
    .face .coder {
      top: -126px;
      width: 30%;
    }
  
    /* Other Sections */
    .aboutIcons {
      margin: 20px auto;
    }
    .aboutIcons,
    .iconWrap {
      flex-wrap: wrap;
    }
    .iconWrap {
      font-size: 80%;
      width: 50%;
      height: 240px;
    }
    .aboutTech,
    .projects {
      flex-direction: column;
    }
    .aboutMe,
    .technology {
      width: 100% !important;
      animation: fadeIn 1s linear !important;
    }
    .contact {
      flex-direction: column;
    }
    .contact form {
      width: 100%;
    }
    .section {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      padding: 30px;
    }
    .section h1 {
      font-size: 1.5rem;
      margin-top: 15px;
      margin-bottom: 0;
    }
  
    /* Menu changes */
    .menu {
      display: block;
    }
    .navigation {
      display: none;
    }
    .designerImg,
    .coderImg {
      width: 50%;
    }
    .face .designer-img,
    .face .coder-img {
      /* width: 50% !important;
      height: 247px !important;
      position: absolute;
      top: 0;
      background: url(../sprite-sumith.png) 0 0 no-repeat;
      display: block;
      background-size: 162%;
      z-index: 1; */
      display: none;
    }
    /* .face .designer-img {
      background-position: 39px -245px !important;
      left: 0 !important;
    }
    .face .coder-img {
      background-position: -174px 0px;
      right: 0 !important;
    } */
    .face .designer-bg,
    .face .coder-bg {
      /* width: 50% !important;
      height: 135px !important;
      position: absolute;
      bottom: 0;
      background: url(/static/media/sprite-sumith.fd47ee2b.png) 0 0 no-repeat;
      display: block;
      background-size: 196%;
      z-index: 1; */
      display: none;
    }
    /* .face .designer-bg {
      left: 0 !important;
      background-position: -14% 98% !important;
    }
    .face .coder-bg {
      right: 0 !important;
      background-position: 119% 100% !important;
    } */
  
    .projects {
      margin-bottom: 100px;
    }
    .card {
      width: 100%;
      height: unset;
    }
    .card a {
      height: unset;
    }
    .cardTitle {
      bottom: -100px;
      top: unset;
      width: 100%;
    }
    .card svg {
      width: 100%;
      height: 65%;
    }
    .contactImage {
      display: none;
    }
    .contact h1 {
      display: block;
      margin-bottom: 35px;
    }
    .inputBox {
      width: 100%;
    }
    button.send {
      width: 100%;
    }
  }
  
  @keyframes slideFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-340px);
    }
    100% {
      opacity: 1;
      transform: translateX(340px);
    }
  }
  @keyframes slideToLeft {
    1000% {
      opacity: 1;
      transform: translateX(-340px);
    }
    0% {
      opacity: 0;
      transform: translateX(340px);
    }
  }
  
  .light {
    fill: #444;
  }
  
  .dark {
    fill: #fff;
  }
  
  .logoLight {
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-miterlimit: 10;
  }
  
  .logoDark {
    fill: none;
    stroke: #444;
    stroke-width: 2;
    stroke-miterlimit: 10;
  }
  .showTilt {
    display: none;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    .showTilt {
      position: fixed;
      height: 100%;
      width: 100%;
      background: #eee;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 99999;
      color: #444;
    }
  }
  
  .fade-in-section {
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 1200ms ease-out, transform 600ms ease-out, visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
  }
  .animated .fade-in-section {
    opacity: 1;
    transform: none;
    visibility: visible;
  }
  
  .animated .card:nth-child(1) {
    transition-delay: 0.1s;
  }
  .animated .card:nth-child(2) {
    transition-delay: 0.2s;
  }
  .animated .card:nth-child(3) {
    transition-delay: 0.3s;
  }
  
  /* .cardTitle {
    position: absolute;
    background: #000000b5;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
    font-weight: bold;
  } */
  .menuWrap {
    z-index: 2;
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    animation: fadeIn 2s linear;
  }
  .contactImage {
    width: 50%;
    height: 100%;
  }
  .pageContainer {
    display: flex;
    flex-direction: column;
  }
  .hotelImageBg {
    transition: 1s all ease;
    .phone .cls-8, .phone .cls-9, .phone .cls-10 {
      transform: translate(-20px -20px);
      transition: 1.2s all ease;
    }
    &.hovered {
      .phone .cls-8, .phone .cls-9, .phone .cls-10 {
        // transform: translate(20px 20px);
        transform: rotate(6deg) !important;
        transform-origin: top !important;
      }
    }
  }

  .sectionTitle {
    // position: absolute;
    font-size: 10rem;
    font-weight: bold;
    color: #000;
    opacity: .1;
    line-height: .7;
    // z-index: 1;
}
.skillSet {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.coderSkills {
  .fab {
    font-size: 4rem;
    margin-right: 25px;
  }
}


/* Float Shadow */
.hvr-float-shadow {
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-float-shadow:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  /* W3C */
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, opacity;
  transition-property: transform, opacity;
}
.hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  /* move the element up by 5px */
}
.hvr-float-shadow:hover:before, .hvr-float-shadow:focus:before, .hvr-float-shadow:active:before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */
}

//Cursor
.cursor {
  width: 20px;
  height: 20px;
  border: 1px solid orange;
  border-radius: 50%;
  position: absolute;
  transition-duration: 100ms;
  transition-timing-function: ease-out;
  animation: cursorAnim .5s infinite alternate;
  pointer-events: none;
}

.cursor::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  border: 8px solid orange;
  border-radius: 50%;
  opacity: .5;
  top: -1px;
  left: -1px;
  animation: cursorAnim2 .5s infinite alternate;
}

@keyframes cursorAnim {
  from {
      transform: scale(1);
  }
  to {
      transform: scale(.7);
  }
}

@keyframes cursorAnim2 {
  from {
      transform: scale(1);
  }
  to {
      transform: scale(.4);
  }
}

@keyframes cursorAnim3 {
  0% {
      transform: scale(1);
  }
  50% {
      transform: scale(3);
  }
  100% {
      transform: scale(1);
      opacity: 0;
  }
}

.expand {
  animation: cursorAnim3 .5s forwards;
  border: 1px solid red;
}
a:hover {
  cursor: none;
}

`;
