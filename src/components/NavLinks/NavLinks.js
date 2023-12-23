import { NavLink } from '@mantine/core'
import { useState } from 'react'
import data from './navLinksItems'
import cx from 'clsx'
import { rem } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { IconGripVertical } from '@tabler/icons-react'
import classes from './DndListHandle.module.css'

const NavLinks = () => {
  const [active, setActive] = useState(0)
  const [state, handlers] = useListState(data)
  const [isShown, setIsShown] = useState(false)
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
          <IconGripVertical
            style={{
              width: rem(18),
              height: rem(18)
            }}
            stroke={0.5}
          />
          <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            description={item.description}
            leftSection={item.icon}
            onClick={() => setActive(index)}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            {...provided.dragHandleProps}
          ></NavLink>
          {isShown && (
            <div
              style={{}}
              {...provided.dragHandleProps}
              className={classes.dragHandle}
            ></div>
          )}
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
