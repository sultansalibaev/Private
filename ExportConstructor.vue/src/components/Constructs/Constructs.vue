<template>
    <div class="bg" style="position: relative">
        <div class="box">
            <div class="container-4" :style="!additional.menu ? '' : 'display:none'">
                <input
                    type="text"
                    class="project-name"
                    placeholder="Название Шаблона..."
                /><!-- Мой Шаблон -->
                <!-- <button class="icon"><i class="fa fa-search"></i></button> -->
            </div>
            <div class="container-4" :style="additional.menu ? '' : 'display:none'">
                <input
                    type="text"
                    class="project-name2"
                    placeholder="Имя проекта..."
                /><!-- Мой Шаблон -->
                <!-- <button class="icon"><i class="fa fa-search"></i></button> -->
            </div>
            <div :style="'width:' + checkboxWidth && (!additional.menu ? '' : ';display:none')" v-if="additional.format.file != 'pdf'">
                <checkbox
                    :checkboxWidth="checkboxWidth"
                    :additional="additional"
                    :val="'full_text'"
                    :index="'check'"
                    >Полный текст</checkbox
                >
            </div>
            <div :style="'width:' + checkbox2Width && (!additional.menu ? '' : ';display:none')" v-if="additional.format.file == 'excel'">
                <checkbox
                    :checkboxWidth="checkbox2Width"
                    :additional="additional"
                    :val="'merge_cells'"
                    :index="'check2'"
                    >Объединить ячейки</checkbox
                >
            </div>
            <div v-if="additional.format.file == 'word'" :style="additional.menu ? '' : 'display:none'">
                <div
                    style="position: relative"
                    :style="'width:' + selectOrientationArray[0].selectWidth"
                >
                    <vue-select
                        :selectArray="selectOrientationArray[0]"
                        :elementLanguageList="elementLanguageList"
                        :defaultPDFValues="defaultPDFValues"
                        :elements="elements"
                        :additional="additional"
                    ></vue-select>
                </div>
            </div>
            <div :style="additional.menu ? '' : 'display:none'">
                <div
                    style="position: relative"
                    :style="'width:' + selectLanguageArray[0].selectWidth"
                >
                    <vue-select
                        :selectArray="selectLanguageArray[0]"
                        :elementLanguageList="elementLanguageList"
                        :defaultPDFValues="defaultPDFValues"
                        :elements="elements"
                        :additional="additional"
                    ></vue-select>
                </div>
            </div>
            <div>
                <div
                    style="position: relative"
                    :style="'width:' + selectArray[0].selectWidth"
                >
                    <vue-select
                        :elements="elements"
                        :selectArray="selectArray[0]"
                        :additional="additional"
                    ></vue-select>
                </div>
            </div>
            <div>
                <div
                    style="position: relative"
                    :style="'width:' + selectMenuArray[0].selectWidth"
                >
                    <vue-select
                        :elements="elements"
                        :selectArray="selectMenuArray[0]"
                        :additional="additional"
                    ></vue-select>
                </div>
            </div>
        </div>
        <div class="content">
            <construct
                @update="updateOption"
                :elements="elements"
                :model="model"
                :loading="loading"
            ></construct>
            <div class="model hide">
                <div class="model__title">Заголовок:</div>
                <div class="container-4" style="margin-right: 10px">
                    <input
                        type="text"
                        class="project-name"
                        placeholder="Заголовок..."
                        @keydown.enter="saveInput"
                    /><!-- Мой Шаблон -->
                    <!-- <button class="icon"><i class="fa fa-search"></i></button> -->
                </div>
                <button class="model-btn" @click="saveInput">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<script>
import Construct from "@/components/Constructs/Construct.vue";

export default {
    components: { Construct },
    name: "Constructs",
    props: {
        defaultPDFValues: {
            type: Object,
            required: false,
        },
        elementLanguageList: {
            type: Array,
            required: true,
        },
        elements: {
            type: Array,
            required: true,
        },
        additional: {
            type: Object,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            model: { is: false },
            checkboxWidth: "180px",
            checkbox2Width: "240px",
            selectMenuArray: [
                {
                    selectName: "Menu",
                    selectWidth: "105px",
                    selectOptionValue: 105 - (25 % +"px"),
                    options: [
                        {
                            id: 1,
                            iconClass: "",
                            name: "Шаблон",
                            checked: "checked",
                            disabled: "",
                        },
                        {
                            id: 2,
                            iconClass: "",
                            name: "Проект",
                            checked: "",
                            disabled: "",
                        },
                    ],
                },
            ],
            selectArray: [
                {
                    selectName: "Формат",
                    selectWidth: "140px",
                    selectOptionValue: 140 - (25 % +"px"),
                    options: [
                        {
                            id: 1,
                            iconClass: "fa fa-file-word f-s-22 p-r-5",
                            name: "WORD",
                            checked: "",
                            disabled: "",
                        },
                        {
                            id: 2,
                            iconClass: "fa fa-file-pdf f-s-22 p-r-5",
                            name: "PDF",
                            checked: "checked",
                            disabled: "",
                        },
                        {
                            id: 3,
                            iconClass: "fa fa-file-excel f-s-22 p-r-5",
                            name: "Excel",
                            checked: "",
                            disabled: "",
                        },
                        {
                            id: 4,
                            iconClass: "far fa-file-powerpoint",
                            name: "PowerPoint",
                            checked: "",
                            disabled: "",
                        },
                    ],
                },
            ],
            selectOrientationArray: [
                {
                    selectName: "Пейзаж",// Ориентация
                    selectWidth: "105px",
                    selectOptionValue: 105 - (25 % +"px"),
                    options: [
                        {
                            id: 1,
                            iconClass: "",
                            name: "Портрет",
                            checked: "",
                            disabled: "",
                        },
                        {
                            id: 2,
                            iconClass: "",
                            name: "Пейзаж",
                            checked: "checked",
                            disabled: "",
                        },
                    ],
                },
            ],
            selectLanguageArray: [
                {
                    selectName: "Язык",
                    selectWidth: "80px",
                    selectOptionValue: 80 - (25 % +"px"),
                    options: [
                        {
                            id: 1,
                            iconClass: "",
                            name: "RUS",
                            checked: "checked",
                            disabled: "",
                        },
                        {
                            id: 2,
                            iconClass: "",
                            name: "ENG",
                            checked: "",
                            disabled: "",
                        },
                        {
                            id: 3,
                            iconClass: "",
                            name: "KAZ",
                            checked: "",
                            disabled: "",
                        },
                    ],
                },
            ],
        };
    },
    emits: ["update"],
    methods: {
        saveInput() {
            console.log('btn event');
            let id = document.querySelector('.model-btn').getAttribute("id"),
                inputValue = document.querySelector(
                    ".model .project-name"
                ).value;
            let elementList = document.querySelector(".content .element-list");
            for (let index = 0; index < this.elements.length; index++) {
                const element = this.elements[index];
                if (element.id == id.split('_')[0]) {
                    element.options[0].children[0].valueRU = inputValue;
                    document.querySelector(".model").classList.add("hide");
                    elementList.style.filter = "none";
                    elementList.style.userSelect = "auto";
                    elementList.querySelector("div").style.pointerEvents = "auto";
                    this.model.is = false;
                    console.log('ending btn event');
                    return;
                }
            }
        },
        updateOption(optionName, ev) {
            this.$emit("update", optionName, ev);
        },
    },
    mounted() {
        document
            .querySelector(".element-list")
            .addEventListener("click", () => {
                if (this.model.is) {
                    let elementList = document.querySelector(
                        ".content .element-list"
                    );
                    elementList.style.filter = "none";
                    elementList.style.userSelect = "auto";
                    elementList.querySelector("div").style.pointerEvents = "auto";
                    document.querySelector(".model").classList.add("hide");
                    this.model.is = false;
                }
            });
    },
};
</script>

<style scoped>
.box {
    margin-bottom: 10px;
    display: flex;
}
.box > *:not(.box > *:last-child) {
    margin-right: 10px;
}
.container-4 {
    overflow: hidden;
    width: 100%;
    vertical-align: middle;
    white-space: nowrap;
}
.container-4 input.project-name,
.container-4 input.project-name2 {
    width: 100%;
    height: 42px;
    background: #4678a6;
    /* background: #2b303b; */
    border: none;
    font-size: 10pt;
    float: left;
    color: #fff;
    padding-left: 15px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
.container-4 input.project-name::placeholder,
.container-4 input.project-name2::placeholder {
    color: #fff;
}
.bg {
    /* overflow-y: scroll; */
    background-color: #f3f3f4;
    width: 100%;
    padding: 24px;
}
.content {
    position: relative;
    padding: 15px;
    overflow-y: scroll;
    background-color: #fff;
    height: 100%;
}
</style>