import React, { Suspense } from "react"
import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function ContractForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
      <LabeledTextField
        name="denomination"
        label="Denomination"
        placeholder="Denomination"
        type="number"
      />
      <LabeledTextField
        name="organizationId"
        label="Organization Id"
        placeholder="Organization Id"
        type="number"
      />
      <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
      <LabeledTextField
        name="denomination"
        label="Denomination"
        placeholder="Denomination"
        type="number"
      />
      <LabeledTextField
        name="organizationId"
        label="Organization Id"
        placeholder="Organization Id"
        type="number"
      />
      <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
      <LabeledTextField
        name="denomination"
        label="Denomination"
        placeholder="Denomination"
        type="number"
      />
      <LabeledTextField
        name="organizationId"
        label="Organization Id"
        placeholder="Organization Id"
        type="number"
      />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
