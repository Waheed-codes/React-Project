import { Link, useNavigate } from "react-router"
import { useState } from "react"
import axios from "axios"
const BASE_URL="https://mdwaheed.dev"
export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await axios.post(
                `${BASE_URL}/user/login`,
                {
                    email,
                    password
                }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/todo");

        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <form onSubmit={handleLogin}>
                
                <div>
                    <label htmlFor="email" className="text-xl font-medium text-center text-black-500">Email:</label>
                    <input type="email" placeholder="Enter your email" id="email"
                        classvalue={email}
                        onChange={(e) => setEmail(e.target.value)} required  className="border rounded-lg p-2 w-full mr-4 outline-none focus:border-gray-500 mb-2 mt-2"/>
                    <label htmlFor="password"className="text-xl font-medium text-center text-black-500">Password</label>
                    <input type="password" placeholder="Enter your password" id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required className="border rounded-lg mt-2 p-2 w-full mr-4 outline-none border-gray-500"/>
                        <p  className="text-sm text-black-200 mt-4">Don't have an account?
                    <Link to="/register"className="underline">Register</Link>
                </p>
                <div className="flex justify-center mt-3">
                     <button className="border-2 border-black rounded-full px-3 py-1 cursor-pointer transition text-black hover:bg-mauve-500 hover:text-white">Login</button>
                </div>
                
                </div>
            </form>
        </div>
    )

}