
export default function List({ items, onToggle, onDelete }) {

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}
                    onClick={() => onToggle && onToggle(item.id)}
                    style={{textDecoration: item.completed ? 'line-through' : 'none'}}
                >
                    {item.name}
                    <button
                        onClick={() => onDelete(item.id)}
                    >X</button>
                </li>
            ))}
        </ul>
    )
}