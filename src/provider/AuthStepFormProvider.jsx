import { useEffect, useState } from "react"
import { StepFormContext } from "../context"

function AuthStepFormProvider({children}) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const maxStep = 3;

    const nextStep = () => {
        setStep((prevStep) => {
            if (prevStep >= maxStep) {
              return prevStep; 
            }
            return prevStep + 1;
          });
    }
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const updateFormData = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            ...data,
        }))
    }

    // Log formData whenever it updates
  useEffect(() => {
    console.log("Updated formData: ", formData);
  }, [formData]);

  return (
    <StepFormContext.Provider value={{step, nextStep, prevStep, formData, updateFormData}}>
        {children}
    </StepFormContext.Provider>
  )
}

export default AuthStepFormProvider