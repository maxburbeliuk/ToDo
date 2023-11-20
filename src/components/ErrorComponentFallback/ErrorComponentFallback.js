import React from 'react'
import { SimpleGrid, Text } from '@mantine/core'
import {
  StyledContainer,
  StyledTitle,
  StyledButton,
  StyledMobileImage
} from './ErrorComponentFallback.styled'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '~/__constants__'
const ILLUSTRATION_Error = '/assets/Error-boundary-fallback-image.svg'
const ErrorComponentFallback = ({ onGoBack }) => {
  const navigate = useNavigate()
  const redirectToTasks = () => {
    navigate(APP_PATHS.TASKS_ALL)
    onGoBack()
  }
  return (
    <StyledContainer>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <StyledMobileImage src={ILLUSTRATION_Error} />
        <div>
          <StyledTitle>Something is not right...</StyledTitle>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <StyledButton
            variant="outline"
            size="md"
            mt="xl"
            onClick={redirectToTasks}
          >
            Get back to home page
          </StyledButton>
        </div>
      </SimpleGrid>
    </StyledContainer>
  )
}
export default ErrorComponentFallback
