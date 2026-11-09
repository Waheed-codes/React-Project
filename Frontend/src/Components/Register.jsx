import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
const BASE_URL="https://mdwaheed.dev"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function handleRegister(e) {

        e.preventDefault()
        try {
            const response = await axios.post(
                `${BASE_URL}/user/register`,
                {
                    email: email,
                    password: password,
                }
            );
            console.log(response.data)
            setEmail("")
            setPassword("")
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/todo")

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <form onSubmit={handleRegister}>
                <label htmlFor="email" className="text-xl font-medium text-center text-black-500">Email</label>
                <input type="email" placeholder="Email Address" id="email" className="border rounded-lg p-2 w-full mr-4 mb-3 outline-none focus:border-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password" className="text-xl font-medium text-center text-black-500">Create-password</label>
                <input type="password" className="border rounded-lg p-2 w-full mr-4 outline-none border-gray-500 text-black-500" required placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} id="password" />
                <div className="flex justify-center mt-3">
                    <button className="border-2 border-black rounded-full px-1 py-1 cursor-pointer transition text-black hover:bg-mauve-500 hover:text-white">Create Account</button>
                </div>
                <p className="text-sm text-black-200">Already have an account ?<Link to="/login" className="underline">Login</Link></p>
            </form>
        </div>
    )
}