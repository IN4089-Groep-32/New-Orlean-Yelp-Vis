<template>
    <div>
        <NavBar class="nav" />
        <router-view class="map">router view</router-view>
        <!-- <router-view class="content">content view</router-view> -->
    </div>
    
    <!-- <Footer /> -->
    <!-- <Map> </Map> -->
</template>

<script>
import NavBar from "@/components/NavBar.vue";
// import Footer from "@/components/Footer.vue";
// import Map from "@/views/Map.vue"
export default {
    name: "app",
    components: {
        // Map
        NavBar,
        // NavigateBar,
        /* Footer*/
    }
};
</script>

<style>
html {
    position: relative;
    min-height: 100%;
}

body {
    /* margin-bottom: 160px !important; */
    /* Height of the footer */
    padding: 0;
    height: 100%;
    width: 100%;
}


/* Override Bootstrap Styling */

.btn-primary {
    background-color: #025fce !important;
}
</style>

<style scoped>
.map {
    height: 75%;
    width: 100%;
}


div {
    padding: 0;
    width: 100%;
    height: 100%;
}

/* .nav {
    width: 100%;
    height: 15%;
} */

.nav {
    left: 0px;
    width: 100%;
    height: 15%;
}

</style>
