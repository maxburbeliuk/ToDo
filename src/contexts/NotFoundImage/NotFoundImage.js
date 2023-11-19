import React from 'react'
import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title
} from '@mantine/core'
import './NotFoundImage.module.css'
import image from '../ErrorBoundary/image.svg'
const NotFoundImage = () => {
  return (
    <div
      className="body"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Container className="root">
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <Image
            src={image}
            className="mobileImage"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div style={{ textAlign: 'center' }}>
            <Title className="title">Something is not right...</Title>
            <Text color="dimmed" size="lg">
              The page you are trying to open does not exist. You may have
              mistyped the address, or the page has been moved to another URL.
              If you think this is an error, please contact support.
            </Text>
            <Button
              variant="outline"
              size="md"
              style={{ marginTop: '1.5rem' }}
              className="control"
            >
              Get back to the home page
            </Button>
          </div>
        </SimpleGrid>
      </Container>
    </div>
  )
}
export default NotFoundImage
