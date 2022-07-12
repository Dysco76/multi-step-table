import classes from './styles.module.scss';

type formStepProps = {
    visible: boolean,
    applyFormHook: Function,
}

export function FormStep2 (props: formStepProps): JSX.Element {
    return <section className={props.visible ? '' : 'visually-hidden'}>
    <h2>Bank Data</h2>
    <div className={classes.inputsWrapper}>
      <div className={classes.inputControl}>
        <label htmlFor="IBAN">IBAN *</label>
        <input
          type="text"
          id="IBAN"
          {...props.applyFormHook('IBAN', { maxLength: 80 }, true)}
        />
      </div>
      <div className={classes.inputControl}>
        <label htmlFor="BIC">BIC *</label>
        <input
          type="text"
          id="BIC"
          {...props.applyFormHook('BIC', { maxLength: 20 }, true)}
        />
      </div>
      <div className={classes.inputControl}>
        <label htmlFor="bank">Bank name *</label>
        <input
          type="text"
          id="bank"
          {...props.applyFormHook('bank', { maxLength: 40 }, true)}
        />
      </div>
    </div>
  </section>
}