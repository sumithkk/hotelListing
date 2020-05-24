import React from 'react';

function Cursor() {
  const cursorDotOutline = React.useRef();
  const cursorDot = React.useRef();
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  let [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  let cursorVisible = React.useState(false);
  let cursorEnlarged = React.useState(false);

  /**
   * Mouse Moves
   */
  const onMouseMove = (event) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
  };
  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };
  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };
  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };
  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };
  const onResize = (event) => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  /**
   * Hooks
   */
  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    requestRef.current = requestAnimationFrame(animateDotOutline);

    // Handle Link Hovers
    handleLinkHovers();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  let { x, y } = mousePosition;
  const winDimensions = { width, height };
  let endX = winDimensions.width / 2;
  let endY = winDimensions.height / 2;

  /**
   * Position Dot (cursor)
   * @param {event}
   */
  function positionDot(e) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    // Position the dot
    endX = e.pageX;
    endY = e.pageY;
    cursorDot.current.style.top = endY + 'px';
    cursorDot.current.style.left = endX + 'px';
  }

  /**
   * Toggle Cursor Visiblity
   */
  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      cursorDot.current.style.opacity = 1;
      cursorDotOutline.current.style.opacity = 1;
    } else {
      cursorDot.current.style.opacity = 0;
      cursorDotOutline.current.style.opacity = 0;
    }
  }

  /**
   * Toggle Cursor Size
   */
  function toggleCursorSize() {
    if (cursorEnlarged.current) {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursorDotOutline.current.style.transform = 'translate(-50%, -50%) scale(5)';
    } else {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  }

  /**
   * Handle LInks
   * Applies mouseover/out hooks on all links
   * to trigger cursor animation
   */
  function handleLinkHovers() {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener('mouseout', () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });
  }

  /**
   * Animate Dot Outline
   * Aniamtes cursor outline with trailing effect.
   * @param {number} time
   */
  const animateDotOutline = (time) => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 8;
      y += (endY - y) / 8;
      cursorDotOutline.current.style.top = y + 'px';
      cursorDotOutline.current.style.left = x + 'px';
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot" />
    </>
  );
}

export default Cursor;
// function App() {
//   return (
//     <div className="App">
//       <Cursor />
//       <section>
//         <h1>
//           Animated Cursor <br />
//           React Component
//         </h1>
//         <hr />
//         <p>
//           An animated cursor component made as a <a>Functional Component</a>, using{' '}
//           <a>React hooks</a> like <a>useEffect</a> to handle event listeners, local state, an{' '}
//           <a>RequestAnimationFrame</a> management.
//         </p>
//         <p>
//           Hover over these <a>links</a> and see how that animated cursor does it's thing. Kinda
//           nifty, right? Not right for most things, but a nice move for more interactive-type
//           projects. Here's another <a href="">link to nowhere.</a>
//         </p>
//         <p>
//           Play with the <a>css variables</a> to influence the cursor, cursor outline size, and
//           amount of scale on target hover. I suppose those could all be <a>props</a> with some.
//           Click in the margin to check click animation.
//         </p>
//         <p>
//           There's probably a better way to manage these kind of events, but this was the best I
//           could come up with. Recently started mucking more with React cause I'm down with the
//           simplicity of Functional Components and Hooks. And if you read the docs, the future ain't
//           class components. So, best get on them functions.
//         </p>
//       </section>
//     </div>
//   );
// }
// ReactDOM.render(<App />, document.getElementById('app'));
