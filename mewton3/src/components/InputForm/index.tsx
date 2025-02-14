import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTaskStore } from '@/lib/store/taskStore';

const FormSchema = z.object({
  cannelLink: z.string().min(2, {
    message: 'channelLink must be at least 2 characters.',
  }),
});

export function InputForm() {
  const createTask = useTaskStore((state) => state.createTask);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cannelLink: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createTask(data.cannelLink);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-between w-full"
      >
        <FormField
          control={form.control}
          name="cannelLink"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="channelLink" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-orange text-bold" type="submit">
          Add
        </Button>
      </form>
    </Form>
  );
}
