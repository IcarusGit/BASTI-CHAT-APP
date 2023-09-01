<script setup>
    import axios from 'axios';
    import { io } from "socket.io-client";
    const socket = io("http://localhost:3002");



</script>


<template>
    <!-- <div>
        <nav class="fixed left-0 bg-white z-30 flex justify-center items-center w-24 border-black-200 border-b-2 h-screen">   
            <ul class="flex flex-col justify-center items-center gap-20">
                <li>
                    <NuxtLink to="/" class="hover:underline hover:underline-offset-[41px] decoration-4 decoration-red-600 border">Register</NuxtLink>
                </li >

                <li>
                    <NuxtLink to="/login" class="hover:underline hover:underline-offset-[41px] decoration-4 decoration-red-600 border">Login</NuxtLink>
                </li>

                <li>
                    <NuxtLink to="/chat" class="hover:underline hover:underline-offset-[41px] decoration-4 decoration-red-600 border">chats</NuxtLink>
                </li>
            </ul>
        </nav>
    </div> -->


    <slot />
</template>