<template>
    <div>
        <v-header></v-header>
        <v-search></v-search>
    </div>
</template>
<script>
import Header from '@/components/navigator/Header'
import Search from '@/components/search/Search'
export default {
    data(){
        return{

        }
    },
    components : {
        'v-header': Header,
        'v-search': Search
    }
}
</script>
