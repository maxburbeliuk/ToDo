import React from 'react'
import { SimpleGrid, Text } from '@mantine/core'
import image from '../ErrorBoundary/image.svg'
import {
  StyledContainer,
  StyledTitle,
  StyledButton,
  StyledMobileImage
} from './ErrorComponentFallbackStyled'
import { useLocation, useNavigate } from 'react-router-dom'
import { APP_PATHS } from '~/__constants__'

const ErrorComponentFallback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const redirectToTasks = () => {
    navigate(APP_PATHS.TASKS_ALL)
  }

  return (
    <StyledContainer>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <StyledMobileImage src={image} />
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
