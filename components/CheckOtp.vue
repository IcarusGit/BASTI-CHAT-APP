<!-- like function na dinadagdag sa mga pages if applicable -->
<script setup>
    const emits = defineEmits(['close', 'verify'])
</script>

<template>
    <!-- OTP MODAL -->
    <div class="fixed bg-black opacity-80 top-0 bottom-0 left-0 right-0 z-50">
        
    </div>  


    <div class="flex justify-center opacity-100 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <form class="w-[550px] h-[400px] shadow rounded-lg overflow-hidden bg-white">
            <div class="bg-green-400 h-[5%]">

            </div>

            <div class="flex justify-center items-center h-[71%]">
                <div class="flex flex-col justify-center items-center">
                    <div class="font-black text-green-500 text-2xl mb-8">OTP PIN VERIFICATION</div>
                    <div>
                        <div>
                            <input type="text" class="mx-2 rounded-3xl w-16 h-16 border focus:outline-green-400 caret-green-400 text-center text-2xl text-green-500" required/>
                            <input type="text" class="mx-2 rounded-3xl w-16 h-16 border focus:outline-green-400 caret-green-400 text-center text-2xl text-green-500" required/>
                            <input type="text" class="mx-2 rounded-3xl w-16 h-16 border focus:outline-green-400 caret-green-400 text-center text-2xl text-green-500" required/>
                            <input type="text" class="mx-2 rounded-3xl w-16 h-16 border focus:outline-green-400 caret-green-400 text-center text-2xl text-green-500" required/>
                            <input type="text" class="mx-2 rounded-3xl w-16 h-16 border focus:outline-green-400 caret-green-400 text-center text-2xl text-green-500" required/>
                            <input type="text" class="mx-2 rounded-3xl w-16 h-16 border focus:outline-green-400 caret-green-400 text-center text-2xl text-green-500" required/>
                        </div>
                    </div>
                </div>                
            </div>

            <div class="flex justify-center items-center">
                <div>
                    <button class="text-white bg-gray-500 w-24 h-14 rounded-lg mr-12 font-medium" @click="emits('close')">Cancel</button>
                    <button type="submit" class="text-white bg-green-400 w-24 h-14 rounded-lg font-medium" @click="emits('verify')">VERIFY</button>
                </div>        
            </div>
        </form>        
    </div>
</template>