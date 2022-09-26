<template>
    <div class="menu">
        <div
            class="block hide"
            v-if="additional.format.file == 'powerpoint'"
        ></div>
        <div class="block" v-else>
            <h3 class="f-w-500 title_newprojects block__header">Общее</h3>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement"
                    v-if="element.type == 'default'"
                >
                    {{ element.nameRU }}
                </div>
            </div>
        </div>
        <div class="block hide" v-if="additional.format.file == 'word'"></div>
        <div class="block" v-else>
            <h3 class="f-w-500 title_newprojects block__header">
                {{
                    additional.format.file == "powerpoint"
                        ? "Проект"
                        : "Графики"
                }}
            </h3>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement"
                    v-if="element.type == 'grouped'"
                >
                    {{ element.nameRU }}
                </div>
            </div>
            <div
                class="block hide"
                v-if="additional.format.file == 'excel'"
            ></div>
            <div class="element" @click="createGroup" v-else>
                {{
                    additional.format.file == "powerpoint" ? "Проект" : "Группа"
                }}
            </div>
        </div>
        <div
            class="block hide"
            v-if="
                additional.format.file == 'excel' ||
                additional.format.file == 'word' ||
                additional.format.file == 'powerpoint'
            "
        ></div>
        <div class="block" v-else>
            <h3 class="f-w-500 title_newprojects block__header">Карты</h3>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement"
                    v-if="element.type == 'map'"
                >
                    {{ element.nameRU }}
                </div>
            </div>
        </div>
        <div
            class="block hide"
            v-if="additional.format.file == 'powerpoint'"
        ></div>
        <div class="block" v-else>
            <h3 class="f-w-500 title_newprojects block__header">Таблицы</h3>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement"
                    v-if="element.type == 'table'"
                >
                    {{ element.nameRU }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Menu",
    props: {
        additional: {
            type: Object,
            required: true,
        },
        elements: {
            type: Array,
            required: true,
        },
        newElements: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            elementCount: 0,
        };
    },
    methods: {
        createElement(ev) {
            if (this.additional.format.file != "powerpoint") {
                ev.target.style.background = "#ccc";
            }
            if (this.elements.length) {
                for (let i = 0; i < this.elements.length; i++) {
                    const element = this.elements[i];

                    if (element.nameRU == ev.target.innerHTML) {
                        let copyElCount = 0;
                        for (let i = 0; i < this.newElements.length; i++) {
                            const newElement = this.newElements[i];

                            if (newElement.nameRU == element.nameRU) {
                                copyElCount++;
                            }
                            else if (newElement.name == "Group") {
                                for (let i = 0; i < newElement.group.length; i++) {
                                    const groupEl = newElement.group[i];

                                    if (groupEl.nameRU == element.nameRU) {
                                        copyElCount++;
                                    }
                                }
                            }
                        }
                        if (
                            copyElCount == 0 ||
                            this.additional.format.file == "powerpoint"
                        ) {
                            this.elementCount++;
                            const independentCopy = JSON.parse(
                                JSON.stringify(element)
                            );
                            independentCopy.id += this.elementCount;
                            this.newElements.push(independentCopy);
                        }
                    }
                }
            }
        },
        // createHexColor() {
        //     return Math.floor(Math.random()*16777215).toString(16);
        // },
        getRandomColor() {
            return "hsl(" + Math.random() * 360 + ", 100%, ";
        },
        createGroup(ev) {
            if (
                this.newElements.length >= 1 ||
                this.additional.format.file == "powerpoint"
            ) {
                let groupCount = 0;
                let emptyGroupCount = 0;
                let hasGroups =
                    this.additional.format.file == "powerpoint" ? true : false;
                for (let i = 0; i < this.newElements.length; i++) {
                    const element = this.newElements[i];

                    if (element.group) {
                        groupCount++;
                    }
                    if (element.group && element.group.length == 0) {
                        emptyGroupCount++;
                    }
                    if (element.groups == "groups") {
                        hasGroups = true;
                    }
                }
                if (hasGroups) {
                    if (
                        this.additional.format.file == "powerpoint" &&
                        emptyGroupCount == 0
                    ) {
                        let newHexColor = this.getRandomColor();
                        return this.newElements.push({
                            id: Date.now(),
                            name: "Group",
                            color: 'hsl(0, 0%, ',
                            projectName: '',
                            projectId: '',
                            group: [],
                            description:
                                "Элементы, занимающие половину ширины страницы, можно расположить рядом. Перенесите 2 элемента в группу, и в отчете они будут расположены в две колонки, занимая меньше места на странице.",
                        });
                    } else if (
                        groupCount < 2 &&
                        this.additional.format.file != "powerpoint"
                    ) {
                        return this.newElements.push({
                            id: Date.now(),
                            name: "Group",
                            color: "cccccc",
                            group: [],
                            description:
                                "Элементы, занимающие половину ширины страницы, можно расположить рядом. Перенесите 2 элемента в группу, и в отчете они будут расположены в две колонки, занимая меньше места на странице.",
                        });
                    } else if (
                        groupCount == 2 &&
                        this.additional.format.file != "powerpoint"
                    ) {
                        ev.target.style.background = "#ccc";
                        return this.newElements.push({
                            id: Date.now(),
                            name: "Group",
                            color: "cccccc",
                            group: [],
                            description:
                                "Элементы, занимающие половину ширины страницы, можно расположить рядом. Перенесите 2 элемента в группу, и в отчете они будут расположены в две колонки, занимая меньше места на странице.",
                        });
                    }
                }
            }
        },
    },
};
</script>

<style scoped>
.element {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    background-color: #357EBD;
    padding: 5px 7px;
    transition: 0.35s;
}
.element:not(.block div:nth-child(7)):hover {
    width: calc(100% + 110px);
    white-space: wrap;
    overflow: visible;
    cursor: pointer;
    background-color: #346797;
    transform: translate(-110px, 0px);
}
.block div:nth-child(8):hover {
    width: calc(100% + 80px);
    transform: translate(-80px, 0px);
}
.menu {
    user-select: none;
}
.block {
    /* border: 1px solid #000; */
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    background: #35485A;
}
/**
 * nth-child(1)- red - #16395c
 * nth-child(2)- yellow - #075e07
 * nth-child(3)- green - #696e12
 * nth-child(4)- purple - #6e1369
 */
.block > div:not(.block > div:last-child) {
    margin-bottom: 2px;
}
.block div {
    border-radius: 3.5px;
}
.block__header {
    color: white;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 0px;
    font-size: 18px !important;

}
</style>