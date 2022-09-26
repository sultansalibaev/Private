<template>
    <div
        class=""
        :class="
            option.position == 'center'
                ? 'element__child-center ' + option.type
                : option.type + ' element__child'
        "
    >
        <div v-if="option.type != 'parent'">
            <div v-for="child in children" :key="child" style="width: 100%">
                <div
                    v-if="!child.parentElement && child.type == 'select'"
                    style="position: relative"
                >
                    <construct-button
                        @click="updateOption(children, child)"
                        class="element__parent element__ch dropdown select"
                        :class="child.selected + ' parent'"
                        :style="
                            child.selected ? 'background:' + elementColor : ''
                        "
                        :id="child.id"
                        :title="child.description || ''"
                    >
                        {{
                            child.valueRU == undefined
                                ? child.value
                                : child.valueRU
                        }}
                    </construct-button>
                    <div
                        v-if="child.selected"
                        style="
                            position: absolute;
                            width: 170%;
                            left: 100%;
                            top: 0px;
                            flex-direction: column;
                        "
                        class="hideOtherChild"
                    >
                        <div v-for="ch in child.children" :key="ch.id">
                            <construct-button
                                @click="unchecked($event, ch)"
                                class="element__ch checkbox"
                                :class="ch.selected + ''"
                                :id="ch.id"
                                v-if="ch.type == 'checkbox' && !ch.inGroup"
                                :style="
                                    ch.selected
                                        ? 'background:' + elementColor
                                        : ''
                                "
                                :title="ch.description || ''"
                                style="display: block"
                            >
                                {{
                                    ch.valueRU != undefined
                                        ? ch.valueRU
                                        : ch.value
                                }}
                            </construct-button>
                        </div>
                    </div>
                </div>
                <div
                    v-else-if="child.type == 'input'"
                    style="min-width: 60px; width: 100%"
                >
                    <input
                        v-if="child?.limitation"
                        v-model="child.valueRU"
                        :class="child.type"
                        class="element__ch dropdown child__input"
                        type="number"
                        :min="child?.min"
                        :max="child?.max"
                        :id="child.id"
                        style="display: flex; width: 100%"
                        :style="'background:' + elementColor"
                    />
                    <input
                        v-model="child.valueRU"
                        :class="child.type"
                        class="element__ch dropdown child__input"
                        type="number"
                        :id="child.id"
                        style="display: flex; width: 100%"
                        :style="'background:' + elementColor"
                        v-else
                    />
                </div>
                <div v-else-if="child.type == 'parent'" style="width: 100%">
                    <div v-if="child.children[0].type == 'color'" style="position:relative">
                        <construct-button
                            class="element__parent element__ch dropdown"
                            :class="child.type"
                            @click="dropDown"
                            :id="child.id"
                            :style="'background:' + elementColor"
                            :title="child.description || ''"
                        >
                            <span>{{ child.valueRU }}</span>
                            <i style="position:absolute;right:10px" class="fa-solid fa-angle-right"></i>
                        </construct-button>
                        <div
                            class="element__ch dropdown hideOtherChild"
                            :class="child.children[0].type"
                            :id="child.children[0].id"
                            v-if="child.children[0].valueRU"
                            style="padding: 0; display: none;
                            position: absolute;
                            left: 100%;
                            top: 0;
                            flex-direction: column;"
                            :style="'background:' + elementColor"
                        >
                            <input
                                style="
                                    width: 100%;
                                    max-height: 22px;
                                    border: none;
                                "
                                :style="'background:' + elementColor"
                                :id="child.id"
                                type="color"
                                :value="child.children[0].valueRU"
                                @change="
                                    child.children[0].valueRU =
                                        $event.target.value
                                "
                                name="head"
                            />
                        </div>
                        <input
                            class="
                                element__ch
                                dropdown
                                child__input
                                hideOtherChild
                            "
                            :class="child.children[0].type"
                            :id="child.children[0].id"
                            v-else-if="child.valueRU"
                            v-model="child.valueRU"
                            type="text"
                            :style="'background:' + elementColor"
                        />
                    </div>
                    <div
                        v-if="child.children[0].type == 'select'"
                        style="position: relative"
                    >
                        <construct-button
                            class="element__parent element__ch dropdown"
                            :class="child.type"
                            @click="dropDown"
                            :id="child.id"
                            :style="'background:' + elementColor"
                            :title="child.description || ''"
                        >
                            <span>{{ child.valueRU }}</span>
                            <i style="position:absolute;right:10px" class="fa-solid fa-angle-right"></i>
                        </construct-button>
                        <div
                            style="
                                display: none;
                                position: absolute;
                                width: 100%;
                                left: 100%;
                                top: 0px;
                                flex-direction: column;
                            "
                            class="hideOtherChild"
                        >
                            <div v-for="ch in child.children" :key="ch.id">
                                <construct-button
                                    @click="updateOption(child.children, ch)"
                                    class="element__ch select"
                                    :class="ch.selected + ''"
                                    v-if="
                                        !child.children[0].parentElement &&
                                        child.children[0].type == 'select'
                                    "
                                    :style="
                                        ch.selected
                                            ? 'background:' + elementColor
                                            : ''
                                    "
                                    :id="ch.id"
                                >
                                    {{
                                        ch.valueRU == undefined
                                            ? ch.value
                                            : ch.valueRU
                                    }}
                                </construct-button>
                            </div>
                        </div>
                    </div>
                </div>
                <construct-button
                    @click="unchecked($event, child)"
                    class="element__ch dropdown checkbox"
                    :class="child.selected + ''"
                    :id="child.id"
                    v-if="child.type == 'checkbox'"
                    :style="child.selected ? 'background:' + elementColor : ''"
                    :title="child.description || ''"
                >
                    {{
                        child.valueRU != undefined ? child.valueRU : child.value
                    }}
                </construct-button>
            </div>
        </div>
        <!-- parent -->
        <vuedraggable
            v-if="option.type == 'parent'"
            style="display: flex; position: absolute; left: -200%"
            :list="children"
            animation="150"
            handle=".handle"
        >
            <div v-for="child in children" :key="child">
                <div v-if="child.type == 'column'" style="position: relative">
                    <construct-button
                        class="element__parent element__ch dropdown"
                        :class="child.type"
                        @click="dropDown($event, child, child.selected)"
                        :id="child.id"
                        :style="
                            !child.selected
                                ? 'background:#ccc'+getContentPadding(child.value)
                                : 'background:' + elementColor+getContentPadding(child.value)
                        "
                        :title="child.description || ''"
                        style="padding-left:0;"
                    >
                        <i
                            class="fa-solid fa-grip-lines handle"
                            style="transform: rotate(90deg) translate(-4px, 0);"
                        ></i>
                        <span>{{ child.valueRU }}</span>
                        <input
                            v-if="child.value != 'content'"
                            type="checkbox"
                            v-model="child.selected"
                            style="margin-right: -12px;margin-left: 5px;margin-top: 0;"
                        />
                    </construct-button>
                    <div
                        class="
                            element__child
                            dropdown
                            child__input
                            hideOtherChild
                        "
                        style="
                            display: none;
                            flex-direction: column;
                            width: 100%;
                        "
                    >
                        <div v-for="ch in child.children" :key="ch.id">
                            <div
                                class="element__ch dropdown"
                                :class="ch.type"
                                :id="ch.id"
                                v-if="ch.type == 'color'"
                                style="padding: 0"
                                :style="
                                    !child.selected
                                        ? 'background:#ccc;pointer-events: none;'
                                        : 'background:' + elementColor
                                "
                            >
                                <input
                                    style="
                                        width: 100%;
                                        max-height: 22px;
                                        border: none;
                                    "
                                    :style="'background:' + elementColor"
                                    :id="ch.id"
                                    type="color"
                                    :value="ch.valueRU"
                                    @change="ch.valueRU = $event.target.value"
                                    name="head"
                                />
                            </div>
                            <construct-button
                                @click="unchecked($event, ch)"
                                class="element__ch dropdown checkbox"
                                :class="ch.selected + ''"
                                :id="ch.id"
                                v-else-if="
                                    ch.type == 'checkbox' &&
                                    ch.value != undefined
                                "
                                :style="
                                    !child.selected
                                        ? 'background:#ccc;pointer-events: none;'
                                        : ch.selected
                                        ? 'background:' + elementColor
                                        : ''
                                "
                                :title="ch.description || ''"
                            >
                                {{
                                    ch.valueRU != undefined
                                        ? ch.valueRU
                                        : ch.value
                                }}
                            </construct-button>
                            <!-- Отображать -->
                        </div>
                    </div>
                </div>
            </div>
        </vuedraggable>

        <vuedraggable
            style="flex-direction: column"
            :list="children"
            animation="150"
            handle=".handle"
        >
            <div v-for="child in children" :key="child">
                <div
                    v-if="
                        child.type == 'parent' &&
                        child.children[0].type == 'draggable'
                    "
                    style="position: relative"
                >
                    <construct-button
                        class="element__parent element__ch dropdown"
                        :style="
                            !child.selected
                                ? 'background:#ccc'
                                : 'background:' + elementColor
                        "
                        :class="child.type"
                        :id="child.id"
                        style="justify-content:flex-start"
                        @mouseover="hoverDropDown($event, child.selected)"
                    >
                        <i
                            class="fa-solid fa-grip-lines handle"
                            style="overflow: hidden;max-width:15px;padding:5px 0 5px 6px;margin-right:5px;margin-left: -9px"
                        ></i>
                        {{ child.valueRU }}
                        <input
                            type="checkbox"
                            v-model="child.selected"
                            style="margin: 0 0 0 auto"
                        />
                    </construct-button>
                    <!-- parent -->
                    <vuedraggable
                        style="
                            flex-direction: column;
                            position: absolute;
                            left: 100%;
                            top: 0px;
                        "
                        :list="child.children"
                        animation="150"
                        class="hideOtherChild draggableChildren"
                        v-show="false"
                        @mouseleave="leaveDropDown($event, child.selected)"
                    >
                        <div v-for="ch in child.children" :key="ch">
                            <construct-button
                                @click="unchecked($event, ch)"
                                class="element__ch dropdown"
                                :class="ch.type + ' ' + ch.selected"
                                :id="ch.id"
                                :style="
                                    ch.selected
                                        ? 'background:' + elementColor
                                        : 'background:#ccc'
                                "
                                style="padding: 6px;justify-content:flex-start"
                            >
                                <i
                                    class="fa-solid fa-grip-lines handle"
                                    style="overflow: hidden;max-width:15px;padding:5px 0 5px 6px;margin-right:5px;margin-left: -6px"
                                ></i>
                                {{ ch.valueRU }}
                                &nbsp;&nbsp;
                                <input
                                    type="checkbox"
                                    v-model="ch.selected"
                                    style="margin: 0 0 0 auto"
                                />
                            </construct-button>
                        </div>
                    </vuedraggable>
                </div>
            </div>
        </vuedraggable>
    </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
    components: { vuedraggable: VueDraggableNext },
    name: "child-element",
    props: {
        children: {
            Type: Array,
            required: true,
        },
        option: {
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
    data() {
        return {
            timeoutId: 0,
        };
    },
    emits: ["update"],
    methods: {
        getContentPadding(val) {
            return val != 'content' ? ';padding-right: 17px' : '';
        },
        inputColor(ev, child) {
            let childId = document.querySelector("#" + child.id);
            child.valueRU = ev.target.value;
        },
        sliderRound(ev) {
            console.log("ev.target", ev.target);
            if (ev.target.offsetWidth > 0) {
                var style = ev.target.style;
                style.setProperty(
                    "--offset",
                    `translateX(${ev.target.offsetWidth - 10}px)`
                );
            }
        },
        hideOther(el) {
            document.querySelectorAll(".hideOtherChild").forEach((element) => {
                if (el == "selected") {
                    element.style.display = "none";
                    element.classList.add("hidden");
                } else if (el != element) {
                    element.style.display = "none";
                    element.classList.add("hidden");
                }
            });
        },
        checkedInput(ev) {
            let checkedInput = document.querySelectorAll(
                "input:checked+.slider:before"
            );
            console.log(ev.target, checkedInput);
        },
        unchecked(ev, child) {
            // if (child.type == "checkbox" && ) {
            if (child.selected == true) {
                ev.target.style.background = "#ccc";
                return (child.selected = false);
            } else if (child.selected == false) {
                console.log(child);
                ev.target.style.background = this.elementColor; // "#3b82ec"
                return (child.selected = true);
            }
            // }
        },
        myLog(selected) {
            this.timeoutId++;
            if (this.timeoutId == 1) {
                setTimeout(() => {
                    this.timeoutId = 0;
                }, 200);
            } else {
                return selected == null ? null : !selected;
            }
        },
        dropDown(ev, child = null, selected = null) {
            if (
                child != null &&
                selected != null &&
                child?.value != "content"
            ) {
                if (ev.target.getAttribute('type') == 'checkbox') {
                    let dropDown = ev.target.parentElement.nextElementSibling;
                    console.log(dropDown, ev.target.parentElement);
                    dropDown.style.display = "none";
                    dropDown.classList.add("hidden");
                }
                else if (this.myLog(selected) != null)
                    child.selected = this.myLog(selected);
                if (!child.selected) return this.hideOther("selected");
            }
            if (ev.target.getAttribute("type") != "checkbox") {
                if (ev.target.classList.contains("element__parent")) {
                    let dropDown = ev.target.nextElementSibling;
                    if (dropDown.style.display == "flex") {
                        dropDown.style.display = "none";
                        dropDown.classList.add("hidden");
                    } else {
                        this.hideOther(dropDown);
                        dropDown.classList.remove("hidden");
                        dropDown.style.display = "flex";
                    }
                } else {
                    let dropDown = ev.target.parentElement.nextElementSibling;
                    if (dropDown.style.display == "flex") {
                        dropDown.style.display = "none";
                        dropDown.classList.add("hidden");
                    } else {
                        this.hideOther(dropDown);
                        dropDown.classList.remove("hidden");
                        dropDown.style.display = "flex";
                    }
                }
            }
        },
        hoverDropDown(ev, selected = null) {
            if (selected) {
                if (ev.target.classList.contains("element__parent")) {
                    let dropDown = ev.target.nextElementSibling;
                    if (dropDown.style.display != "flex") {
                        this.hideOther(dropDown);
                        dropDown.classList.remove("hidden");
                        dropDown.style.display = "flex";
                    }
                } else {
                    let dropDown = ev.target.parentElement.nextElementSibling;
                    if (dropDown.style.display != "flex") {
                        this.hideOther(dropDown);
                        dropDown.classList.remove("hidden");
                        dropDown.style.display = "flex";
                    }
                }
            }
        },
        leaveDropDown(ev) {
            setTimeout(() => {
                if (ev.target.classList.contains("draggableChildren")) {
                    let dropDown = ev.target;
                    if (dropDown.style.display == "flex") {
                        this.hideOther(dropDown);
                        dropDown.style.display = "none";
                        dropDown.classList.add("hidden");
                    }
                } else {
                    let dropDown = ev.target.parentElement;
                    if (dropDown.style.display == "flex") {
                        this.hideOther(dropDown);
                        dropDown.style.display = "none";
                        dropDown.classList.add("hidden");
                    }
                }
            }, 300);
        },
        updateOption(children, child) {
            if (children.length != undefined) {
                for (let i3 = 0; i3 < children.length; i3++) {
                    let ch = children[i3];
                    document.querySelector("#" + ch.id).style.background =
                        "#ccc";
                    ch.selected = false;
                }
                console.log(children, child, this.elementColor);
                document.querySelector("#" + child.id).style.background =
                    this.elementColor; // "#3b82ec"
                console.log("One: ", children[0]);
                child.selected = true;
                return console.log("Two: ", child);
            }
        },
        submitInput(ev, child) {
            let inputValue = ev.target.value,
                inputId = ev.target.getAttribute("id");

            if (child.type == "input" && child.id == inputId) {
                ev.target.style.display = "none";
                return (child.value = inputValue);
            }
        },
    },
};
</script>

<style>
.hide {
    display: none;
}
.element-options {
    position: relative;
}
.element__parent.element__ch.column {
    padding-right: 10px;
}
.element__child-center {
    display: none;
    /* display: flex; */
    border-radius: 0;
    margin-top: 2px;
    /* top: 100%; */
    left: 0;
    /* right: 0; */
    position: absolute;
    z-index: 1;
    height: 22px;
}
.element__child {
    display: none;
    /* display: flex; */
    border-radius: 0;
    margin-top: 2px;
    /* top: 100%; */
    left: 0;
    right: 0;
    position: absolute;
    z-index: 1;
    height: 22px;
}
.element__child-center .element__ch,
.element__child .element__ch {
    min-width: calc(100% - 4px);
    /* max-width: 80px; */
    margin-bottom: 2px;
    border-radius: 0;
    height: 22px;
    cursor: pointer;
}
.element__child-center,
.element__child.select {
    /* display: flex; */
    flex-direction: column;
}
.element__ch.select {
    width: calc(100% - 4px);
    white-space: nowrap;
    overflow: hidden;
}
.element__ch.checkbox.false {
    background-color: #ccc;
}
.element__ch.select.false {
    background-color: #ccc;
}
.element__ch.input {
    display: flex;
    flex-wrap: wrap;
    max-width: 50px;
}

.element__ch.dropdown {
    padding: 0 5px 0 10px;
    margin-right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.element__ch.dropdown > i {
    padding-left: 10px;
}

.element__dropdowns {
    position: absolute;
    left: calc(100% - 2px);
    left: 0;
    display: none;
}

.element__dropdowns .element__ch {
    margin-top: 2px;
    margin-right: 2px;
}

.element__ch.child__input {
    height: 22px;
    border: none;
    background-color: #3b82ec;
    color: white;
    width: calc(100% - 4px);
    display: none;
}
.child__input:focus-visible {
    outline: none;
}

/* .input-container {
    display: flex;
    justify-content: center;
} */

/* .element__child .element__ch:last-child {
	border-radius: 0 0 5px 5px;
} */
</style>