import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

function EditProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profileUrl, setProfileUrl] = useState('https://images.unsplash.com/photo-1721332149274-586f2604884d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1729432536160-d4ba057b61d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
  const [permission, setPermission] = useState(false)
  const [category, setCategory] = useState('')
  const [currency, setCurrency] = useState('')

  const onSubmit = (data) => {
    console.log({...data, profileUrl, permission, category, currency, coverUrl});
  };

  //currency
  const handleCurrencyValue = (value) => {
    setCurrency(value)
  }

 //category
  const handleCategoryValue = (value) => {
    setCategory(value)
  }

  //cover
  const handleCover = (e) => {
    const selectedFile = e.target.files[0]
    if(selectedFile) {
        const url = URL.createObjectURL(selectedFile)
        setCoverUrl(url)
    }
  }

  //profile
  const handleProfile = (e) => {
    const selectedFile = e.target.files[0]
    if(selectedFile) {
        const url = URL.createObjectURL(selectedFile)
        setProfileUrl(url)
    }
  }

  //permission
  const handleCheckedChange = (checked) => {
    setPermission(checked)
  }
  
  // error
  console.log(errors);


  return (
    <Dialog className="">
      <DialogTrigger asChild className="w-full">
        <button className="lg:px-12 px-14 py-3 bg-primaryColor rounded-full text-textDark font-bold text-sm lg:text-sm">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-5xl max-w-lg h-full p-2 scrollbar-hide overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="p-0 ">
            <div className="relative pt-4">
              <h3 className="text-2xl  font-semibold text-textDark text-center ">
                Edit Profile
              </h3>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="py-4 ">
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className="relative">
              {/* cover photo */}
              <div>
                <input
                  className="hidden"
                  type="file"
                  name="coverPhoto"
                  id="coverPhoto"
                  onChange={handleCover}
                />
                <label className="w-full " htmlFor="coverPhoto">
                  <div className="w-full relative h-[200px] lg:h-[300px]">
                    <img
                      className="w-full  h-full object-cover"
                      src={coverUrl}
                      alt=""
                    />
                    <div className="absolute cursor-pointer px-3 py-1 rounded-full bg-white flex items-center gap-2 font-medium text-textDark bottom-5 right-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          opacity="0.8"
                          d="M13.5025 6.59524L13.5024 6.59709L13.1558 12.1036C13.1558 12.1037 13.1557 12.1037 13.1557 12.1038C13.1217 12.6436 12.967 13.0176 12.7511 13.2484C12.5544 13.4586 12.1987 13.6666 11.4938 13.6666H4.5071C3.80179 13.6666 3.44416 13.4583 3.24664 13.2476C3.03073 13.0173 2.87665 12.6448 2.84541 12.1084L2.84542 12.1084L2.84513 12.1038L2.49846 6.59709L2.49834 6.59524C2.44255 5.73443 3.12883 4.99992 4.00044 4.99992C4.79074 4.99992 5.501 4.54935 5.85486 3.8669L5.85888 3.85915L5.86276 3.85133L6.3407 2.88881C6.39379 2.78533 6.52362 2.63574 6.72793 2.50916C6.93369 2.38169 7.125 2.33325 7.24044 2.33325H8.7671C8.87761 2.33325 9.06685 2.38063 9.2728 2.50856C9.47691 2.63533 9.60699 2.78514 9.66016 2.88879L10.1381 3.85133L10.142 3.85915L10.146 3.8669C10.4999 4.54935 11.2101 4.99992 12.0004 4.99992C12.872 4.99992 13.5583 5.73443 13.5025 6.59524Z"
                          fill="#1F2022"
                          stroke="#1F2022"
                          strokeWidth="2"
                        />
                        <mask id="path-2-inside-1_9649_9881" fill="white">
                          <path d="M9 5.83325H7C6.72667 5.83325 6.5 5.60659 6.5 5.33325C6.5 5.05992 6.72667 4.83325 7 4.83325H9C9.27333 4.83325 9.5 5.05992 9.5 5.33325C9.5 5.60659 9.27333 5.83325 9 5.83325Z" />
                        </mask>
                        <path
                          d="M9 5.83325H7C6.72667 5.83325 6.5 5.60659 6.5 5.33325C6.5 5.05992 6.72667 4.83325 7 4.83325H9C9.27333 4.83325 9.5 5.05992 9.5 5.33325C9.5 5.60659 9.27333 5.83325 9 5.83325Z"
                          fill="white"
                        />
                        <path
                          d="M9 3.83325H7V7.83325H9V3.83325ZM7 3.83325C7.83124 3.83325 8.5 4.50202 8.5 5.33325H4.5C4.5 6.71115 5.6221 7.83325 7 7.83325V3.83325ZM8.5 5.33325C8.5 6.16449 7.83124 6.83325 7 6.83325V2.83325C5.6221 2.83325 4.5 3.95535 4.5 5.33325H8.5ZM7 6.83325H9V2.83325H7V6.83325ZM9 6.83325C8.16876 6.83325 7.5 6.16449 7.5 5.33325H11.5C11.5 3.95535 10.3779 2.83325 9 2.83325V6.83325ZM7.5 5.33325C7.5 4.50202 8.16876 3.83325 9 3.83325V7.83325C10.3779 7.83325 11.5 6.71115 11.5 5.33325H7.5Z"
                          fill="white"
                          mask="url(#path-2-inside-1_9649_9881)"
                        />
                        <path
                          d="M8.0004 12.0867C9.24489 12.0867 10.2537 11.0779 10.2537 9.83341C10.2537 8.58893 9.24489 7.58008 8.0004 7.58008C6.75592 7.58008 5.74707 8.58893 5.74707 9.83341C5.74707 11.0779 6.75592 12.0867 8.0004 12.0867Z"
                          fill="white"
                        />
                      </svg>
                      <h4 className="lg:text-sm text-xs font-medium ">Edit Cover Photo</h4>
                    </div>
                  </div>
                </label>
              </div>
              {/* profile photo */}
              <div className="absolute -bottom-8 left-1/2  -translate-x-1/2">
                <input
                  className="hidden"
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  onChange={handleProfile}
                />
                <label htmlFor="profilePhoto">
                  <div className=" rounded-full cursor-pointer group relative overflow-hidden size-20 lg:size-28">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={profileUrl}
                      alt=""
                    />
                    <div className="absolute hidden group-hover:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path
                          opacity="0.8"
                          d="M28.002 13.2554L28.0019 13.2573L27.3085 24.2704C27.3085 24.2705 27.3085 24.2705 27.3085 24.2706C27.2311 25.4971 26.8714 26.4961 26.2314 27.1802C25.6105 27.8438 24.6115 28.3334 22.9866 28.3334H9.01323C7.38791 28.3334 6.38528 27.8435 5.76277 27.1795C5.12185 26.4958 4.76278 25.4982 4.69155 24.2753L4.69126 24.2706L3.99792 13.2573L3.9978 13.2554C3.84868 10.9546 5.68162 9.00008 7.9999 9.00008C9.19687 9.00008 10.2805 8.31618 10.821 7.27373L10.825 7.26598L10.8289 7.25816L11.7872 5.32832C11.9933 4.9223 12.3995 4.49604 12.9282 4.16849C13.4581 3.84018 14.0211 3.66675 14.4799 3.66675H17.5332C17.9837 3.66675 18.543 3.83913 19.0723 4.16789C19.6 4.4957 20.0065 4.92227 20.2127 5.32852C20.2132 5.32941 20.2137 5.33031 20.2141 5.33121L21.1709 7.25816L21.1748 7.26598L21.1788 7.27373C21.7193 8.31618 22.8029 9.00008 23.9999 9.00008C26.3182 9.00008 28.1511 10.9546 28.002 13.2554Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <mask id="path-2-inside-1_9649_9847" fill="white">
                          <path d="M18 11.6667H14C13.4533 11.6667 13 11.2134 13 10.6667C13 10.1201 13.4533 9.66675 14 9.66675H18C18.5467 9.66675 19 10.1201 19 10.6667C19 11.2134 18.5467 11.6667 18 11.6667Z" />
                        </mask>
                        <path
                          d="M18 11.6667H14C13.4533 11.6667 13 11.2134 13 10.6667C13 10.1201 13.4533 9.66675 14 9.66675H18C18.5467 9.66675 19 10.1201 19 10.6667C19 11.2134 18.5467 11.6667 18 11.6667Z"
                          fill="white"
                        />
                        <path
                          d="M18 9.66675H14V13.6667H18V9.66675ZM14 9.66675C14.5579 9.66675 15 10.1088 15 10.6667H11C11 12.318 12.3488 13.6667 14 13.6667V9.66675ZM15 10.6667C15 11.2247 14.5579 11.6667 14 11.6667V7.66675C12.3488 7.66675 11 9.01551 11 10.6667H15ZM14 11.6667H18V7.66675H14V11.6667ZM18 11.6667C17.4421 11.6667 17 11.2247 17 10.6667H21C21 9.01551 19.6512 7.66675 18 7.66675V11.6667ZM17 10.6667C17 10.1088 17.4421 9.66675 18 9.66675V13.6667C19.6512 13.6667 21 12.318 21 10.6667H17Z"
                          fill="white"
                          mask="url(#path-2-inside-1_9649_9847)"
                        />
                        <path
                          d="M15.9998 24.1732C18.4888 24.1732 20.5065 22.1555 20.5065 19.6666C20.5065 17.1776 18.4888 15.1599 15.9998 15.1599C13.5109 15.1599 11.4932 17.1776 11.4932 19.6666C11.4932 22.1555 13.5109 24.1732 15.9998 24.1732Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="space-y-3 px-8 lg:px-60 pt-8">
              {/* full name */}
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="px-5 py-3.5 w-full focus:outline-none rounded-lg text-textColor text-sm border bg-gray-50"
                  type="text"
                  name="fullName"
                  id="fullName"
                  {...register("fullName", { required: true })}
                />
              </div>
              {/* category */}
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="creating"
                >
                  Category
                </label>
                <Select onValueChange={handleCategoryValue}>
                  <SelectTrigger className="w-full py-6 bg-gray-50 px-5">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="musician">Musician</SelectItem>
                    <SelectItem value="youtuber">Youtuber</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* creating */}
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="creating"
                >
                  What you are creating?
                </label>
                <input
                  className="px-5 py-3.5 w-full focus:outline-none rounded-lg text-textColor text-sm border bg-gray-50"
                  type="text"
                  name="creating"
                  id="creating"
                  {...register("creating", { required: true })}
                />
              </div>
              {/* currency */}
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="creating"
                >
                  Currency
                </label>
                <Select onValueChange={handleCurrencyValue}>
                  <SelectTrigger className="w-full py-6 bg-gray-50 px-5">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">Usd</SelectItem>
                    <SelectItem value="EURO">Euro</SelectItem>
                    <SelectItem value="BDT">Bdt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* choose theme */}
              <div className="flex flex-col gap-2.5">
                <label
                  className="text-textColor font-semibold "
                  htmlFor="themeColor"
                >
                  Chose a theme of your page
                </label>
                <div className="flex items-center gap-2">
                  <input
                    className="appearance-none size-8 cursor-pointer bg-teal-400 checked:after:content-['✓'] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 text-white font-bold relative rounded-full"
                    type="radio"
                    name="themeColor"
                    value={'teal'}
                    id=""
                    {...register("themeColor", { required: true })}
                  />
                  <input
                    className="appearance-none size-8 cursor-pointer bg-green-400 checked:after:content-['✓'] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 text-white font-bold relative rounded-full"
                    type="radio"
                    name="themeColor"
                    value={'green'}
                    id=""
                    {...register("themeColor", { required: true })}
                  />
                  <input
                    className="appearance-none size-8 cursor-pointer bg-pink-400 checked:after:content-['✓'] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 text-white font-bold relative rounded-full"
                    type="radio"
                    name="themeColor"
                    value={'pink'}
                    id=""
                    {...register("themeColor", { required: true })}
                  />
                  <input
                    className="appearance-none size-8 cursor-pointer bg-orange-400 checked:after:content-['✓'] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 text-white font-bold relative rounded-full"
                    type="radio"
                    name="themeColor"
                    value={'orange'}
                    id=""
                    {...register("themeColor", { required: true })}
                  />
                  <input
                    className="appearance-none size-8 cursor-pointer bg-yellow-400 checked:after:content-['✓'] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 text-white font-bold relative rounded-full"
                    type="radio"
                    value={'yellow'}
                    name="themeColor"
                    id=""
                    {...register("themeColor", { required: true })}
                  />
                  <input
                    className="appearance-none size-8 cursor-pointer bg-blue-400 checked:after:content-['✓'] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 text-white font-bold relative rounded-full"
                    type="radio"
                    value={'blue'}
                    name="themeColor"
                    id=""
                    {...register("themeColor", { required: true })}
                  />
                </div>
              </div>
              {/* toggle */}
              <div className="flex items-center pt-2 gap-3">
                <Switch onCheckedChange={handleCheckedChange} />
                <label className="flex flex-col gap-2" htmlFor="">
                  <h4 className="text-textDark font-medium">
                    Display supporter count
                  </h4>
                  <p className="text-xs  text-textColor">
                    Publicizing supporter count shows credibility and inspires
                    more support from your audience.
                  </p>
                </label>
              </div>
              {/* social links */}
              <div className="pt-4 flex flex-col gap-4">
                <div className="flex px-4 py-3 rounded-lg bg-gray-50 divide-x gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5.3665 1.66669H14.6248C17.5915 1.66669 18.3332 2.40835 18.3332 5.36669V10.6417C18.3332 13.6084 17.5915 14.3417 14.6332 14.3417H5.3665C2.40817 14.35 1.6665 13.6084 1.6665 10.65V5.36669C1.6665 2.40835 2.40817 1.66669 5.3665 1.66669Z"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14.35V18.3333"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.6665 10.8333H18.3332"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.25 18.3333H13.75"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    className=" px-4 w-full focus:outline-none bg-gray-50"
                    placeholder="@link"
                    type="text"
                    name="link1"
                    id="link1"
                    {...register("link1", { required: true })}
                  />
                </div>
                <div className="flex px-4 py-3 rounded-lg bg-gray-50 divide-x gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"          
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.33602 17C5.37192 17 3.54103 16.4273 2 15.4391C3.30839 15.524 5.6174 15.3207 7.0536 13.9473C4.89308 13.8479 3.91873 12.1866 3.79164 11.4767C3.97521 11.5477 4.85072 11.6329 5.34496 11.4341C2.85965 10.8093 2.47838 8.62272 2.56311 7.95538C3.02911 8.28195 3.81988 8.39554 4.13055 8.36714C1.8147 6.70588 2.64784 4.2069 3.05735 3.66734C4.71929 5.97571 7.21002 7.27217 10.2914 7.34429C10.2333 7.08883 10.2026 6.82286 10.2026 6.5497C10.2026 4.58925 11.7831 3 13.7329 3C14.7515 3 15.6695 3.43385 16.3138 4.12781C16.9946 3.96789 18.019 3.59352 18.5199 3.26978C18.2674 4.1785 17.4815 4.93656 17.0061 5.21753C17.0022 5.20792 17.01 5.22708 17.0061 5.21753C17.4237 5.1542 18.5536 4.93648 19 4.63286C18.7793 5.14337 17.946 5.99218 17.2622 6.46739C17.3894 12.0927 13.0964 17 7.33602 17Z"
                      fill="#47ACDF"
                    />
                  </svg>
                  <input
                    className=" px-4 w-full focus:outline-none bg-gray-50"
                    placeholder="@link"
                    type="text"
                    name="link2"
                    id="link2"
                    {...register("link2", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 px-8">
              <button
                type="submit"
                className="text-sm px-6 py-3 rounded-full bg-primaryColor text-textDark font-semibold "
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileForm;
