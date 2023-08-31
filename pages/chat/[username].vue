<script setup>
    import axios from 'axios';
    import { io } from "socket.io-client";
    const socket = io("http://localhost:3002");

    const { username } = useRoute().params

    const messages_container = ref([])

    function scrollToBottom() {
        container.value.scrollTo({
            top: container.value.scrollHeight,
            behavior: 'smooth'
        }) 
    }

    let currentToken
    onMounted(async () => {    
        currentToken = localStorage.getItem('token')

        if (currentToken) {
            messages_container.value = []
            fetchMessage() 
        } else {
            localStorage.clear();
            const router = useRouter();
            router.push('/login');
        }
    }); 

    const message = ref("")

    const container = ref(null); // Reference to the chat container element

    function fetchMessage(){
        axios.get(`http://localhost:3002/chat/${username}`, {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).then(async (res) => {            
            messages_container.value = res.data.convo
            await nextTick()
            scrollToBottom()      
        });
    }

    function sendMessage(){ 
        axios.post(`http://localhost:3002/chat/${username}`,{content: message.value},{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {  
            socket.emit("chat",{
                "content": res.data.content,
                "sender": res.data.sender,
                "receiver": username.toString()
            })  
        }) 
         
        socket.on("addChat",async (data) => {
            messages_container.value.push(data.convo)
            await nextTick()
            scrollToBottom()
        })  
        

        message.value = ""
    }

    function goBack(){
        const router = useRouter(); 
        router.push('/chat'); 
    }

    function logout(){
        axios.post('http://localhost:3002/logout', {},{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            localStorage.clear()
            const router = useRouter(); 
            router.push('/login');             
        })
    }
</script>

<template>
    <!-- opaque background -->
    <div class="relative w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <!-- parent -->
    <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <!-- green bg -->
        <div class="flex flex-col p-8 w-[80vh] h-[90vh] shadow rounded-lg overflow-hidden bg-green-500"> 
            <div class="flex justify-between">
                <div class="text-4xl text-white">
                    {{ username }}
                </div> 

                <div class="flex justify-end">
                    <button @click="goBack" class="text-black bg-yellow-500 rounded-md h-11 w-20">
                        GO BACK
                    </button>

                    <button @click="logout" class="text-white bg-red-500 rounded-md h-11 w-20">
                        LOGOUT
                    </button>
                </div>
            </div>
            
            <!-- child -->
            <div class="flex flex-col border-white border h-5/6 overflow-auto my-4" ref="container">
                <div v-for="(messages, index) in messages_container" :key="index" class="flex mx-4 my-2" :class="`${messages.sender == username ? 'justify-start' : 'justify-end'}`">
                    <!-- container -->
                    <div :class="`${messages.sender == username ? 'bg-zinc-500 text-white' : 'bg-white text-black'}`" class="rounded-lg px-2 h-auto max-w-[70%]">
                        <p class="break-words">
                            {{messages.content}}
                        </p>                        
                    </div>                    
                </div>                              
            </div>    

            <form @submit.prevent="sendMessage">
                <input v-model="message" type="text" id="text" placeholder="Say something" class="rounded-md border border-[#E6E6E6] h-11 w-full indent-3.5 focus:outline-none" autocomplete="off" required>
                <button type="submit"></button>
            </form>            
        </div>
    </div>
</template>



  

