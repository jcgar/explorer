import * as yup from "yup"
import useI18n from "../../i18n/useI18n"
import useForm from "../useForm"


export const fields = {
  path: 'path'
}
export const defaultValues = {
  path: '/',
}

const schemas = (t) => ({
  [fields.path]: yup.string().required()
})

const usePathForm = () => {
  const { t } = useI18n()
  return useForm({ fields, schemas: schemas(t), t})
}

export default usePathForm