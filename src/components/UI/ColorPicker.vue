<template>
    <div class="picker">
        <div id="color-indicator" class="color-indicator"></div>
        <div id="color-picker" class="color-picker"></div>
    </div>
</template>

<script>
export default {
    // name: "color-picker",
    props: {
        child: {
            type: String,
            required: true
        }
    },
    mounted() {
        let colorIndicator = document.getElementById("color-indicator");
        const colorPicker = new iro.ColorPicker("#color-picker", {
            width: 90,
            color: "#fff",
        });
        colorPicker.on("color:change", function (color) {
            console.log(color.hexString);
            colorIndicator.style.backgroundColor = color.hexString;
            console.log("Color: ", this.child);
            this.child = color.hexString;
            console.log("Color: ", this.child);
        });
    },
};
</script>

<style scoped>
.picker {
    position: relative;
    background-color: #ccc;
    display: inline-block;
    padding: 15px 20px 15px 20px;
    border-radius: 20px;
    margin-bottom: 2px;
}

.color-indicator {
    display: inline-block;
    width: 120px;
    height: 120px;
    background-color: #fff;
    border-radius: 20px;
    vertical-align: middle;
}

#color-picker {
    display: inline-block;
    vertical-align: middle;
    margin-left: 20px;
}
</style>