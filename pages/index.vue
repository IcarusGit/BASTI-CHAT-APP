<script setup>
    const users = ref([])
    const adduser = ref({
        username: "", 
        password: ""
    })

    function register(){
        const isExisting = users.value.some(user => user.username === adduser.value.username);

        if (isExisting) {
            alert("Username is already existing!")
            return false
        }

        users.value.push({
            username: adduser.value.username,
            password: adduser.value.password
        })

        alert("Registration successful!")
        adduser.value.username = ""
        adduser.value.password = "" 
        
        const router = useRouter(); 
        router.push('/login'); 
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