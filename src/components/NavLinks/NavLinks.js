import { NavLink } from '@mantine/core'
import { useState } from 'react'
import NAV_LINKS_ITEMS from './navLinksItems'
import cx from 'clsx'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import classes from './DndListHandle.module.css'
import ComputedIcon from '~/components/ComputedIcon'
import Indicator from '~/components/Indicator'

const NavLinks = () => {
  const [active, setActive] = useState(NAV_LINKS_ITEMS[0].label)

  const [isShown, setIsShown] = useState(false)

  const [state, handlers] = useListState(NAV_LINKS_ITEMS)
  const items = state.map((item, index) => (
    <Draggable key={item.label} index={index} draggableId={item.label}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging
          })}
          style={{ position: 'relative' }}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            {...provided.dragHandleProps}
            className={classes.dragHandle}
            onMouseMove={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {item.label === active ? <Indicator /> : null}
            <NavLink
              key={item.label}
              active={item.label === active}
              label={item.label}
              leftSection={ComputedIcon(item.icon, isShown)}
              onClick={() => {
                if (!snapshot.isDragging) setActive(item.label)
              }}
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
