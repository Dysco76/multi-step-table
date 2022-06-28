import { useCallback, useEffect, useState } from 'react';
import { Button } from '../button/Button';
import classes from './styles.module.scss';
import { useForm, SubmitHandler } from "react-hook-form";
import { peopleActions } from '../../store'
import { useDispatch } from 'react-redux';
import { PersonFormData } from '../../model/PersonFormData'

type formProps = {
    onCancel:() => void
}

export function Form(props:formProps):JSX.Element {
    const [countries, setCountries] = useState<string[]>([])
    const [formStep, setFormStep] = useState(1);
    const dispatch = useDispatch();
    

    let {
        register,
        handleSubmit,
        formState: {errors},
        watch,
      } = useForm<PersonFormData>({
        mode: "all",
      })
      const isError = Object.keys(errors).length > 0;
    
    const {company, name, IBAN, BIC, bank } = watch();

    function applyFormHook (
        inputName: keyof PersonFormData, 
        registerOptions: {maxLength?: any, minLength?: any} = {},
        required?: boolean, 
        ) {
        if(registerOptions.maxLength) {
            registerOptions.maxLength = {
                value: registerOptions.maxLength, 
                message: `The ${inputName} field cannot exceed ${registerOptions.maxLength} characters`
            }
        }

        if(registerOptions.minLength) {
            registerOptions.minLength = {
                value: registerOptions.minLength, 
                message: `The ${inputName} field should contain at least ${registerOptions.minLength} characters`
            }
        }
        
        if(required) {
                return {
                ...register(inputName, {
                    required: `Please fill in the ${inputName[0].toUpperCase() + inputName.slice(1)} field`,
                    validate: (v) => v?.toString().trim().length! > 0,
                    ...registerOptions
                }),
                className: `${errors[inputName] ? classes.inputError : ''}`
            }
        }

        return {
            ...register(inputName, {...registerOptions}),
            className: `${errors[inputName] ? classes.inputError : ''}`
        }
    }

    function renderStepButtons() {
        
        if (formStep === 1) {
            return <Button text="Next" clickHandler={increaseFormStep} disabled={isError || !company?.trim() || !name?.trim()}/>
        }

        if (formStep === 2) {
            return <>
                <Button text="Previous" clickHandler={decreaseFormStep} outline />
                <Button text="Next" clickHandler={increaseFormStep} disabled={isError || !IBAN?.trim() || !BIC?.trim() || !bank?.trim()}/>
                </>
            
        }

        return <Button text="Previous" clickHandler={decreaseFormStep} outline />

    }

    const onSubmit: SubmitHandler<PersonFormData> = (data) => {
        dispatch(peopleActions.addPerson(data));
        props.onCancel();
      }

    const decreaseFormStep = useCallback(() => {
        setFormStep(prev => prev > 1 ? prev - 1 : prev)
    }, [])

    const increaseFormStep = useCallback(() => {
        setFormStep(prev => prev < 3 ? prev + 1 : prev)
    }, [])

    useEffect(() => {
        if(countries.length === 0) {
            const countriesList: string[] = [];
            fetch('https://restcountries.com/v2/all?fields=name')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(result => {
                result.forEach((country: {name: string}) => countriesList.push(country.name))
                setCountries(countriesList)
            })
            .catch(console.error);
        }
    }, [countries.length])

    return <form className={classes.form} onSubmit={
        handleSubmit(onSubmit)
        }>
        <section className={formStep !== 1 ? 'visually-hidden' : ''}>
            <h2>Invoice Address</h2>
            <div className={classes.inputsWrapper}>
                <div className={classes.inputControl}>
                    <label htmlFor="company">Company *</label>
                    <input type="text" id="company" {...applyFormHook('company', {maxLength: 40}, true, )}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="name">Name *</label>
                    <input type="text" id="name" {...applyFormHook('name', {maxLength: 90}, true )}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="additional">Additional</label>
                    <input type="text" id="additional" {...applyFormHook('additional', {maxLength: 150}, false )}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" {...applyFormHook('street', {maxLength: 50})}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="postal">Postal Code</label>
                    <input type="text" id="postal" {...applyFormHook('postal', {maxLength: 10})}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="country">Company</label>
                    {countries.length ? <select id="country" defaultValue={countries[236]} {...applyFormHook('country')}>
                        { countries.map((country, i) => <option value={country} key={i}>{country}</option>)}
                    </select> : <input></input>}
                </div>
            </div>
        </section>
        <section className={formStep !== 2 ? 'visually-hidden' : ''}>
        <h2>Bank Data</h2>
            <div className={classes.inputsWrapper}>
                <div className={classes.inputControl}>
                    <label htmlFor="IBAN">IBAN *</label>
                    <input type="text" id="IBAN" {...applyFormHook('IBAN', {maxLength: 80}, true)}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="BIC">BIC *</label>
                    <input type="text" id="BIC" {...applyFormHook('BIC', {maxLength: 20}, true)}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="bank">Bank name *</label>
                    <input type="text" id="bank" {...applyFormHook('bank', {maxLength: 40}, true)}/>
                </div>
            </div>
        </section>
        <section className={formStep !== 3 ? 'visually-hidden' : ''}>
        <h2>Contact</h2>
            <div className={classes.inputsWrapper}>
                <div className={classes.inputControl}>
                    <label htmlFor="fax">Fax</label>
                    <input type="text" id="fax" {...applyFormHook('fax', {maxLength: 20})}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" {...applyFormHook('email', {maxLength: 50})}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" id="birthday" defaultValue='2020-12-12' {...applyFormHook('birthday')}/>
                </div>
                <div className={classes.inputControl}>
                    <label htmlFor="homepage">Homepage</label>
                    <input type="text" id="homepage" {...applyFormHook('homepage', {maxLength: 100})}/>
                </div>
            </div>
        </section>
        {isError && Object.keys(errors).map(
            key => <p className={classes.errorText} key="key">{errors[key as keyof PersonFormData]!.message}</p>
            )}
        <div className={classes.buttons}>
            <Button text="Cancel" clickHandler={props.onCancel} outline />
            {renderStepButtons()}
            {formStep === 3 && <Button text="Save" submit/>}
        </div>
    </form>
}