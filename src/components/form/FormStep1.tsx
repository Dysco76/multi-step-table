import classes from './styles.module.scss';

type formStepProps = {
    visible: boolean,
    applyFormHook: Function,
    countries: any[],
}

export function FormStep1 (props: formStepProps): JSX.Element {

    return <section className={props.visible ? '' : 'visually-hidden'}>
    <h2>Invoice Address</h2>
    <div className={classes.inputsWrapper}>
      <div className={classes.inputControl}>
        <label htmlFor="company">Company *</label>
        <input
          type="text"
          id="company"
          {...props.applyFormHook('company', { maxLength: 40 }, true)}
        />
      </div>
      <div className={classes.inputControl}>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          {...props.applyFormHook('name', { maxLength: 90 }, true)}
        />
      </div>
      <div className={classes.inputControl}>
        <label htmlFor="additional">Additional</label>
        <input
          type="text"
          id="additional"
          {...props.applyFormHook('additional', { maxLength: 150 }, false)}
        />
      </div>
      <div className={classes.inputControl}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          {...props.applyFormHook('street', { maxLength: 50 })}
        />
      </div>
      <div className={classes.inputControl}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          {...props.applyFormHook('postal', { maxLength: 10 })}
        />
      </div>
      <div className={classes.inputControl}>
        <label htmlFor="country">Company</label>
        {props.countries.length ? (
          <select
            id="country"
            defaultValue={props.countries[236]}
            {...props.applyFormHook('country')}
          >
            {props.countries.map((country, i) => (
              <option value={country} key={i}>
                {country}
              </option>
            ))}
          </select>
        ) : (
          <input></input>
        )}
      </div>
    </div>
  </section>
}