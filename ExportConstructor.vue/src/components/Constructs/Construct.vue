<template>
    <div class="element-list" :class="loading ? 'bluring' : ''">
        <vuedraggable
            group="todosapp"
            :list="elements"
            :move="checkMove"
            handle=".handle"
            animation="150"
            style="min-height: 80.2vh"
        >
            <div v-for="element in elements" :key="element.id">
                <construct-element
                    :key="element.id"
                    :element="element.nameRU"
                    :elementColor="element.color"
                    v-if="element.name != 'Group'"
                    :class="element.groups"
                >
                    <next-element
                        @update="updateOption"
                        :options="element.options"
                        :elementColor="element.color"
                        :elements="elements"
                    >
                        <remove-element
                            :element="element"
                            @remove="removeElement"
                        ></remove-element>
                    </next-element>
                </construct-element>
                <div class="new-list" v-else>
                    <div class="group-header">
                        <div class="group-header__title handle">Группа</div>
                        <div
                            class="group-header__ungroup"
                            :id="element.id"
                            @click="ungroup"
                        >
                            Разгруппировать
                        </div>
                    </div>
                    <hr />
                    <vuedraggable
                        group="todosapp"
                        :list="element.group"
                        :class="element.name"
                        animation="150"
                        style="padding: 10px 0 10px 0"
                    >
                        <div
                            v-if="element.name == 'Group'"
                            v-for="group in element.group"
                            :key="group"
                        >
                            <construct-element
                                :element="group.nameRU"
                                :elementColor="group.color"
                                v-if="group"
                            >
                                <next-element
                                    @update="updateOption"
                                    :options="group.options"
                                    :elementColor="group.color"
                                    :elements="elements"
                                >
                                    <remove-element
                                        :element="group"
                                        @remove="removeElement"
                                    ></remove-element>
                                </next-element>
                            </construct-element>
                        </div>
                    </vuedraggable>
                    <span class="error">Не менее двух элементов!</span>
                </div>
            </div>
        </vuedraggable>
        <!-- <div v-for="element in elements" :key="element" class="new-list"></div> -->
    </div>
    <div v-if="loading">
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";

export default {
    components: { vuedraggable: VueDraggableNext },
    props: {
        elements: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    emits: ["update"],
    methods: {
        checkMove(evt) {
            console.log(evt.to, evt);
            if (!evt.to.classList.contains("Group")) {
                let groups = document.querySelectorAll(".Group");
                for (let i = 0; i < groups.length; i++) {
                    let group = groups[i];
                    if (group.children.length < 1) {
                        group.parentElement.style.border = "2px solid red";
                        group.nextElementSibling.style.display = "inline";
                    } else {
                        group.parentElement.style.border = "none";
                        group.nextElementSibling.style.display = "none";
                    }
                }
                return true;
            } else if (
                evt.dragged.firstChild.classList.contains("groups") &&
                evt.to.children.length < 2
            ) {
                console.log(
                    "My evt " +
                        evt.dragged.firstChild.classList.contains("groups"),
                    evt,
                    evt.dragged,
                    evt.to
                );
                return true;
            } else {
                return false;
            }
        },
        removeElement(el) {
            let groupedCount = 0;
            for (let i = 0; i < this.elements.length; i++) {
                const postEl = this.elements[i];
                if (postEl.type == "grouped") {
                    groupedCount++;
                }
                if (postEl.group) {
                    for (let i2 = 0; i2 < postEl.group.length; i2++) {
                        const groupEl = postEl.group[i2];
                        if (groupEl.type == "grouped") {
                            groupedCount++;
                        }
                    }
                }
            }
            for (let i = 0; i < this.elements.length; i++) {
                const postEl = this.elements[i];
                if (postEl.name === el.name) {
                    if (postEl.type == "grouped") {
                        groupedCount--;
                    }
                    this.elements.splice(i, 1);
                } else if (this.elements[i].group != undefined) {
                    for (let i2 = 0; i2 < this.elements[i].group.length; i2++) {
                        const elem = this.elements[i].group[i2];
                        if (elem.name === el.name) {
                            if (elem.type == "grouped") {
                                groupedCount--;
                            }
                            this.elements[i].group.splice(i2, 1);
                        }
                    }
                }
            }
            let menuElements = document.querySelectorAll(
                ".menu .block .element"
            );

            for (let i = 0; i < menuElements.length; i++) {
                const element = menuElements[i];

                if (el.nameRU == element.innerText) {
                    element.style.background = "#4678a6";
                }
            }
            if (groupedCount == 0) {
                for (let i = 0; i < this.elements.length; i++) {
                    const postEl = this.elements[i];

                    if (postEl.name == "Group") {
                        let ungroups = document.querySelectorAll(
                            ".group-header__ungroup"
                        );
                        ungroups.forEach((ungroup) => {
                            ungroup.click();
                        });
                    }
                }
            }
        },
        updateOption(optionName, ev) {
            this.$emit("update", optionName, ev);
        },
        ungroup(ev) {
            if (this.elements.length != undefined) {
                for (let i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].group != undefined) {
                        let groupEl = this.elements[i].group;

                        let menuElements = document.querySelectorAll(
                            ".menu .block .element"
                        );

                        for (let i = 0; i < menuElements.length; i++) {
                            const element = menuElements[i];

                            if ("Группа" == element.innerText) {
                                element.style.background = "#4678a6";
                            }
                        }

                        // console.log(
                        //     this.elements[i].id == ev.target.getAttribute("id")
                        // );
                        if (
                            this.elements[i].id == ev.target.getAttribute("id")
                        ) {
                            // console.log(this.elements[i]);
                            // console.log(groupEl.length);
                            this.shiftArray(this.elements, i, groupEl.length);

                            for (let i2 = 0; i2 < groupEl.length; i2++) {
                                const groupItem = groupEl[i2];
                                this.elements[i + i2] = groupItem;
                            }
                            return;
                        }
                    }
                }
            }
        },
        shiftArray(arr, end, x) {
            if (x == 0) {
                arr.splice(end, 1);
            } else if (x == 1) {
                return;
            } else {
                x = x - 1;
                for (let i = arr.length - 1; i > end; i--) {
                    arr[i + x] = arr[i];
                }
            }
        },
    },
};
</script>

<style scoped>
.group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}
.group-header__title {
    margin-left: 10px;
    padding: 2px 4px;
}
.group-header__ungroup {
    margin-right: 12px;
    background: rgb(241, 94, 94);
    color: white;
    padding: 2px 4px;
    border-radius: 5px;
    cursor: pointer;
}
.new-list {
    padding: 3px;
    background-color: #ccc;
    border-radius: 5px;
    margin: 3px 0;
}
</style>