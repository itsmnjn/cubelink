import { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import tw from 'tailwind-styled-components';

const cubeWidth = 230;

const turn = keyframes`
  to {
    transform: rotateY(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeInText = styled.p`
  animation: ${fadeIn} 2s cubic-bezier(0.65, 0, 0.35, 1);
  position: absolute;
  color: floralwhite;
  mix-blend-mode: color-dodge;
  font-size: 1.5rem;
  margin-left: 10px;
  margin-bottom: 6px;
  bottom: 0;
`;

const CubeContainer = styled(animated.div)`
  position: relative;
  width: ${cubeWidth}px;
  height: ${cubeWidth}px;
  transform-style: preserve-3d;
  touch-action: none;
  animation: ${turn} 2s cubic-bezier(0.65, 0, 0.35, 1);
`;

const CubeFace = styled.div`
  position: absolute;
  width: ${cubeWidth}px;
  height: ${cubeWidth}px;
  user-select: none;
  box-shadow: 0px 0px 6px 0px hsla(60, 100%, 100%, 0.5);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const FaceFront = styled(CubeFace)`
  background-image: url('https://pbs.twimg.com/media/FBWWiMaVQAITfv2?format=jpg&name=large');
  transform: translateZ(${cubeWidth / 2}px);
`;
const FaceBack = styled(CubeFace)`
  background-image: url('https://static.dezeen.com/uploads/2018/07/alexis-christodoulo-design_dezeen_2364_col_4-852x852.jpg');
  transform: translateZ(-${cubeWidth / 2}px) rotateY(-180deg);
`;
const FaceLeft = styled(CubeFace)`
  background-image: url('https://i.pinimg.com/originals/6f/b8/84/6fb884d48f47790f879ea725b03ad9a6.png');
  transform: rotateY(270deg) translateX(-${cubeWidth / 2}px);
  transform-origin: center left;
`;
const FaceRight = styled(CubeFace)`
  background-image: url('https://pbs.twimg.com/media/FBWWiKPVcAEQJ9k?format=jpg&name=large');
  transform: rotateY(-270deg) translateX(${cubeWidth / 2}px);
  transform-origin: top right;
`;

const FaceTop = styled(CubeFace)`
  transform: rotateX(-270deg) translateY(-${cubeWidth / 2}px);
  transform-origin: top center;
`;
const FaceBottom = styled(CubeFace)`
  transform: rotateX(-90deg) translateY(${cubeWidth / 2}px);
  transform-origin: bottom center;
`;

const CuteButton = styled(tw.button`
  text-5xl
  md:text-5xl
  transition
  active:scale-90
  select-none
  leading-tight
  text-white
`)`
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
`;

export default function Cube() {
  const rotation = useRef(0);
  const [cubeClicked, setCubeClicked] = useState(false);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const { scale } = useSpring({
    scale: cubeClicked ? 0.95 : 1,
    config: config.stiff,
  });

  const onLeftButtonClicked = () => {
    rotation.current += 90;
    api.start(() => {
      return {
        x: rotation.current,
      };
    });
  };

  const onRightButtonClicked = () => {
    rotation.current -= 90;
    api.start(() => {
      return {
        x: rotation.current,
      };
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div
        className='relative flex flex-col'
        style={{ perspective: cubeWidth * 2 }}
      >
        <div className='absolute flex flex-row self-center gap-6 -top-32 animate-fade-in-down'>
          <CuteButton>
            <img src='/Instagram.svg' className='w-8' />
          </CuteButton>
          <CuteButton>
            <img src='/Snapchat.svg' className='w-8' />
          </CuteButton>
          <CuteButton>
            <img src='/Twitter.svg' className='w-8' />
          </CuteButton>
          <CuteButton>
            <img src='/TikTok.svg' className='w-8' />
          </CuteButton>
        </div>

        <CubeContainer
          className='cursor-pointer'
          style={{
            rotateY: x.to((x) => `${x}deg`),
            scale,
          }}
          onTouchStart={() => {
            setCubeClicked(true);
          }}
          onTouchEnd={() => {
            setCubeClicked(false);
          }}
          onMouseDown={() => {
            setCubeClicked(true);
          }}
          onMouseUp={() => {
            setCubeClicked(false);
          }}
        >
          <FaceFront>
            <FadeInText>arc haus</FadeInText>
          </FaceFront>
          <FaceRight>
            <FadeInText>bane haus</FadeInText>
          </FaceRight>
          <FaceLeft>
            <FadeInText>nau haus</FadeInText>
          </FaceLeft>
          <FaceBack>
            <FadeInText>ser haus</FadeInText>
          </FaceBack>

          <FaceTop />
          <FaceBottom />
        </CubeContainer>

        <div className='absolute flex flex-row self-center gap-8 -bottom-36 animate-fade-in-down'>
          <CuteButton onClick={onLeftButtonClicked}>←</CuteButton>
          <CuteButton onClick={onRightButtonClicked}>→</CuteButton>
        </div>
      </div>
    </div>
  );
}
