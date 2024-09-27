import { useState } from 'react'
import { object } from 'yup'

const useForm = (schema_, initialValues = {}) => {
  const [ schema, setSchema ] = useState(schema_)
  const [ values, setValues ] = useState(initialValues)
  const [ errors, setErrors ] = useState({})

  const setValue = (name, value) => {
    setValues((old) => ({ ...old, [name]: value }))
  }

  const validate = async () => {
    try {
      await schema.validate(values, { abortEarly: false })
      setErrors({})
      return true
    } catch (e) {
      const formErrors = e.inner.reduce((acc, err) => {
        acc[err.path] = err.message
        return acc
      }, {})

      formErrors.generalError = e.message
      setErrors(formErrors)
    }
    return false
  }

  return { values, setValue, validate, errors } 
}
 
export default useForm