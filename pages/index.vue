<script setup>
    import axios from "axios"
    import { io } from "socket.io-client";
import CheckOtp from "~/components/CheckOtp.vue";
    const socket = io("http://localhost:3002");  
    
    let otpScreen = ref(false)
    
    const adduser = ref({
        username: "", 
        password: ""
    })

    let currentToken 
    onMounted(() => {        
        currentToken = localStorage.getItem('token')       

        if (currentToken) {
            axios.get('http://localhost:3002/tokenCheck', {
                headers: {
                    Authorization: currentToken
                }
            }).then(res => {
                if (res.data.message === "Valid Token"){
                    const router = useRouter();
                    router.push('/chat');
                } else {
                    localStorage.clear();
                    const router = useRouter();
                    router.push('/');
                }                
            })
            
        } else {
            localStorage.clear();
            const router = useRouter();
            router.push('/');
        }
    })

    function register(){
        axios.post('http://localhost:3002/register', {username: adduser.value.username, password: adduser.value.password}).then(res => {
            if (res.data.status === false){
                alert("Username is already existing")
                return false
            }

            socket.emit("registered", {
                username: adduser.value.username,
                password : adduser.value.password
            })

            otpScreen.value = true

            alert(res.data.message)
            adduser.value.username = ""
            adduser.value.password = "" 
            
            const router = useRouter(); 
            router.push('/login'); 
        })
    }
</script>

<template>
    <div class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div class="flex justify-center items-center w-[550px] h-[400px] shadow rounded-lg overflow-hidden bg-green-400">
            <form @submit.prevent="register()" class="w-[60%] h-50 p-10 border rounded flex flex-col items-center gap-10 bg-white">
                <!-- User Name -->
                <div>
                    <label for="username" class="block font-normal text-[#766E6E]">User Name</label>
                    <input v-model="adduser.username" type="text" id="username" class="w-full border border-gray-300 px-3 py-1 rounded focus:outline-none focus:border-indigo-500" required/>
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block font-normal text-[#766E6E]">Password </label>
                    <input v-model="adduser.password" type="password" id="password" class="w-full border border-gray-300 px-3 py-1 rounded focus:outline-none focus:border-indigo-500" required/>
                </div>  
                
                <!-- buttons and login page -->
                <div class="flex justify-items-center">
                    <button type="submit" class="rounded w-24 h-16 bg-green-500 text-white mx-2">
                        Register
                    </button>

                    <div class="text-md text-blue-600 flex justify-center items-center">
                        <NuxtLink to="/login" class="hover:border-black hover:opacity-50">
                            Go to login page
                        </NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>