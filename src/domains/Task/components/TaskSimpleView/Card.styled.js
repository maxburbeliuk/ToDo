import styled from 'styled-components'
import { Card } from '@mantine/core'

const StyledCard = styled(Card)`
  border: ${(props) =>
    props.isSelected ? '3px solid var(--mantine-color-blue-5)' : ''};
`

export default StyledCard
