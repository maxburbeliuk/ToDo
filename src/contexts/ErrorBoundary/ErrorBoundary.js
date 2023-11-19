import React from 'react'
import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title
} from '@mantine/core'
import classes from '~/contexts/ErrorBoundary/NotFoundImage.module.css'
import image from './image.svg'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className={classes.root}>
          <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
            <Image src={image} className={classes.mobileImage} />
            <div>
              <Title className={classes.title}>Something is not right...</Title>
              <Text c="dimmed" size="lg">
                Page you are trying to open does not exist. You may have
                mistyped the address, or the page has been moved to another URL.
                If you think this is an error contact support.
              </Text>
              <Button
                variant="outline"
                size="md"
                mt="xl"
                className={classes.control}
              >
                Get back to home page
              </Button>
            </div>
          </SimpleGrid>
        </Container>
      )
    }

    return this.props.children
  }
}
export default ErrorBoundary
