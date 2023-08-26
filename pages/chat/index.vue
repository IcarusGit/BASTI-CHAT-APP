<script setup>

</script>

<template>
    <div class="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-black opacity-80">
        
    </div>

    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div class="p-10 w-[900px] h-[800px] shadow rounded-lg overflow-hidden bg-green-500">
            <div>
                <div class="text-4xl text-white mb-4">MESSAGES</div>
                
            </div>
            
            
            <form>
                <div class="relative overflow-hidden">
                    <input type="text" placeholder="Search a friend" class="mb-4 rounded-md border border-[#E6E6E6] h-11 w-full indent-3.5 focus:outline-none">
                    <button type="submit" class="absolute right-0 top-0 text-xl h-11 bg-green-300 rounded-md px-3">
                        message
                    </button>                    
                </div>                
            </form>

            <div>
                <div class="border border-white rounded h-10 bg-zinc-500 text-white text-lg text-center py-1">JUAN DELA CRUZ</div>
            </div>
        </div>
    </div>
</template>

