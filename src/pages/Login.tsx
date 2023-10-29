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
import { loginUserAsync } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Login() {
    type Inputs = {
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

    const onSubmit: SubmitHandler<Inputs> = (data) => dispatch(loginUserAsync(data));

    useEffect(() => {
        isLoggedIn ? navigate("/") : <Login />;
    }, [isLoggedIn, navigate]);
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email and password below
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
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
                                    Don't have an account yet ?
                                </span>
                                <Link to={'/register'} className="bg-background font-medium">
                                    Create an account</Link>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Login</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}