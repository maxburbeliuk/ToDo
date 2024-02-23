import { TaskAdvancedView } from '~/domains/Task'
import { Container } from '@mantine/core'
const TaskAll = () => {
  const demoProps = {
    bg: 'var(--mantine-color-dark-7)',
    p: '15px',
    h: '100vh'
  }
  return (
    <Container {...demoProps} fluid>
      <TaskAdvancedView />
    </Container>
  )
}

export default TaskAll
