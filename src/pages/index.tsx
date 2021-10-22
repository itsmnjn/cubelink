import Cube from '@/components/Cube';
import { CSSProperties } from 'react';
import styled, { css, keyframes } from 'styled-components';
import tw from 'tailwind-styled-components';

const Container = tw.div`
  flex
  items-center
  justify-center
  w-full
  h-full
`;

export default function HomePage() {
  return (
    <Container>
      <Cube />
    </Container>
  );
}
