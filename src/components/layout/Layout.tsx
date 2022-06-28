import classes from './styles.module.scss'

type layoutProps = {
    button: React.ReactNode,
    table: React.ReactNode
}

export function Layout(props: layoutProps): JSX.Element {
   
    return <>
    <div className={classes.buttonWrapper}>
        {props.button}
    </div>
    <main className={classes.tableWrapper}>
        {props.table}
    </main>
    </>
}