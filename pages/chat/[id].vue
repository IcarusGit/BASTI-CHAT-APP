<script setup>

</script>

<template>
    <div class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <!-- parent greebg-->
    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        
        <div class="p-8 w-[900px] h-[800px] shadow rounded-lg overflow-hidden bg-green-500"> 
            <div class="text-4xl text-white mb-2">
                JUAN DELA CRUZ 
            </div> 
            <!-- child -->
            <div class="border-white border">
                <div class="h-full">
                    <div>
                        <div class="flex justify-center items-center border-white h-10 bg-zinc-500 text-white my-1">lorem ipsum</div>
                    </div>

                    <div>
                        <div class="flex justify-center items-center border-zinc-500 h-10 bg-white text-zinc-500 my-1">lorem ipsum</div>
                    </div>
                </div>                              
            </div>    

            <form class="fixed bottom-3 left-8 right-8">
                <input type="text" placeholder="Say something" class="rounded-md border border-[#E6E6E6] h-11 w-full indent-3.5 focus:outline-none">
                <button type="submit"></button>
            </form>            
        </div>
    </div>
</template>