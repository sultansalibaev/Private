<template>
    <div class="sidebar-menu w-full">
        <template v-for="[typeName, typeList] in typeArray" :key="typeName">
            <div class="sidebar__group" v-if="typeList.length > 0">
                <h3 class="f-w-500 title_newprojects block__header">
                    {{ groupNames[typeName] }}
                </h3>
                <div
                    v-for="element in typeList"
                    :key="element[0]"
                    class="element"
                    :id="element[0].id"
                    @click="addElement(report_copy[selectedFormat()], pdf, element[0].name, isPowerPoint, newId), newId++"
                    :data-name="element[0].name"
                >
                    {{ element[0].ru }}
                </div>
                <div
                    v-if="groupNames[typeName] == 'Графики' && isPDF"
                    class="element text-center add-group"
                    @click="addGroup(report_copy[selectedFormat()])"
                >
                    Группа
                </div>
                <div
                    v-else-if="groupNames[typeName] == 'Проект' && isPowerPoint"
                    class="element text-center add-group"
                    @click="addProject(report_copy[selectedFormat()])"
                >
                    Проект
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    props: {
        pdf: {
            required: true,
        },
    },
    setup() {
		const selectedFormat = inject('selectedFormat')
		const report_copy = inject('report_copy')
        const addElement = inject('addElement')
        const addGroup = inject('addGroup')
        const addProject = inject('addProject')

        return {
            selectedFormat,
            report_copy,
            addElement,
            addGroup,
            addProject,
        }
    },
    data() {
        return {
            groupNames: {
                default: "Общее",
                graph: "Графики",
                map: "Карты",
                table: "Таблицы",
                project: "Проект",
            },
            newId: 0
        }
    },
    computed: {
        typeArray() {
            const typesObj = {
                default: this.defaultList,
                graph: this.graphList,
                map: this.mapList,
                table: this.tableList,
                project: this.projectList,
            };

            return Object.entries(typesObj);
        },
        defaultList() {
            return this.pdf.filter((el) => el[0].type == "default");
        },
        graphList() {
            return this.pdf.filter((el) => el[0].type == "graph");
        },
        mapList() {
            return this.pdf.filter((el) => el[0].type == "map");
        },
        tableList() {
            return this.pdf.filter((el) => el[0].type == "table");
        },
        projectList() {
            return this.pdf.filter((el) => el[0].type == "project");
        },
        isPDF() {
            return this.selectedFormat() == 'pdf'
        },
        isPowerPoint() {
            return this.selectedFormat() == 'powerpoint'
        },
    },
};
</script>

<style scoped>
.sidebar-menu {
    user-select: none;
}
.sidebar__group {
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
    background: #35485a;
}
.block__header {
    color: #fff;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 0;
    font-size: 18px !important;
    margin: 0;
    margin-bottom: 4px;
}
.element {
    margin-bottom: 2px;
    border-radius: 3.5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    background-color: #357ebd;
    padding: 5px 7px;
    transition: 0.35s;

    font-size: 13px;
}
.element.gray {
    background-color: #ccc;
}
</style>