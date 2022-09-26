<template>
    <div class="bg" style="position: relative">
        <div class="box">
            <div class="container-4" :style="!additional.menu ? '' : 'display:none'">
                <input
                    type="text"
                    class="project-name"
                    placeholder="Имя проекта..."
                    v-model="project_name"
                /><!-- Мой Шаблон -->
                <!-- <button class="icon"><i class="fa fa-search"></i></button> -->
            </div>
            <div class="container-4" :style="additional.menu ? '' : 'display:none'">
                <input
                    type="text"
                    class="constructor-name"
                    placeholder="Название Шаблона..."
                    v-model="constructor_name"
                /><!-- Мой Шаблон -->
                <!-- <button class="icon"><i class="fa fa-search"></i></button> -->
            </div>
            <!-- <div :style="'width:' + checkboxWidth && (!additional.menu ? '' : ';display:none')" v-if="additional.format.file != 'pdf' && additional.format.file != 'powerpoint'">
                <checkbox
                    :checkboxWidth="checkboxWidth"
                    :additional="additional"
                    :val="'full_text'"
                    :index="'check'"
                    >Полный текст</checkbox
                >
            </div> -->
            <div :style="'width:' + checkbox2Width && (!additional.menu ? '' : ';display:none')" v-if="additional.format.file == 'excel'">
                <checkbox
                    :checkboxWidth="checkbox2Width"
                    :additional="additional"
                    :val="'merge_cells'"
                    :index="'check2'"
                    >Объединить ячейки</checkbox
                >
            </div>
            <div :style="'width:' + checkboxWidth && (!additional.menu ? '' : ';display:none')" v-if="additional.format.file == 'powerpoint'">
                <checkbox
                    :checkboxWidth="checkboxWidth"
                    :additional="additional"
                    :val="'content'"
                    :index="'check3'"
                    >Оглавление</checkbox
                >
            </div>
            <div :style="'width:' + checkbox3Width && (!additional.menu ? '' : ';display:none')" v-if="additional.format.file == 'word'">
                <checkbox
                    :checkboxWidth="checkbox3Width"
                    :additional="additional"
                    :val="'full_page_title'"
                    :index="'check2'"
                    >Титульник</checkbox
                >
            </div>
            <div v-if="additional.format.file == 'word'" :style="!additional.menu ? '' : 'display:none'">
                <div
                    style="position: relative"
                    :style="'width:' + selectOrientationArray.selectWidth"
                >
                    <vue-select
                        :selectArray="selectOrientationArray"
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
                    :style="'width:' + selectArray.selectWidth"
                >
                    <vue-select
                        :elements="elements"
                        :selectArray="selectArray"
                        :additional="additional"
                        :oldElements="oldElements"
                    ></vue-select>
                </div>
            </div>
            <div>
                <div
                    style="position: relative"
                    :style="'width:' + selectMenuArray.selectWidth"
                >
                    <vue-select
                        :elements="elements"
                        :selectArray="selectMenuArray"
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
                :bluring="bluring"
                :additional="additional"
            ></construct>
            <div class="model hide" style="z-index:30;">
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
            <div class="model-bg" v-if="bluring.is || error.is" style="position: absolute;z-index:30;left: 0;right: 0;top: 0;bottom: 0;background: #000;opacity: .4;"></div>
            <div class="model model-error"  :class="error.is?'':' hide'" style="z-index:30;padding:0;margin: -40px 100px 0 100px;background: #fff;flex-direction:column;align-items: flex-start;border-radius: 5px;overflow: hidden;">
                <div class="model__title" style="display: flex;padding: 20px;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size:30px;color:red;margin-right: 15px;"></i>
                    <div style="display:flex;flex-direction: column;">
                        <span style="font-size:20px;font-weight:600"></span>
                        <span style="font-size:14px;margin-top:10px"></span>
                    </div>
                </div>
                <div class="btn-bg" style="display: flex;justify-content: flex-end;align-self: stretch;padding: 8px;background-color: #F9FAFB;">
                    <button class="model-btn" @click="hideErrorModel" style="color:#374150;background:#fff;border: 1px solid #D6D9DE;">Закрыть</button>
                </div>
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
        project_name: {
            type: String,
            required: false,
        },
        constructor_name: {
            type: String,
            required: false,
        },
        defaultPDFValues: {
            type: Object,
            required: false,
        },
        bluring: {
            type: Object,
            required: false,
        },
        error: {
            type: Object,
            required: false,
        },
        elementLanguageList: {
            type: Array,
            required: true,
        },
        selectArray: {
            type: Array,
            required: true,
        },
        selectMenuArray: {
            type: Array,
            required: true,
        },
        selectOrientationArray: {
            type: Array,
            required: true,
        },
        elements: {
            type: Array,
            required: true,
        },
        oldElements: {
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
    },
    data() {
        return {
            model: { is: false },
            checkboxWidth: "180px",
            checkbox2Width: "240px",
            checkbox3Width: "150px",
        };
    },
    emits: ["update"],
    methods: {
        hideErrorModel() {
            document.querySelector('.model-error').classList.add('hide');
            this.bluring.is = false;
            this.error.is = false;
        },
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
.container-4 input.constructor-name {
    width: 100%;
    height: 42px;
    background: white;
    /* background: #2b303b; */
    border: none;
    font-size: 10pt;
    float: left;
    color: #676A6C;
    padding-left: 15px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
.container-4 input.project-name::placeholder,
.container-4 input.constructor-name::placeholder {
    color: #828688;
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