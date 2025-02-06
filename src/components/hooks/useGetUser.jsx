import { useContext } from 'react'
import { StepFormContext } from '../../context'

const useGetUserRole = () => {

    const {formData} = useContext(StepFormContext);
    const userRole = formData.role;

  return userRole;
}

export default useGetUserRole