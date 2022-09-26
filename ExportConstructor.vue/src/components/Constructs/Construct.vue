<template>
    <div
        class="element-list"
        :class="loading.is || bluring.is ? 'bluring' : ''"
    >
        <vuedraggable
            group="todosapp"
            :list="elements"
            :move="checkMove"
            @drag="drag"
            handle=".handle"
            animation="250"
            style="min-height: 80.2vh"
        >
            <div v-for="element in elements" :key="element.id" :title="element.name">
                <construct-element
                    :key="element.id"
                    :element="element.nameRU"
                    :elementColor="element.color"
                    v-if="element.name != 'Group'"
                    :class="element.groups"
                    :description="
                        element.description ? element.description : ''
                    "
                >
                    <next-element
                        @update="updateOption"
                        :options="element.options"
                        :model="model"
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
                    <div class="group-header" v-if="additional.format.file == 'powerpoint'">
                        <div
                            class="group-header__title handle"
                            :title="
                                element.description ? element.description : ''
                            "
                        >
                            <label :for="'project'+element.id">Проект: </label>
                            <input type="text" v-model="element.projectName" :id="'project'+element.id" class="project-input">
                            <label :for="'project_id'+element.id" style="margin-left:10px;">его номер: </label>
                            <input type="text" v-model="element.projectId" :id="'project_id'+element.id" class="project-input">
                        </div>
                        <div
                            class="group-header__ungroup"
                            :id="element.id"
                            @click="ungroup"
                        >
                            Удалить
                        </div>
                    </div>
                    <div class="group-header" v-else>
                        <div
                            class="group-header__title handle"
                            :title="
                                element.description ? element.description : ''
                            "
                        >
                            Группа
                        </div>
                        <div
                            class="group-header__ungroup"
                            :id="element.id"
                            @click="ungroup"
                        >
                            Разгруппировать
                        </div>
                    </div>
                    <hr class="hr" />
                    <vuedraggable
                        group="todosapp"
                        :list="element.group"
                        :class="element.name"
                        @dragleave="dragLeave"
                        animation="250"
                        style="padding: 18px 0"
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
                                :description="
                                    group.description ? group.description : ''
                                "
                            >
                                <next-element
                                    @update="updateOption"
                                    :options="group.options"
                                    :model="model"
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
                    <span class="error">{{ additional.format.file != 'powerpoint' ? 'Должно быть два элемента!' : 'Должен быть как минимум один элемент!' }}</span>
                </div>
            </div>
        </vuedraggable>
        <!-- <div v-for="element in elements" :key="element" class="new-list"></div> -->
    </div>
    <div v-if="loading.is">
        <div class="lds-roller" style="z-index: 30">
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
        additional: {
            type: Object,
            required: true,
        },
        loading: {
            type: Object,
            required: true,
        },
        bluring: {
            type: Object,
            required: true,
        },
        model: {
            type: Object,
            required: true,
        },
    },
    emits: ["update"],
    methods: {
        checkDistributions(bool) {
            let timeouts = [200, 400, 600, 800, 1000];

            timeouts.forEach(timeout => {
                setTimeout(() => {
                    this.setDistributions();
                }, timeout);
            });

            return bool;
        },
        setDistributions() {
            for (let index = 0; index < this.elements.length; index++) {
                let element = this.elements[index];
                if (
                    element.name == "smi_distribution" ||
                    element.name == "soc_distribution"
                ) {
                    element.options[2].children[2].children[1].inGroup = false;
                }
            }

            for (let index = 0; index < this.elements.length; index++) {
                let element = this.elements[index];
                if (element.name == "Group") {
                    for (let index = 0; index < element.group.length; index++) {
                        let groupEl = element.group[index];

                        if (
                            groupEl.name == "smi_distribution" ||
                            groupEl.name == "soc_distribution"
                        ) {
                            groupEl.options[2].children[2].children[1].inGroup = true;
                        }
                    }
                }
            }
        },
        dragLeave(ev) {
            if (
                ev.target.classList.contains("Group") &&
                !ev.relatedTarget.classList.contains("hr") &&
                !ev.relatedTarget.classList.contains("element")
            ) {
                console.log("!!!Элемент покинул группу!!!");
                return this.checkDistributions(true);
            }
        },
        checkMove(evt) {
            if (!evt.to.classList.contains("Group")) {
                return true;
            } else if (evt.to.classList.contains("Group") && evt.dragged.getAttribute('title') == 'Group') {
                return false;
            } else if (
                this.additional.format.file == 'powerpoint' &&
                evt.to.classList.contains("Group")
            ) {
                let group = evt.to;
                if (group.children) {
                    for (let i = 0; i < group.children.length; i++) {
                        const groupEl = group.children[i];

                        for (let i2 = 0; i2 < this.elements.length; i2++) {
                            const el = this.elements[i2];
                            if (el.name == 'Group') {
                                if (el.id == groupEl.parentElement.parentElement.firstChild.lastChild.getAttribute('id')) {
                                    for (let i3 = 0; i3 < el.group.length; i3++) {
                                        const draggedGroupEl = el.group[i3];

                                        if (draggedGroupEl.name == evt.dragged.getAttribute('title')) {
                                            return false;
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                return true;
            } else if (
                evt.to.classList.contains("Group") &&
                evt.dragged.firstChild.classList.contains("groups") &&
                evt.to.children.length < 2
            ) {
                console.log("Элемент попал в группу");
                let group = evt.to;
                if (group.children.length == 1) {
                    group.parentElement.classList.remove("groupErr");
                    group.nextElementSibling.style.display = "none";
                }
                return this.checkDistributions(true);
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
                if (postEl.id === el.id) {
                    if (postEl.type == "grouped") {
                        groupedCount--;
                    }
                    this.elements.splice(i, 1);
                } else if (this.elements[i].group != undefined) {
                    for (let i2 = 0; i2 < this.elements[i].group.length; i2++) {
                        const elem = this.elements[i].group[i2];
                        if (elem.id === el.id) {
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
    user-select: none;
}
.group-header__title {
    margin-left: 10px;
    padding: 2px 4px;
    color: #EAEAEA;
}
.group-header__title > label {
    margin-right: 6px;
    font-weight: 400;
}
.group-header__title > input {
    background: #54728F;
    border:none;
    border-radius: 3px;
    color: #EAEAEA;
    width: 300px;
}
.group-header__title > input:last-child {
    width: 55px;
}
.group-header__ungroup {
    font-size: 13px;
    background: #EA5463;
    color: #EAEAEA;
    padding: 5px 10px;
    border-radius: 2.5px;
    cursor: pointer;
}
.new-list {
    padding: 3px;
    background-color: #374B5E;
    border-radius: 5px;
    margin: 3px 0 8px 0
}
.hr {
    margin: 0;
    margin-top: 2px;
}
.handle {
    cursor: pointer;
}
</style>