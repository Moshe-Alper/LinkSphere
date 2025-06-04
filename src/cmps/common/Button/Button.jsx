import './Button.scss';

export function Button({ title, onClick}) {
    return (
        <button className='common-btn' onClick={onClick}>{title}</button>
    )
}