import { Center, NavLink } from '@mantine/core'
import { useState } from 'react'
import NAV_LINKS_ITEMS from './navLinksItems'
import cx from 'clsx'
import { rem } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { IconGripVertical } from '@tabler/icons-react'
import classes from './DndListHandle.module.css'

const NavLinks = () => {
  const [active, setActive] = useState(0)

  const [isShown, setIsShown] = useState(false)

  const [state, handlers] = useListState(NAV_LINKS_ITEMS)

  const computedIcon = (icon) => {
    if (isShown) {
      return (
        <Center>
          <Center
            style={{
              marginRight: '6px'
            }}
          >
            <IconGripVertical
              style={{
                width: rem(18),
                height: rem(18)
              }}
              stroke={0.5}
            />
          </Center>
          {icon}
        </Center>
      )
    }

    return (
      <Center
        style={{
          marginLeft: '24px'
        }}
      >
        {icon}
      </Center>
    )
  }
  const items = state.map((item, index) => (
    <Draggable key={item.label} index={index} draggableId={item.label}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            {...provided.dragHandleProps}
            className={classes.dragHandle}
            onMouseMove={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <NavLink
              key={item.label}
              active={index === active}
              label={item.label}
              leftSection={computedIcon(item.icon)}
              onClick={() => setActive(index)}
              variant="subtle"
            />
          </div>
        </div>
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
export default NavLinks
