import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form"
import { Input as UiInput } from '@my/ui';


export const Input = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props :UseControllerProps<TFieldValues, TName>) => {
    const { field } = useController(props);

    return <UiInput value={field.value} onChangeText={field.onChange} />
}