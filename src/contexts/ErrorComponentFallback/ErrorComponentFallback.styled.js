import styled from 'styled-components'
import { Button, Container, Title, Image } from '@mantine/core'

const StyledContainer = styled(Container)`
  padding-top: 300px;
  padding-bottom: 80px;
`
const StyledTitle = styled(Title)`
  font-weight: 900;
  font-size: 34px;
  margin-bottom: var(--mantine-spacing-md);
  font-family: Greycliff CF, var(--mantine-font-family);
`

const StyledButton = styled(Button)`
  @media (max-width: 768px) {
    width: 100%;
  }
`
const StyledMobileImage = styled(Image)`
  @media (min-width: 48rem);
`

export { StyledButton, StyledTitle, StyledContainer, StyledMobileImage }
