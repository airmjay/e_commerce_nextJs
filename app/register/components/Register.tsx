import Link from "next/link";
const Register = () => {
    return (
        <div className="relative">
            <Link
                href="/"
                className="inline-block mt-2 text-blue-500 mx-8 button-color hover:text-blue-300 text-white p-2"
            >
                Home
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-12 m-8 justify-center">
                <div className="shadow md:col-span-5 h-[100vh] hidden md:block">
                    <img
                        className="h-[100%] w-[100%]"
                        src="images/Login.png"
                        alt="login image"
                    />
                </div>
                <div className="shadow md:col-span-7 flex flex-col gap-2 justify-center">
                    <h2 className="text-center font-extrabold text-2xl text-gray-500">
                        Register Page
                    </h2>
                    <div className="form-group px-8">
                        <label htmlFor="email" className="text-gray-500">
                            Enter your email
                        </label>
                        <div className="items-center flex p-2 bg-white rounded shadow">
                            <i className="fa-solid fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                className="bg-transparent outline-0 w-full p-2"
                                placeholder="Enter your email e.g email@gmail.com"
                            />
                        </div>
                    </div>
                    <div className="form-group px-8">
                        <label htmlFor="password" className="text-gray-500">
                            Enter your Password
                        </label>
                        <div className="items-center flex p-2 bg-white rounded shadow">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                className="bg-transparent outline-0 w-full p-2"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <div className="flex gap-1 px-8">
                        <input
                            type="checkbox"
                            className="border p-1 bg-orange-400"
                        />
                        <span> Remember Me </span>
                    </div>
                    <div className="px-8">
                        <button className="w-full button-color hover:bg-blue-500 hover:text-gray-700 p-2 text-white outline-0 border-0">
                            Signup
                        </button>
                    </div>
                    <hr className="bg-gray-400 my-1" />
                    <div className="px-8 text-center text-gray-500">
                        Already have an account:
                        <Link
                            className="underline text-blue-500"
                            href="/register"
                        >
                            SignIn
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
