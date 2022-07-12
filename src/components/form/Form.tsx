import { useCallback, useEffect, useState } from 'react';
import { Button } from '../button/Button';
import classes from './styles.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { peopleActions } from '../../store';
import { useDispatch } from 'react-redux';
import { PersonFormData } from '../../model/PersonFormData';
import { FormStep1 } from './FormStep1';
import { FormStep2 } from './FormStep2';
import { FormStep3 } from './FormStep3';

type formProps = {
  onCancel: () => void;
};

export function Form(props: formProps): JSX.Element {
  const [countries, setCountries] = useState<string[]>([]);
  const [formStep, setFormStep] = useState(1);
  const dispatch = useDispatch();

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PersonFormData>({
    mode: 'all',
  });
  const isError = Object.keys(errors).length > 0;

  const { company, name, IBAN, BIC, bank } = watch();

  function applyFormHook(
    inputName: keyof PersonFormData,
    registerOptions: { maxLength?: any; minLength?: any } = {},
    required?: boolean
  ) {
    if (registerOptions.maxLength) {
      registerOptions.maxLength = {
        value: registerOptions.maxLength,
        message: `The ${inputName} field cannot exceed ${registerOptions.maxLength} characters`,
      };
    }

    if (registerOptions.minLength) {
      registerOptions.minLength = {
        value: registerOptions.minLength,
        message: `The ${inputName} field should contain at least ${registerOptions.minLength} characters`,
      };
    }

    if (required) {
      return {
        ...register(inputName, {
          required: `Please fill in the ${
            inputName[0].toUpperCase() + inputName.slice(1)
          } field`,
          validate: (v) => v?.toString().trim().length! > 0,
          ...registerOptions,
        }),
        className: `${errors[inputName] ? classes.inputError : ''}`,
      };
    }

    return {
      ...register(inputName, { ...registerOptions }),
      className: `${errors[inputName] ? classes.inputError : ''}`,
    };
  }

  function renderStepButtons() {
    if (formStep === 1) {
      return (
        <Button
          text="Next"
          clickHandler={increaseFormStep}
          disabled={isError || !company?.trim() || !name?.trim()}
        />
      );
    }

    if (formStep === 2) {
      return (
        <>
          <Button text="Previous" clickHandler={decreaseFormStep} outline />
          <Button
            text="Next"
            clickHandler={increaseFormStep}
            disabled={isError || !IBAN?.trim() || !BIC?.trim() || !bank?.trim()}
          />
        </>
      );
    }

    return <Button text="Previous" clickHandler={decreaseFormStep} outline />;
  }

  const onSubmit: SubmitHandler<PersonFormData> = (data) => {
    dispatch(peopleActions.addPerson(data));
    props.onCancel();
  };

  const decreaseFormStep = useCallback(() => {
    setFormStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const increaseFormStep = useCallback(() => {
    setFormStep((prev) => (prev < 3 ? prev + 1 : prev));
  }, []);

  useEffect(() => {
    if (countries.length === 0) {
      const countriesList: string[] = [];
      fetch('https://restcountries.com/v2/all?fields=name')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          result.forEach((country: { name: string }) =>
            countriesList.push(country.name)
          );
          setCountries(countriesList);
        })
        .catch(console.error);
    }
  }, [countries.length]);

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <FormStep1 visible={formStep === 1} applyFormHook={applyFormHook} countries={countries}/>
      <FormStep2 visible={formStep === 2} applyFormHook={applyFormHook} />
      <FormStep3 visible={formStep === 3} applyFormHook={applyFormHook} />
      
      {isError &&
        Object.keys(errors).map((key) => (
          <p className={classes.errorText} key="key">
            {errors[key as keyof PersonFormData]!.message}
          </p>
        ))}
      <div className={classes.buttons}>
        <Button text="Cancel" clickHandler={props.onCancel} outline />
        {renderStepButtons()}
        {formStep === 3 && <Button text="Save" submit />}
      </div>
    </form>
  );
}
