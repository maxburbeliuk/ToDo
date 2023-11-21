import styled from 'styled-components'
import { Button, Container } from '@mantine/core'

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  height: 100vh;
`

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
  }
`

export { StyledButton, StyledContainer }
