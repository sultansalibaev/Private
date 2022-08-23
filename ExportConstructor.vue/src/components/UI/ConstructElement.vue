<template>
    <div>
        <div class="element">
            <i
                class="fa-solid fa-grip-lines handle"
                :style="'background:' + elementColor"
            ></i>
            <span :style="'background:' + elementColor" :title="description">{{ element }}</span>
            <i
                @click="dropDown"
                class="fa-solid fa-angle-right"
                :style="'background:' + elementColor"
            ></i>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "construct-element",
    props: {
        element: {
            Type: String,
            required: true,
        },
        elementColor: {
            Type: String,
            required: false,
        },
        description: {
            Type: String,
            required: false,
        },
    },
    methods: {
        hideOther(el) {
            document
                .querySelectorAll(".hideOtherElement")
                .forEach((element) => {
                    if (el != element) {
                        element.style.display = "none";
                        element.classList.add("hidden");
                    }
                });
            document.querySelectorAll(".hideOther").forEach((element) => {
                if (el != element) {
                    element.style.display = "none";
                    element.classList.add("hidden");
                }
            });
        },
        dropDown(ev) {
            let elements = document.querySelectorAll('.element-list .element');
            elements.forEach(element => {
                element.parentElement.style.height = "40px";
            });
            console.log(ev.target);
            let nextEl = ev.target.nextElementSibling;
            if (nextEl.style.display == "none") {
                this.hideOther(nextEl);
                nextEl.classList.remove("hidden");
                nextEl.style.display = "flex";
            } else {
                nextEl.style.display = "none";
                nextEl.classList.add("hidden");
            }
        },
    },
};
</script>

<style scoped>
.element {
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 4px;
    /* margin-bottom: 10px; */
    display: flex;
    align-items: flex-start;
    position: relative;
    user-select: none;
}

.element > span {
    font-size: 15px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-right: 10px;
    /* width: 150px; */
    min-width: 80px;
    height: 30px;
    color: white;
    background-color: #3b82ec;
}

.element i {
    color: white;
    background-color: #3b82ec;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 30px;
    min-width: 30px;
    height: 30px;
}

.element > i:first-child {
    padding-left: 2px;
    border-radius: 5px 0px 0px 5px;
    margin: 0 2px 0 0px;
}
.element > i:nth-child(3) {
    border-radius: 0px 5px 5px 0px;
    margin: 0 7px 0 2px;
}
</style>