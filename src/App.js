import './App.css'
import React, {useEffect, useRef, useState} from "react"
import { Button, TextInput } from '@mantine/core'
import Home from './Home'
function ToDo() {
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const [showHome, setShowHome] = useState(false)
    const localSingUp = localStorage.getItem("SingUp")
    useEffect(()=>{
        if(localSingUp){
            setShowHome(true)
        }
    })
    const handleClick =() => {
        if(username.current.value && email.current.value && password.current.value )
        {
            localStorage.setItem("username",username.current.value)
            localStorage.setItem("email",email.current.value)
            localStorage.setItem("password",password.current.value)
            localStorage.setItem("SingUp",email.current.value)
            alert("Account created successfully!")
            window.location.reload()
        }
    }

    const handleSignIn =() => {
        if(email.current.value && password.current.value){
            localStorage.setItem("SingUp",email.current.value)
            window.location.reload()
        }
    }

    return (
        <div>
            {showHome?<Home />:
            <div className={"container"}>
                    <div className="input_space">
                        <TextInput
                        size="xl"
                        radius="xl"
                        placeholder="username"
                        ref={username}
                    />
                    </div>
                <div className="input_space">
                    <TextInput
                        size="xl"
                        radius="xl"
                        placeholder="email"
                        ref={email}
                    />
                </div>
                <div className="input_space">
                    <TextInput
                        size="xl"
                        radius="xl"
                        placeholder="password"
                        ref={password}
                    />
                </div>
                    <Button onClick={handleClick} variant="filled" color="teal" size="md" radius="xl">verification</Button>
            </div>
            }
        </div>
    )
}
export default ToDo;
