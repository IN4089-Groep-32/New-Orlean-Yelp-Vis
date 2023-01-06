<template>
    <div>
        <div id="header-wrap" class="item-title" style="background: #540D6E;">
            <div class="main-header_logo" id="logo" >
                <a href="/">yelp</a>
            </div>
            <!-- <header class="grid-container">
            </header> -->
        </div>
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
    height: 10%;
}

.item-title {
    padding-left: 5%;
    padding-top: 1%;
    width: 100%;
    height: 10%;
    position: relative;
    
}

.main-header_logo {
    width: 80px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 80px 40px;
    background-image: url(https://s3-media0.fl.yelpcdn.com/assets/public/logo_desktop_white.yji-2d2a7a4342fcfc9007c4020b1f76558a.svg);
}

.main-header_logo a {
    display: block;
    width: 100%;
    height: 100%;
    text-indent: -1000em;
}

</style>
