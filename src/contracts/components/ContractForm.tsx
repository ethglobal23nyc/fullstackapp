import { Card, Select, Text } from "@chakra-ui/react"
import React, { Suspense, useState } from "react"
import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function ContractForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const user = useCurrentUser()
  const memberships = user?.memberships

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" type="text" />
      <LabeledTextField
        name="denomination"
        label="Denomination"
        placeholder="Denomination"
        type="number"
      />
      <Select placeholder="Organization Name">
        {memberships.map((membership) => {
          return <option key={membership.organization.id}>{membership.organization.name}</option>
        })}
      </Select>
      {/* TODO: display all the organization names in drop down menu, select the id.  */}
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
