import './App.css';
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm();

  async function onSubmit(data) { // Fixed the function declaration
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Submitting the form", data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input 
            {...register("firstName", { 
              required: true, 
              minLength: { value: 3, message: 'Min Length of the password should be 3' }, 
              maxLength: { value: 6, message: 'Max Length of the password should be 6' } 
            })} 
            className={errors.firstName ? 'input-error' : ""} 
          />
          {errors.firstName && <p className='error-msg'>{errors.firstName.message}</p>}
        </div>
        <br />
        <div>
          <label>Middle Name</label>
          <input 
            {...register("middleName")} 
            className={errors.middleName ? 'input-error' : ""} 
          />
        </div>
        <br />
        <div>
          <label>Last Name</label>
          <input 
            {...register("lastName", { 
              pattern: {
                value: /^[A-Za-z]+$/i, 
                message: 'Last Name is not as per the Regex' 
              } 
            })} 
            className={errors.lastName ? 'input-error' : ""} 
          />
          {errors.lastName && <p className='error-msg'>{errors.lastName.message}</p>}
        </div>
        <br />
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"}/>
      </form>
    </>
  );
}

export default App;
