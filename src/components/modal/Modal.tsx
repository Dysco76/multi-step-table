import classes from './styles.module.scss'
import Close from '../../resources/Close.svg';


type modalProps = {
    onClose: () => void,
    children: React.ReactNode,
}

export function Modal(props:modalProps):JSX.Element {
    return <>
        <div className={classes.backdrop} onClick={props.onClose}></div>
        <div className={classes.modal}>
            <img src={Close} className={classes.closeIcon} alt="Close modal button" onClick={props.onClose} />
            {props.children}
        </div>
    </>
    
}