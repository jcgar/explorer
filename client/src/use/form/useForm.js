import { useForm as hookForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { es } from 'yup-locales'
import { setLocale } from 'yup'

setLocale(es)

const getSchema = (arr, schemas) => {
  return yup.object().shape(
    arr.reduce((tot, key) => {
      tot[key] = schemas[key]
      return tot
    }, {})
  )
}

const getFieldProps = (arr, register) => {
  return arr.reduce((tot, key) => {
    tot[key] = register(key)
    return tot
  }, {})
}

const getDefaultValues = (arr)  => {
  return arr.reduce((tot, key) => {
    tot[key] = ''
    return tot
  }, {})
}

const getErrorMessages = (arr, errors, t) => {
  return arr.reduce((tot, key) => {
    tot[key] = ((errors[key] || {}).message || '').replace(key, t(`error.labels.${key}`))
    return tot
  }, {})
}

export default function useForm({fields, schemas, t}) {
  const arr = Object.keys(fields)
  const schema = getSchema(arr, schemas)
  
  // hook form initialization
  const form = hookForm({
    mode: 'all',
    defaultValues: getDefaultValues(arr),
    resolver: yupResolver(schema),
  })

  const { formState, register } = form
  return {
    disabled: !formState.isValid,
    fieldProps: getFieldProps(arr, register),
    errors: getErrorMessages(arr, formState.errors, t),
    form
  }
}
