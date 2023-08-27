<script setup>
    const { username } = useRoute().params

    const messages_container = ref([])

    const message = ref({
        content: "",
        sender_username: username
    })

    function sendMessage(){
        messages_container.value.push({
            content: message.value.content,
            sender_username: message.value.sender_username
        })

        message.value.content = ""
    }
</script>

<template>
    <div class="relative w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <!-- parent -->
    <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <!-- green bg -->
        <div class="flex flex-col p-8 w-[900px] h-[90vh] shadow rounded-lg overflow-hidden bg-green-500"> 
            <div class="text-4xl text-white">
                {{ username }}
            </div> 
            <!-- child -->
            <div class="border-white border h-5/6 overflow-auto my-4">
                <div v-for="(messages, index) in messages_container" :key="index" class="h-auto">
                    <div>
                        <div :class="`${messages.sender_username === username ? 'border-white bg-zinc-500 text-white' : 'border-zinc-500 bg-white text-black'}`" class="flex justify-center items-center my-1 h-10">
                            {{ messages.content }}
                        </div>
                    </div>
                </div>                              
            </div>    

            <form @submit.prevent="sendMessage">
                <input v-model="message.content" type="text" id="text" placeholder="Say something" class="rounded-md border border-[#E6E6E6] h-11 w-full indent-3.5 focus:outline-none" required>
                <button type="submit"></button>
            </form>            
        </div>
    </div>
</template>



  

