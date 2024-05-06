import { useAppSelector } from '@store/hooks'
import { Heading } from '@components/common'
const Account = () => {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <>
      <Heading title='Account Info' />
      <ul>
        <li>First Name: {user?.firstName}</li>
        <li>Last Name: {user?.lastName}</li>
        <li>Email: {user?.email}</li>
      </ul>
    </>
  )
}

export default Account
