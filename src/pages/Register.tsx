import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { registerUserAsync } from "@/store/features/user/userSlice"

export default function Register() {
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
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">Create an account</CardTitle>
                            <CardDescription>
                              Enter your email below to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="name" placeholder="Full name" 
                                 {...register("name", { required: true })} // Add required attribute
                                />
                            </div>
                            {errors.name && <span className='text-sm text-red-600'>This field is required</span>}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" 
                                 {...register("email", { required: true })} // Add required attribute
                                />
                            </div>
                            {errors.email && <span className='text-sm text-red-600'>This field is required</span>}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" 
                                 {...register("password", { required: true })}
                                />
                            </div>
                            {errors.password && <span className='text-sm text-red-600'>This field is required</span>}
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground ">
                                    Already have an account ?
                                </span>
                                <Link to={'/login'} className="bg-background font-medium">
                                    Login</Link>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Create account</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}