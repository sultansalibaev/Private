<template>
    <div class="bg" style="position: relative">
        <div class="box">
            <div class="container-4">
                <input
                    type="text"
                    id="project-name"
                    placeholder="Имя Шаблона..."
                /><!-- Мой Шаблон -->
                <!-- <button class="icon"><i class="fa fa-search"></i></button> -->
            </div>
            <div :style="'width:'+checkboxWidth">
                <checkbox :checkboxWidth="checkboxWidth" :additional="additional">Полный текст</checkbox>
            </div>
            <div>
                <div style="position: relative" :style="'width:'+selectLanguageArray[0].selectWidth">
                    <vue-select :selectArray="selectLanguageArray[0]" :additional="additional"></vue-select>
                </div>
            </div>
            <div>
                <div style="position: relative" :style="'width:'+selectArray[0].selectWidth">
                    <vue-select :selectArray="selectArray[0]" :additional="additional"></vue-select>
                </div>
            </div>

        </div>
        <div class="content">
            <construct
                @update="updateOption"
                :elements="elements"
                :loading="loading"
            ></construct>
        </div>
    </div>
</template>

<script>
import Construct from "@/components/Constructs/Construct.vue";

export default {
    components: { Construct },
    name: "Constructs",
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
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            checkboxWidth: '180px',
            selectArray: [
                {
                    selectName: "Формат экспорта",
                    selectWidth: "200px",
                    selectOptionValue: 200 - 25% + "px",
                    options: [
                        {
                            id: 1,
                            iconClass: "fa fa-file-word f-s-22 p-r-5",
                            name: "WORD",
                            checked: '',
                            disabled: 'disabled',
                        },
                        {
                            id: 2,
                            iconClass: "fa fa-file-pdf f-s-22 p-r-5",
                            name: "PDF",
                            checked: 'checked',
                            disabled: '',
                        },
                        {
                            id: 3,
                            iconClass: "fa fa-file-excel f-s-22 p-r-5",
                            name: "Excel",
                            checked: '',
                            disabled: 'disabled',
                        },
                    ],
                },
            ],
            selectLanguageArray: [
                {
                    selectName: "Язык",
                    selectWidth: "85px",
                    selectOptionValue: 85 - 25% + "px",
                    options: [
                        {
                            id: 1,
                            iconClass: "",
                            name: "RUS",
                            checked: 'checked',
                            disabled: '',
                        },
                        {
                            id: 2,
                            iconClass: "",
                            name: "ENG",
                            checked: '',
                            disabled: '',
                        },
                        {
                            id: 3,
                            iconClass: "",
                            name: "KAZ",
                            checked: '',
                            disabled: '',
                        },
                    ],
                },
            ],
        };
    },
    emits: ["update"],
    methods: {
        updateOption(optionName, ev) {
            this.$emit("update", optionName, ev);
        },
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
.container-4 input#project-name {
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
.container-4 input#project-name::placeholder {
    color: #fff;
}
.bg {
    /* overflow-y: scroll; */
    background-color: #f3f3f4;
    width: 100%;
    padding: 24px;
}
.content {
    padding: 15px;
    overflow-y: scroll;
    background-color: #fff;
    height: 100%;
}
</style>