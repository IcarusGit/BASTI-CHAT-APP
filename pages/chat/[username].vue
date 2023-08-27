<script setup>
    const { username } = useRoute().params

    const messages_container = ref([])

    const message = ref({
        message: "",
        fromCurrentUser: true
    })

    function sendMessage(){
        messages_container.value.push(message.value.message)

        message.value.message = ""
        // message.value.fromCurrentUser = !message.value.fromCurrentUser
        //console.log(message.value.fromCurrentUser)
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
                {{username}}
            </div> 
            <!-- child -->
            <div class="border-white border h-5/6 overflow-auto my-4">
                <div v-for="(message, index) in messages_container" :key="index" class="h-auto">
                    <div>
                        <div :class="`${index % 2 == 0 ? 'border-zinc-500 bg-white text-black' : 'border-white bg-zinc-500 text-white'}`"  class="flex justify-center items-center my-1 h-10">
                            {{ message }}
                        </div>
                    </div>
                </div>                              
            </div>    

            <form @submit.prevent="sendMessage" class="">
                <input v-model="message.message" type="text" placeholder="Say something" class="rounded-md border border-[#E6E6E6] h-11 w-full indent-3.5 focus:outline-none" required>
                <button type="submit"></button>
            </form>            
        </div>
    </div>
</template>



  

