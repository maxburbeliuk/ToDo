import styled from 'styled-components'
import { Button, Container, Image } from '@mantine/core'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex: 1;
`

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
  }
`
const StyledMobileImage = styled(Image)`
  @media (min-width: 48rem);
`

export { StyledButton, StyledContainer, StyledMobileImage }
