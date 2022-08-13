<template>
    <div class="next-element hideOtherElement" style="display: none">
        <!-- <vuedraggable
            style="display: flex; position: absolute"
            :list="options"
            animation="150"
        > -->
        <div class="element-options" v-for="option in options" :key="option.id">
            <div v-if="option.type == 'group'">
                <construct-button
                    :id="option.id"
                    class="element__parent"
                    :style="'background:' + elementColor"
                >
                    {{
                        option.valueRU != undefined
                            ? option.valueRU
                            : option.value
                    }}
                </construct-button>
                <child-element
                    :elements="elements"
                    @update="updateOption"
                    :children="option.children"
                    :elementColor="elementColor"
                    :option="option"
                    class="hideOther"
                ></child-element>
            </div>
            <div v-else-if="option.type == 'hide'">
                <!-- Hide option -->
            </div>
            <div v-else-if="option.parentElement">
                <construct-button
                    class="element__parent"
                    :style="'background:' + elementColor"
                    @click="dropDown"
                    :id="option.id"
                >
                    {{
                        option.valueRU != undefined
                            ? option.valueRU
                            : option.value
                    }}
                </construct-button>
                <child-element
                    :elements="elements"
                    @update="updateOption"
                    :children="option.children"
                    :elementColor="elementColor"
                    :option="option"
                    class="hideOther"
                ></child-element>
            </div>
            <div v-else-if="option.type == 'select'">
                <construct-button
                    class="element__parent"
                    :style="option.selected ? 'background:' + elementColor : ''"
                    @click="dropDown"
                    :id="option.id"
                >
                    {{
                        option.valueRU != undefined
                            ? option.valueRU
                            : option.value
                    }}
                </construct-button>
                <child-element
                    :elements="elements"
                    @update="updateOption"
                    :children="option.children"
                    :elementColor="elementColor"
                    :option="option"
                    class="hideOther"
                ></child-element>
            </div>
            <div v-else-if="option.value == 'columns'">
                <construct-button
                    class="element__parent"
                    :style="'background:' + elementColor"
                    @click="dropDown"
                    :id="option.id"
                >
                    {{
                        option.valueRU != undefined
                            ? option.valueRU
                            : option.value
                    }}
                </construct-button>
                <child-element
                    :elements="elements"
                    @update="updateOption"
                    :children="option.children"
                    :element="element"
                    :elementColor="elementColor"
                    :option="option"
                    class="hideOther"
                ></child-element>
            </div>
            <div v-else-if="option.type == 'checkbox'">
                <construct-button
                    @click="unchecked"
                    class="element__ch checkbox"
                    :id="option.id"
                    :class="option.selected + ''"
                    :style="option.selected ? 'background:' + elementColor : ''"
                >
                    {{
                        option.valueRU != undefined
                            ? option.valueRU
                            : option.value
                    }}
                </construct-button>
            </div>
            <construct-button
                :id="option.id"
                v-else-if="option.position == undefined"
                :style="'background:' + elementColor"
            >
                {{
                    option.valueRU != undefined ? option.valueRU : option.value
                }}
            </construct-button>
        </div>
        <!-- border-radius: 5px 5px 0 0; -->
        <slot></slot>
        <!-- </vuedraggable> -->
    </div>
</template>

<script>
// import { VueDraggableNext } from "vue-draggable-next";
export default {
    // components: { vuedraggable: VueDraggableNext },
    name: "next-element",
    props: {
        options: {
            Type: Array,
            required: true,
        },
        elementColor: {
            Type: String,
            required: false,
        },
        elements: {
            Type: Array,
            required: true,
        },
    },
    emits: ["update"],
    methods: {
        hideOther(el) {
            document.querySelectorAll(".hideOther").forEach((element) => {
                if (el != element) {
                    element.style.display = "none";
                    element.classList.add("hidden");
                }
            });
        },
        dropDown(ev) {
            let dropDown = ev.target.nextElementSibling;
            if (dropDown.style.display == "none") {
                this.hideOther(dropDown);
                dropDown.classList.remove("hidden");
                dropDown.style.display = "flex";
                ev.target.style.borderRadius = "5px 5px 0 0";
            } else {
                dropDown.style.display = "none";
                dropDown.classList.add("hidden");
                ev.target.style.borderRadius = "5px";
            }
            // ev.target.nextElementSibling.childNodes[1].childNodes.forEach(el => {
            //     console.log(el);
            //     console.log(el.classList.contains('select'));
            //     console.log(el.classList.contains('input'));
            // });
        },
        updateOption(optionName, ev) {
            this.$emit("update", optionName, ev);
        },
        unchecked(ev) {
            console.log("unchecked");
            for (let i2 = 0; i2 < this.options.length; i2++) {
                let child = this.options[i2];
                let id =
                    ev.target.getAttribute("id") == undefined
                        ? ev.target.parentElement.getAttribute("id")
                        : ev.target.getAttribute("id");
                if (child.type == "checkbox" && child.id == id) {
                    console.log(child.selected, this.elementColor);
                    if (child.selected == true) {
                        ev.target.style.background = "#ccc";
                        return (child.selected = false);
                    } else if (child.selected == false) {
                        ev.target.style.background = this.elementColor; // "#3b82ec"
                        return (child.selected = true);
                    }
                }
            }
        },
    },
};
</script>

<style>
.next-element {
    position: relative;
    display: flex;
    flex-wrap: wrap;
}

.next-element .element-options {
    margin-bottom: 3px;
}
.next-element {
    margin-bottom: 0px;
}

.next-element.hide {
    display: none;
}

.element {
    padding-bottom: 0px;
}

.checkbox.false {
    background-color: #ccc;
}
</style>