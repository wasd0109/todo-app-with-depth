import React from 'react'

type TodoListProps = React.ComponentProps<'div'> & {
    items?: string[];
}

function TodoList({ items, ...props }: TodoListProps) {
    if (!items || items.length === 0) {
        return <div {...props}>No items</div>
    }

    return (
        <div {...props}>
            <ul>
                {items && items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList