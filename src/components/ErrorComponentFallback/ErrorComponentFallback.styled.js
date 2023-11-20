import styled from 'styled-components'
import { Button, Container, Image } from '@mantine/core'

const StyledContainer = styled(Container)`
  padding-top: 300px;
  padding-bottom: 80px;
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
