import { useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end">
      <div className="w-10/12 h-full sm:min-w-full md:min-w-80 md:min-h-screen lg:max-w-80 xl:max-w-80">
        <div className="md:pt-2 xl:pt-3">
          <div className="font-sans font-semibold md:mt-2 xl:mt-5 text-4xl">
            Sign Up
          </div>
          <div className="font-sans text-base py-3 font-medium">
            Join us today and start exploring
          </div>
          <div className="font-sans mt-2 text-lg font-semibold mb-1.5">
            Email ID
          </div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="block w-full rounded-lg border-0  py-3.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter Email ID"
          />

          <div className="font-sans text-lg font-semibold md:mt-2 xl:mt-5 mb-1.5">
            Password
          </div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="block w-full rounded-lg border-0 py-3.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter Password"
          />
          <div className="font-sans text-lg font-semibold md:mt-2 xl:mt-5 mb-1.5">
            Confirm Password
          </div>
          <input
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="text"
            className="block w-full rounded-lg border-0 py-3.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Confirm Password"
          />
          <button className="bg-slate-800 text-white font-semibold text-xl pt-3 pb-4 px-4 rounded-lg w-full md:mt-4 xl:mt-8">
            Sign Up
          </button>
          <div className="text-center font-sans text-base text-gray-500 md:mt-11 lg:mt-15 xl:mt-8 mb-7">
            Already have an account?
            <span
              className="font-sans font-medium text-base text-cyan-500 cursor-pointer  underline-offset-2 ml-2"
              onClick={() => router.push("/")}
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
