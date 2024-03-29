import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardHeader, CardContent, FormField, FormItem, Form, FormLabel, FormControl, Input, FormMessage, Button } from '@/components'
import { useAuth } from '@/hooks/useAuth'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).refine(password => (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  ), {
    message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
  }),
})


export const Login = () => {

  const { getAccessToken } = useAuth()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleOnSubmit = () => {
    getAccessToken('/dashboard')
  }


  return (
    <div className='grid place-items-center h-screen bg-black'>
      <Card className='w-2/5 min-w-96'>
        <CardHeader>Login</CardHeader>
        <CardContent>
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit(handleOnSubmit) } className="space-y-8">
              <FormField
                control={ form.control }
                name="email"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" { ...field } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="password"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" { ...field } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <Button type="submit" variant={ 'secondary' }>Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
