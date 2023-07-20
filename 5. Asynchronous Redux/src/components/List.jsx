
export default function List({ items, onToggle, onDelete }) {

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    <span
                        onClick={() => onToggle && onToggle(item.id)}
                        style={{textDecoration: item.completed ? 'line-through' : 'none'}}
                    >
                        {item.name}
                    </span>
                    <button
                        onClick={() => onDelete(item)}
                    >X</button>
                </li>
            ))}
        </ul>
    )
}