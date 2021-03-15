import { Field } from 'redux-form';
import styles from './formControlls.module.css';

const FormControl = ({input, meta: {error, touched}, children}) => {
    const hasError = error && touched;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>  
                {children}
            </div>
            {hasError && <span>{error}</span> }
        </div>
    )
}

export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...input} {...restProps}/>
        </FormControl>
    )
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}

export const CreateField = (placeholder, name, validators, component, props = {}, text = "") => {
    return (
        <div>
            <Field
                name={name} 
                component={component} 
                placeholder={placeholder} 
                validate={validators}
                {...props}
            /> 
            {text}
        </div>
    )
}