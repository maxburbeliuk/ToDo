import { Image, SimpleGrid, Text, Title } from '@mantine/core'
import { StyledContainer, StyledButton } from './ErrorComponentFallback.styled'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '~/__constants__'
import { useMediaQuery } from '@mantine/hooks'
const ILLUSTRATION_ERROR = '/assets/Error-boundary-fallback-image.svg'
const ErrorComponentFallback = ({ onGoBack }) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const navigate = useNavigate()
  const redirectToTasks = () => {
    navigate(APP_PATHS.TASKS_ALL)
    onGoBack()
  }
  return (
    <StyledContainer className={isMobile ? 'mx-12' : undefined}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={ILLUSTRATION_ERROR} />
        <div>
          <Title className="mb-12">Something is not right...</Title>
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
