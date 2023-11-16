import { NavLink } from '@mantine/core'
import { useState } from 'react'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  DragIcon,
  SelectedNavLinksIndicator,
  DragItemWrapper
} from '~/components/MainMenu/components'
import { NAV_LINKS_ITEMS } from '~/components/MainMenu/__constants__'

const MainMenu = () => {
  const [active, setActive] = useState(NAV_LINKS_ITEMS[0].label)

  const [isShown, setIsShown] = useState(false)

  const [state, handlers] = useListState(NAV_LINKS_ITEMS)
  const items = state.map((item, index) => (
    <Draggable key={item.label} index={index} draggableId={item.label}>
      {(provided, snapshot) => (
        <DragItemWrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          onMouseMove={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {item.label === active && !snapshot.isDragging ? (
            <SelectedNavLinksIndicator />
          ) : null}
          <NavLink
            key={item.label}
            active={item.label === active}
            label={item.label}
            leftSection={<DragIcon isShown={isShown}>{item.icon}</DragIcon>}
            onClick={() => {
              if (!snapshot.isDragging) setActive(item.label)
            }}
            variant="subtle"
          />
        </DragItemWrapper>
      )}
    </Draggable>
  ))
  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default MainMenu
