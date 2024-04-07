import { UseFormReturn, FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: any;
};

export default function FormProvider({ children, onSubmit, methods, style }: Props) {
  return (
    <Form {...methods}>
      {style ? (
        <form style={style} onSubmit={onSubmit}>
          {children}
        </form>
      ) : (
        <form style={style} onSubmit={onSubmit}>
          {children}
        </form>
      )}
    </Form>
  );
}
