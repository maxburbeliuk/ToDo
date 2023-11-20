import styled from 'styled-components'

const DragItemWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: var(--mantine-radius-md);
    light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5));
  background-color: light-dark(
    var(--mantine-color-white),
    var(--mantine-color-dark-5)
  );
  margin-bottom: var(--mantine-spacing-sm);
  box-shadow: ${({ isDragging }) =>
    isDragging ? 'var(--mantine-shadow-sm)' : 'none'};
`

export default DragItemWrapper
