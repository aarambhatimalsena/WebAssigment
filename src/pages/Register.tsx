import "../assets/css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    role: string;
}

function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    // Watch password and confirmPassword fields
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const onSubmit = async (data: FormData) => {
        try {
            // Default role to "admin" if not provided
            data.role = "admin";

            // Make API call using Axios
            const response = await axios.post('http://localhost:8080/api/users/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the API response indicates success
            if (response.data.success) {
                toast.success('Registration successful!');
                alert("Registration successful")
                console.log('Registration successful');
                // Navigate to login page after successful registration
                navigate('/login');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error: any) {
            console.error('Error during registration', error);
            toast.error(`Error: ${error.response?.data || error.message}`);
        }
    };

    return (
        <div className={"register-container"}>
            <div className={"r-Signup-form"}>
                <div className={"r-Head"}>
                    <img
                        src={"images/logo.png"}
                        alt={"logo"}
                    />
                    <h1>Signup</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"r-Body"}>
                        <input
                            type={"text"}
                            placeholder={"First Name"}
                            {...register("firstName", { required: true })}
                        />
                        <input
                            type={"text"}
                            placeholder={"Last Name"}
                            {...register("lastName", { required: true })}
                        />
                        <input
                            type={"email"}
                            placeholder={"Email"}
                            {...register("email", { required: true })}
                        />
                        <input
                            type={"password"}
                            placeholder={"Password"}
                            {...register("password", { required: true })}
                        />
                        <input
                            type={"password"}
                            placeholder={"Confirm Password"}
                            {...register("confirmPassword", { required: true })}
                        />
                        {password && confirmPassword && password !== confirmPassword && (
                            <p style={{ color: 'red' }}>Passwords do not match</p>
                        )}
                        <input
                            type={"text"}
                            placeholder={"Phone Number"}
                            {...register("phoneNumber", { required: true })}
                        />
                        <input
                            type={"hidden"}
                            {...register("role")}
                            value="admin"
                        />
                    </div>
                    <div className={"r-Footer"}>
                        <div className={"r-checkbox"}>
                            <label>
                                <input type="checkbox" name="remember_me" required /> I have read and accept the terms and conditions and privacy policy.
                            </label>
                        </div>
                        <div className={"r-button"}>
                            <button type="submit">Register Now</button>
                        </div>
                        <span style={{ textAlign: "center" }}>
                            Already Have an account? <Link to="/login">Login</Link>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
