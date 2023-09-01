<script setup>
    import axios from "axios"
    import { io } from "socket.io-client";
    const socket = io("http://localhost:3002");

    const user = ref({
        username: "",
        password: ""
    })

    let currentToken
    onMounted(() => {
        currentToken = localStorage.getItem('token')
        if( !currentToken ){
            const router = useRouter();
            router.replace('/login');  
        }
        else{
            const router = useRouter();
            router.replace('/chat');    
        }
    })
    
    function login(){  
        axios.post('http://localhost:3002/login', {username: user.value.username, password: user.value.password}).then(res => {
            if(res.data.status === false){
                alert(res.data.message)
                return false     
            }

            socket.emit("sign_in", {username : res.data.username})

            alert(res.data.message)
            localStorage.clear()
            localStorage.setItem('token', res.data.token)
           
            const router = useRouter(); // Get the router instance
            router.push('/chat'); // Navigate to the login page

            user.value.username = ""
            user.value.password = "" 
        })     
    } 
</script>

<template>
    <div class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div class="flex justify-center items-center w-[550px] h-[400px] shadow rounded-lg overflow-hidden bg-green-400">
            <form @submit.prevent="login" class="w-[60%] h-50 p-10 border rounded flex flex-col items-center gap-10 bg-white">
                <!-- User Name -->
                <div>
                    <label for="username" class="block font-normal text-[#766E6E]">User Name</label>
                    <input v-model="user.username" type="text" id="username" class="w-full border border-gray-300 px-3 py-1 rounded focus:outline-none focus:border-indigo-500" required/>
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block font-normal text-[#766E6E]">Password </label>
                    <input v-model="user.password" type="password" id="password" class="w-full border border-gray-300 px-3 py-1 rounded focus:outline-none focus:border-indigo-500" required/>
                </div>  
                
                <!-- buttons and login page -->
                <div class="flex justify-items-center">
                    <button type="submit" value="Submit" class="rounded w-24 h-16 bg-green-500 mx-2 text-lg text-white">
                        Login
                    </button>

                    <div class="text-md text-blue-600 flex justify-center items-center">
                        <NuxtLink to="/" class="hover:border-black hover:opacity-50">
                            Make an account
                        </NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>