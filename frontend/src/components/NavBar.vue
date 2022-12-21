<template>
    <div>
        <nav class="navbar navbar-light bg-light p-3">
                <div class="container-fluid">
                    <span class="navbar-brand mb-0 h1">How green is my municipality?</span>
                    <div class="navigate">
                        <div id="nav-intro" class="nav-unit">
                            <div class="dot" onclick="updateView('intro')"></div>
                            <span>Intro</span>
                        </div>
                        <div id="nav-CO2" class="nav-unit">
                            <div class="dot active" onclick="updateView('CO2')"></div>
                            <span>CO2</span>
                        </div>
                        <div id="nav-renew" class="nav-unit">
                            <div class="dot" onclick="updateView('renew')"></div>
                            <span>Renewable Energy</span>
                        </div>
                        <div id="nav-political" class="nav-unit">
                            <div class="dot" onclick="updateView('political')"></div>
                            <span>Political parties</span>
                        </div>
                        <div id="nav-aggr" class="nav-unit mr-0">
                            <div class="dot" onclick="updateView('aggr')"></div>
                            <span>Aggregate</span>
                        </div>
                    </div>
                </div>
            </nav>
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
<style>

html {
    font-family: 'Roboto', sans-serif;
    height: 100vh;
}

body {
    margin: 0 !important;
    background-color: #ffffff !important;
    height: 100%;
}

.flex {
    display: flex;
}

.axis {
    font-size: 8px
}

svg text {
    text-anchor: end;
}

.selected {
    fill: #2450ff
}

.not-selected {
    fill: #56728d
}

.unknown {
    fill: #eeeeee;
}

.tooltip {
    position: absolute;
    padding: 10px;
    border-radius: 10px;
    background:#000;
    color: #fff;
    text-align:center;
}

.navigate {
    display: flex;
}

.navigate hr {
    width: 40px;
    height: 2px;
    background-color: #2450ff;
    position: absolute;
    margin: 0;
}

.navigate .dot {
    width: 20px;
    height: 20px;
    background-color: #2450ff;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
}

.navigate .dot:hover {
    background-color: #0069d9;
}

.navigate .nav-unit {
    display: flex;
    position: relative; /* This is needed when child is absolute */
    flex-direction: column;
    align-items: center;
    width: 130px;
    margin-right: 20px
}

/* The navigation line */
.navigate > *:not(:last-child):after{
    content: "";
    position: absolute;
    left: 55%;
    top: 18%;
    width: 105%;
    border-top: 0.3rem solid #2450ff;
}
.navigate .active {
    background-color: #ffca28;
}
.navigate .active:hover {
    background-color: #f9c428;
}

.view-container {
    display: none;
    flex-grow: 1;
}

#CO2-container {
    display: flex;
}

.map-container {
    width: 50%;
    height: 100%;
    display: flex;
    /*position: relative;*/
    flex-direction: column;
    padding: 1rem;
}

.includes-selection {
    position: absolute;
    top: 14rem;
    left: 1.5rem;
}

.selected-stack {
    stroke: #ff00fe;
    stroke-width: 2px;
}

.window-input-container label, .window-input-container input{
    margin: 10px 15px;
}

.legend {
    width: 30%;
    padding: 15px 5px;
}

.legend-item {
    display: flex;
    align-items: center;
}
.legend-dot {
    border-radius: 50%;
    width: 15px;
    min-width: 15px;
    height: 15px;
    margin-right: 20px;
    background-color: #0f6674;
}

#piechart-container{
    height: 40%;
}

#weights p {
    margin-bottom: 0;
}

#intro-box {
    margin: auto;
    width: 50%;
    padding: 10px;
}

</style>