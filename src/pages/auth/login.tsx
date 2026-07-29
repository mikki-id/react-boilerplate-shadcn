import LoginForm from '@/features/auth/components/shared/form/login-form'
import AuthLayout from '@/features/auth/layout'

const Login = () => {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      <LoginForm />
    </AuthLayout>
  )
}

export default Login
