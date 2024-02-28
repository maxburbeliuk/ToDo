import styled from 'styled-components'
import { Card } from '@mantine/core'

const StyledCard = styled(Card)`
  border: ${(props) =>
    props.isSelected ? '3px solid var(--mantine-color-lime-4)' : ''};
`

export default StyledCard
