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
                    :title="option.description ? option.description : ''"
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
            <div
                v-else-if="
                    option.parentElement &&
                    option.value != 'columns' &&
                    option.value != 'list_rows'
                "
            >
                <construct-button
                    :class="
                        option.position == 'center'
                            ? 'element__parent-center ' + option.type
                            : option.type + ' element__parent'
                    "
                    :style="'background:' + elementColor"
                    v-if="option.value == 'title'"
                    @click="saveInput(option)"
                    :id="option.id"
                    :title="option.description ? option.description : ''"
                >
                    {{
                        option.valueRU != undefined
                            ? option.valueRU
                            : option.value
                    }}
                </construct-button>
                <construct-button
                    :class="
                        option.position == 'center'
                            ? 'element__parent-center ' + option.type
                            : option.type + ' element__parent'
                    "
                    :style="'background:' + elementColor"
                    v-else
                    @click="dropDown"
                    :id="option.id"
                    :title="option.description ? option.description : ''"
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
                    :title="option.description ? option.description : ''"
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
            <div
                v-else-if="
                    option.value == 'columns' &&
                    (options[0].selected == true ||
                        options[0].selected == undefined)
                "
            >
                <construct-button
                    class="element__parent"
                    :style="'background:' + elementColor"
                    @click="dropDown"
                    :id="option.id"
                    :title="option.description ? option.description : ''"
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
            <div
                v-else-if="
                    option.value == 'list_rows' && options[0].selected == false
                "
            >
                <construct-button
                    class="element__parent"
                    :style="'background:' + elementColor"
                    @click="dropDown"
                    :id="option.id"
                    :title="option.description ? option.description : ''"
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
                    :title="option.description ? option.description : ''"
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
                v-else-if="
                    option.position == undefined &&
                    option.value != 'columns' &&
                    option.value != 'list_rows'
                "
                :style="'background:' + elementColor"
                :title="option.description ? option.description : ''"
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
        model: {
            Type: Object,
            required: true,
        },
    },
    emits: ["update"],
    methods: {
        hideOther(el) {
            document.querySelectorAll(".hideOther").forEach((element) => {
                if (el != element) {
                    element.parentElement.parentElement.style.height = '';
                    element.style.display = "none";
                    element.classList.add("hidden");
                }
            });
        },
        setElementHeight(ev, bool = true) {
            let eventTarget = ev.target.parentElement.parentElement;
            let offsetBottom =
                eventTarget.parentElement.offsetHeight -
                (eventTarget.offsetTop + eventTarget.offsetHeight + 3);
            console.log("childChild", eventTarget, offsetBottom);
            let dropDownOffsetHeight =
                eventTarget.firstChild.children[1].firstChild.children.length *
                22;
            if (offsetBottom < dropDownOffsetHeight && bool) {
                eventTarget.parentElement.parentElement.parentElement.style.height = `${
                    eventTarget.parentElement.offsetHeight +
                    (dropDownOffsetHeight - offsetBottom)
                }px`;
            } else {
                eventTarget.parentElement.parentElement.parentElement.style.height = '';
            }
        },
        dropDown(ev) {
            let dropDown = ev.target.nextElementSibling;
            let hideDropDown = true;
            if (dropDown.style.display == "none") {
                this.hideOther(dropDown);
                hideDropDown = false;
                dropDown.classList.remove("hidden");
                dropDown.style.display = "flex";
                ev.target.style.borderRadius = "5px 5px 0 0";
                this.setElementHeight(ev);
            } else {
                hideDropDown = true;
                dropDown.style.display = "none";
                dropDown.classList.add("hidden");
                ev.target.style.borderRadius = "5px";
                this.setElementHeight(ev, false);
            }
            // ev.target.nextElementSibling.childNodes[1].childNodes.forEach(el => {
            //     console.log(el);
            //     console.log(el.classList.contains('select'));
            //     console.log(el.classList.contains('input'));
            // });

            let elementChildrenCenter = document.querySelectorAll(
                ".element__child-center"
            );
            let elementParentsCenter = document.querySelectorAll(
                ".element__parent-center"
            );
            let elementChildren = document.querySelectorAll(".element__child");
            let elementParents = document.querySelectorAll(".element__parent");

            if (elementChildrenCenter.length != 0) {
                this.elementFor(
                    hideDropDown,
                    elementChildrenCenter,
                    elementParentsCenter,
                    true
                );
            }
            this.elementFor(hideDropDown, elementChildren, elementParents);
        },
        saveInput(option = undefined) {
            if (option != undefined) {
                let input = document.querySelector(".model .project-name");
                let button = document.querySelector(".model button");
                let elementList = document.querySelector(
                    ".content .element-list"
                );
                console.log("option", option, input);
                input.value = option.children[0].valueRU;
                button.setAttribute("id", option.children[0].id);

                elementList.style.filter = "blur(1.4px)";
                elementList.style.userSelect = "none";
                elementList.querySelector("div").style.pointerEvents = "none";
                setTimeout(() => {
                    this.model.is = true;
                }, 1);

                document.querySelector(".model").classList.remove("hide");
            }
        },
        elementFor(
            hideDropDown,
            elementChildren,
            elementParents,
            center = false
        ) {
            // alert(elementChildren.length);
            for (let index = 0; index < elementChildren.length; index++) {
                const child = elementChildren[index];
                if (center) {
                    child.style.left = `${
                        elementParents[index].offsetWidth / 2
                    }px`;
                    child.style.marginLeft = `-${child.offsetWidth / 2}px`;
                } else {
                    child.style.right = "0";
                }
                let parent =
                    child.parentElement.firstChild.parentElement.parentElement
                        .parentElement.parentElement.parentElement;
                if (hideDropDown) {
                    // if (nextEl.parentElement != element) {
                    //     element.parentElement.style.height = "38px";
                    // } else {
                    //     element.parentElement.style.height = "none";
                    // }
                    if (parent.offsetHeight >= 38) {
                        parent.style.height = ``;
                    } else {
                        console.log('next-element', !parent.parentElement.parentElement.classList.contains(
                                "next-element"
                            ));
                        if (
                            !parent.parentElement.parentElement.classList.contains(
                                "next-element"
                            )
                        ) {
                            parent.style.height = `38px`;
                        }
                    }
                } else {
                    if (child.offsetHeight != 0) {
                        let multiplus = 0;
                        if (child.firstChild.innerHTML != undefined) {
                            multiplus =
                                child.firstChild.children.length != 0
                                    ? child.firstChild.children.length - 1
                                    : 0;
                        }
                        let childLength = 1;
                        if (child.firstChild.children != undefined) {
                            childLength = child.firstChild.children.length;
                        }
                        if (
                            parent.offsetHeight < 38 ||
                            child.offsetHeight * childLength + 38 >
                                parent.offsetHeight
                        ) {
                            console.log('log down');
                            parent.style.height = `${
                                child.offsetHeight *
                                    (child.children.length + multiplus) +
                                38
                            }px`;
                        }
                    }
                }
            }
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
    /* transition: .35s; */
    padding-bottom: 0px;
}

.checkbox.false {
    background-color: #ccc;
}
</style>