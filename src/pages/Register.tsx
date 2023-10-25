import { Link } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerUserAsync } from "../store/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {

    type Inputs = {
        name: string;
        email: string;
        password: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.user.isLoggedIn);

    const onSubmit: SubmitHandler<Inputs> = (data) => dispatch(registerUserAsync(data));

    useEffect(() => {
        isLoggedIn ? navigate("/") : <Register />;
    }, [isLoggedIn, navigate]);

    return (<>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Register</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input 
                                        {...register("name", { required: true })}
                                        autoComplete="off" id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Full Name" />
                                        <label htmlFor="name" 
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Full Name</label>
                                    </div>
                                    {errors.name && <span className='text-sm text-red-600'>This field is required</span>}
                                    <div className="relative">
                                        <input 
                                        {...register("email", { required: true })}
                                        autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label htmlFor="email" 
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    {errors.email && <span className='text-sm text-red-600'>This field is required</span>}
                                    <div className="relative">
                                        <input autoComplete="off" 
                                        {...register("password", { required: true })}
                                        id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    {errors.password && <span className='text-sm text-red-600'>This field is required</span>}
                                    <div className="mt-4"><Link to="/login" className="underline text-sm font-semibold">Already registered? Login Now</Link></div>

                                    <div className="flex justify-center">
                                        <button className="bg-black hover:bg-gray-800 text-white font-bold rounded-md px-4 py-2 transition duration-300 ease-in-out">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Register