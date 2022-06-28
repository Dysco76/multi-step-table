import classes from './styles.module.scss'

type buttonProps = {
    text: string | number,
    outline?: boolean,
    clickHandler?: () => void,
    submit?: boolean,
    disabled?: boolean
}

export function Button(props: buttonProps) {
    return <button 
    type={props.submit ? 'submit' : 'button'} 
    onClick={(e) => {
        if(props.clickHandler) {
            props.clickHandler()
        }
    } } 
    className={`${classes.btn} ${props.outline ? classes.btnOutlined : ''}`}
    disabled={props.disabled}>
        {props.text}
    </button>
}