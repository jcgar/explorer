import React, { FC, useState } from "react"
import { Controller } from "react-hook-form"
import usePathForm, { fields, defaultValues } from "../use/form/impl/usePathForm"
import { SubmitButtonStyled, TextFieldStyled } from "../components/form/styled"
import useI18n from "../use/i18n/useI18n"
import { IAllStringProps } from "../interface"


export const labelIds = {
  path: 'view.tree.path',
  update: 'view.tree.update'
}

export interface IProps {
  onSubmit: (values: any) => void;
}

const getValue = (key: string, values: IAllStringProps) => values[key]

const PathFormCompose: FC<IProps> = ({ onSubmit }) => {
  const { tm } = useI18n()
  const {
    update
  } = tm(labelIds)

  const { form, disabled, fieldProps } = usePathForm()
  const { handleSubmit, control } = form
  const [ loading, setLoading ] = useState(false)

  const submit = async (data: any, e: any) => {
    e.preventDefault()
    setLoading(true)

    await onSubmit(data)
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          render={({ field }) => <TextFieldStyled {...fieldProps[fields.path]} {...field} />}
          control={control}
          name={fields.path}
          defaultValue={getValue(fields.path, defaultValues)}
        />
        <SubmitButtonStyled disabled={loading || disabled}>
          { update }
        </SubmitButtonStyled>
      </form>
    </>
  )
}

export default PathFormCompose