<script setup>
    import axios from 'axios';

    const users_list = ref([])
    let filteredUsers = ref([])
    onMounted(() => {
        axios.get('http://localhost:3002/chat').then(res => {
            users_list.value.push(...res.data.users)
            filteredUsers.value = users_list.value.filter(user => user.username !== res.data.currentlyLoggedIn);            
        })
    })

    function chatUser(username){ 
        axios.post('http://localhost:3002/chat', {username: username}).then(res =>{
            alert(res.data.message)
        }) 
           
        const router = useRouter(); 
        router.push(`/chat/${username}`); 
    }

</script>

<template>
    <div class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div class="p-10 w-[900px] h-[90vh] shadow rounded-lg overflow-hidden bg-green-500">
            <div class="flex justify-between">
                <div class="text-4xl text-white mb-4">MESSAGES</div>
                
                <button class="text-white bg-red-500 rounded-md h-11 w-20">Logout</button>
            </div>
            
            
            <form>
                <div class="relative overflow-hidden">
                    <input type="text" placeholder="Search a friend" class="mb-4 rounded-md border border-[#E6E6E6] h-11 w-full indent-3.5 focus:outline-none">
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
                        
                        <!-- active status -->
                        <div :class="`${user.status == 'Logged in' ? 'bg-green-500': 'bg-red-500'}`" class="rounded-full w-6 h-6 mr-4">

                        </div>
                    </button>                
                </div>
            </div>
            
        </div>
    </div>
</template>

