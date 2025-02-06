import { useForm } from "react-hook-form";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import { useContext } from "react";
import { UsernameContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { useCheckUserNameAvialabilitiesIntentMutation } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserName } from "@/redux/features/userDocSlice";

const SiteURl = import.meta.env.VITE_SERVER_BASE_URL;
function Searchbar({ width, btnText, webUrl }) {
  const { register, handleSubmit, reset } = useForm();
  const { setUsername } = useContext(UsernameContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkUserName, { data, isLoading, error }] =
    useCheckUserNameAvialabilitiesIntentMutation();

  const onSubmit = async data => {
    if (!data.username) {
      toast.error("Username is required!");
      return;
    }
    setUsername(data.username);
    try {
      const result = await checkUserName({ userName: data }).unwrap(); // ✅ Unwrap full response
      if (result?.success) {
        dispatch(setUserName(data.username));
        toast.success(result?.message);

        navigate("/createaccount");
      } else {
        toast.error("Username is already taken! , choose another");
      }
    } catch (err) {
      // ✅ Handle error case
      console.error("❌ Error checking username:", err);
      // Extract error message if available
      const errorMessage = err?.data?.message || "Something went wrong!";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      reset();
    }
  };
  return (
    <form
      className="md:shadow-[8px_8px_32px_0px_rgba(34,34,34,0.13)] rounded-[200px] relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <p className="text-sm relative inline-block top-9 ml-[-100px] md:ml-0 md:text-[20px] text-headingColor font-bold md:absolute md:top-1/2 md:translate-y-[-50%] md:left-8">
          {webUrl}
        </p>
        <div>
          <input
            className="w-full h-full pr-2 focus:outline-none md:py-6 md:pl-[208px] rounded-[200px] md:text-[20px] text-headingColor font-bold placeholder:font-medium shadow-[8px_8px_32px_0px_rgba(34,34,34,0.13)] md:shadow-none py-4 px-10 pl-[53%] text-sm"
            {...register("username")}
            type="text"
            name="username"
            id="username"
            placeholder="username here"
          />
        </div>
        <button
          type="submit"
          className="text-base w-full md:w-auto md:absolute md:right-2 top-1/2 md:translate-y-[-50%] mt-3 md:mt-0"
        >
          <ButtonPrimary text={btnText} fontSize="18px" />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
