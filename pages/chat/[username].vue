<script setup>
    import axios from 'axios';

    import { io } from "socket.io-client";
    const socket = io("http://localhost:3002");
    
    const { username } = useRoute().params

    const messages_container = ref([])
    // let isMessageLoading = ref(false)

    function scrollToBottom() {//the DOM can't read the ref syntax from vue so I just used query selector to not display any error
        const container = document.querySelector("#container")
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        }) 
    }

    socket.on("addChat", async (data) => {
        console.log("Received chat")
        const index = messages_container.value.findIndex((obj) => obj.content === data.convo.content && obj.sender === data.convo.sender && obj.isLoading == true);
        // console.log(messages_container.value[index]) UNDEFINED SA OTHER USERS SHEMPRE SAYO MO LANG TO MAKIKITA
        if (index !== -1){
            messages_container.value[index]['isLoading'] = false
        }else {         
            messages_container.value.push(data.convo)   
        }
        //messages_container.value.push(data.convo)
        //isMessageLoading.value = false
        await nextTick()
        scrollToBottom()
    })  

    let currentToken
    let currentlyLoggedIn
    onMounted(() => {    
        currentToken = localStorage.getItem('token')       
        if (currentToken) {
            axios.get('http://localhost:3002/tokenCheck', {
                headers: {
                    Authorization: currentToken
                }
            }).then(res => {
                if (res.data.message === "Valid Token"){
                    messages_container.value = []
                    fetchMessage() 

                } else {
                    console.log("invalid Token")
                    localStorage.clear();
                    const router = useRouter();
                    router.push('/login');
                }                
            })
            
        } else {
            localStorage.clear();
            const router = useRouter();
            router.push('/login');
        }
    }); 

    function fetchMessage(){
        axios.get(`http://localhost:3002/chat/${username}`, {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).then(async (res) => {            
            messages_container.value = res.data.convo.messages
            socket.emit("join_room", {
                sender: res.data.convo.conversing[1],
                receiver: res.data.convo.conversing[0]
            })

            await nextTick()
            scrollToBottom()
        });
    }

    const message = ref("")
    
    async function sendMessage(){ 
        currentlyLoggedIn = localStorage.getItem('currentlyLoggedIn')

        messages_container.value.push({
            content: message.value,
            sender: currentlyLoggedIn,
            isLoading: true
        }) 

        await nextTick()
        scrollToBottom()            
        axios.post(`http://localhost:3002/chat/${username}`,{content: message.value},{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(async (res) => { 
            console.log("backend is done. now emiting to sockets")
            socket.emit("chat",{
                content: res.data.content,
                sender: res.data.sender,
                receiver: username.toString()
            })
    
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
            socket.emit("logout", {username: res.data.username})
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
            <div class="flex flex-col border-white border h-5/6 overflow-auto my-4" id="container">
                <div v-for="(message, index) in messages_container" :key="index" class="flex mx-4 my-2" :class="`${message.sender == username ? 'justify-start' : 'justify-end'}`">
                    <!-- container -->
                    <div :class="`${message['isLoading'] == true ? 'animate-pulse opacity-80' : ''} ${message.sender == username ? 'bg-zinc-500 text-white' : 'bg-white text-black'}`" class="rounded-lg px-2 h-auto max-w-[70%]">
                        <p class="break-words">
                            {{message.content}}
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



  

