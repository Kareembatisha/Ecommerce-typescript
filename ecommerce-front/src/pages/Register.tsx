import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, signUpType } from '@validations/signUpSchema'
import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability'
import { Heading } from '@components/common'
import { Input } from '@components/Form'
import { Form, Button, Row, Col } from 'react-bootstrap'

const Register = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const submitForm: SubmitHandler<signUpType> = (data) => {
    console.log(data)
  }

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability()

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger('email')
    const value = e.target.value
    const { isDirty, invalid } = getFieldState('email')

    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(value)
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability()
    }
  }

  return (
    <>
      <Heading title='User Registration' />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label='First Name'
              name='firstName'
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              label='Last Name'
              name='lastName'
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label='Email Address'
              name='email'
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === 'notAvailable'
                  ? 'This email is already in use.'
                  : emailAvailabilityStatus === 'failed'
                  ? 'Error from the server.'
                  : ''
              }
              formText={
                emailAvailabilityStatus === 'checking'
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ''
              }
              success={
                emailAvailabilityStatus === 'available'
                  ? 'This email is available for use.'
                  : ''
              }
              disabled={emailAvailabilityStatus === 'checking' ? true : false}
            />
            <Input
              type='password'
              label='Password'
              name='password'
              register={register}
              error={errors.password?.message}
            />
            <Input
              type='password'
              label='Confirm Password'
              name='confirmPassword'
              register={register}
              error={errors.confirmPassword?.message}
            />
            <Button
              variant='info'
              type='submit'
              style={{ color: 'white' }}
              disabled={emailAvailabilityStatus === 'checking' ? true : false}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Register
