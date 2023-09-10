<script setup>
    import axios from 'axios';
    import { io } from "socket.io-client";
    const socket = io("http://localhost:3002");

    const users_list = ref([])
    let filteredUsers = ref([])
    let onlineUsers = ref([])

    socket.on("signin_update", (data) => {                    
        onlineUsers.value = data.onlineUsers
    }) 

    let currentToken
    onMounted(() => {
        currentToken = localStorage.getItem('token')

        if (currentToken){
            axios.get('http://localhost:3002/chat', {
                headers: {
                    Authorization: currentToken
                }
            }).then(res => { 
                if (res.data.message === "Valid Token"){
                    users_list.value.push(...res.data.users)
                    filteredUsers.value = users_list.value.filter(user => user.username !== res.data.currentlyLoggedIn); 
            
                    socket.emit("sign_in", {
                        username : res.data.currentlyLoggedIn
                    })

                    socket.on("allUsers", (data) => {
                        users_list.value = data.mapregisteredUsers
                        filteredUsers.value = users_list.value.filter(user => user.username !== res.data.currentlyLoggedIn); 
                    })
                }  
                
                else {
                    localStorage.clear();
                    const router = useRouter();
                    router.push('/login');   
                }

                
            })
        } 
        else {            
            localStorage.clear();
            const router = useRouter();
            router.push('/login');           
        }
    })

    function chatUser(username){ 
        axios.post('http://localhost:3002/chat',{talkingto: username},{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            alert(res.data.message)
            const router = useRouter(); 
            router.push(`/chat/${username}`); 
        })        
    }

    function checkonlineusers(user){
        return onlineUsers.value.includes(user)
    }

    const searchUser = ref("")
    function search(){
        axios.post('http://localhost:3002/chat', {talkingto: searchUser.value}, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then( res => {
            if (res.data.message){                
                alert(res.data.message)
                const router = useRouter(); 
                router.push(`/chat/${searchUser.value}`);
                searchUser.value = "" 
            }            
            else{
                alert("No user found!")
            }
        })
    }

    function logout(){
        axios.post('http://localhost:3002/logout',{},{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            socket.emit("logout", {username: res.data.username})
            localStorage.clear()
            const router = useRouter(); 
            router.push('/login'); 
        })
    }
</script>

<template>
    <div class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div class="p-10 w-[900px] h-[90vh] shadow rounded-lg overflow-hidden bg-green-500">
            <div class="flex justify-between">
                <div class="text-4xl text-white mb-4">
                    MESSAGES<!-- put the user's name here so I wont be confused -->
                </div>                
                <button @click="logout" class="text-white bg-red-500 rounded-md h-11 w-20">
                    Logout
                </button>
            </div>
            
            
            <form @submit.prevent="search">
                <div class="relative overflow-hidden">
                    <input v-model="searchUser" type="text" placeholder="Search a friend" class="mb-4 rounded-md border border-[#E6E6E6] h-11 w-full indent-3.5 focus:outline-none">
                    <button type="submit" class="absolute right-0 top-0 text-xl h-11 bg-green-300 rounded-md px-3">
                        message
                    </button>                    
                </div>                
            </form>

    
            <div class="border-white border h-4/5 overflow-auto">
                <div @click="chatUser(user.username)" v-for="(user, userindex) in filteredUsers" :key="userindex">
                    <button class="flex justify-between items-center w-full border border-white rounded h-10 bg-zinc-500 text-white text-lg text-center py-1 my-1">
                        <div class="flex items-center">
                            <!-- avatar -->
                            <div class="flex items-center text-center">
                                <div class="flex items-center justify-center ml-4 rounded-full bg-orange-300 w-6 h-6 text-center" >
                                    <span>{{ user.username.charAt(0) }}</span>
                                </div>
                            </div>
                            
                            <!-- username -->
                            <div class="mx-3">
                                {{user.username}}
                            </div>
                        </div>
                        
                        <!-- active/inactive status -->
                        <div :class="`${checkonlineusers(user.username) ? 'bg-green-500': 'bg-red-500'}`" class="rounded-full w-6 h-6 mr-4">

                        </div>
                    </button>                
                </div>
            </div>            
        </div>
    </div>
</template>

