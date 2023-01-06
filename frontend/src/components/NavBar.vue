<template>
    <div>
                <!-- <div class="skipLink"> -->
        <!--     <a href="/map">Goto the map</a> -->
        <!-- </div> -->
        
        <div class="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
            <a class="navbar-brand" href="/" role="heading" aria-level="1">Map</a>
        </div>
    </div>
</template> 
 
<script>
export default {
    name: "NavBar"
}; 
</script> 
 
<style scoped>
.skipLink a {
    position: absolute;
    left: -100px;
    top: -100px;
}

.skipLink a:focus {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    padding: 10px;
    color: #ffffff;
    background: #000000;
}



</style> 