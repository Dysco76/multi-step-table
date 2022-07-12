import classes from './styles.module.scss';

type formStepProps = {
    visible: boolean,
    applyFormHook: Function,
}

export function FormStep3 (props: formStepProps): JSX.Element {
    return <section className={props.visible ? '' : 'visually-hidden'}>
        <h2>Contact</h2>
        <div className={classes.inputsWrapper}>
          <div className={classes.inputControl}>
            <label htmlFor="fax">Fax</label>
            <input
              type="text"
              id="fax"
              {...props.applyFormHook('fax', { maxLength: 20 })}
            />
          </div>
          <div className={classes.inputControl}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              {...props.applyFormHook('email', { maxLength: 50 })}
            />
          </div>
          <div className={classes.inputControl}>
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              defaultValue="2020-12-12"
              {...props.applyFormHook('birthday')}
            />
          </div>
          <div className={classes.inputControl}>
            <label htmlFor="homepage">Homepage</label>
            <input
              type="text"
              id="homepage"
              {...props.applyFormHook('homepage', { maxLength: 100 })}
            />
          </div>
        </div>
    </section>
}