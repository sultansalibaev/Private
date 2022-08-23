<template>
    <form id="app-cover" :style="'width:' + selectArray.selectWidth">
        <div id="select-box">
            <input type="checkbox" id="options-view-button" />
            <div id="select-button" class="brd">
                <div id="selected-value">
                    <span>{{ selectArray.selectName }}</span>
                </div>
                <div id="chevrons">
                    <i class="fas fa-chevron-up"></i>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div id="options">
                <div
                    class="option"
                    v-for="option in selectArray.options"
                    :key="option.id"
                    :style="
                        option.disabled == 'disabled'
                            ? 'color:#2d3667;background: #ccc;pointer-events:none'
                            : ''
                    "
                >
                    <input
                        class="s-c top"
                        type="radio"
                        name="platform"
                        value="behance"
                        v-if="option.checked == 'checked'"
                        @change="selectCheckedName(option.name)"
                        checked
                    />
                    <input
                        class="s-c top"
                        type="radio"
                        name="platform"
                        value="behance"
                        v-else-if="option.disabled == 'disabled'"
                        disabled
                    />
                    <input
                        class="s-c top"
                        type="radio"
                        name="platform"
                        value="behance"
                        @change="selectCheckedName(option.name)"
                        v-else
                    />
                    <i
                        v-if="option.iconClass"
                        :class="option.iconClass"
                        :style="
                            option.disabled == 'disabled'
                                ? 'color:#f7f7f7;'
                                : ''
                        "
                        aria-hidden="true"
                    ></i>
                    <span
                        class="label"
                        :style="
                            option.disabled == 'disabled'
                                ? 'color:#f7f7f7;'
                                : '' || option.iconClass
                                ? ''
                                : 'margin-left:0px;'
                        "
                        >{{ option.name }}</span
                    >
                    <span
                        class="opt-val"
                        :style="
                            'width:calc(' + selectArray.selectWidth + ' - 40px)'
                        "
                        >{{ option.name }}</span
                    >
                </div>
                <div id="option-bg"></div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: "vue-select",
    props: {
        selectArray: {
            type: Object,
            required: true,
        },
        additional: {
            type: Object,
            required: true,
        },
        elementLanguageList: {
            type: Array,
            required: false,
        },
        elements: {
            type: Array,
            required: false,
        },
        defaultPDFValues: {
            type: Object,
            required: false,
        },
    },
    methods: {
        selectCheckedName: function (optionName) {
            if (this.selectArray.selectName == "Формат") {
                this.additional.format.file = optionName.toLowerCase();
                let elementsLength = this.elements.length;
                for (let index = 0; index < elementsLength; index++) {
                    this.elements.splice(this.elements[index], 1);
                }
                let menuElements = document.querySelectorAll(".menu .element");
                menuElements.forEach((menuElement) => {
                    menuElement.style.background = "#4678a6";
                });
                console.log("this.elements", this.elements);
            } else if (this.selectArray.selectName == "Язык") {
                this.additional.format.language = optionName.toLowerCase();

                for (
                    let index = 0;
                    index < this.elementLanguageList.length;
                    index++
                ) {
                    const element = this.elementLanguageList[index];
                    if (element.options[0].value == "title") {
                        element.options[0].children[0].valueRU =
                            this.defaultPDFValues[element.name].title[
                                this.additional.format.language
                            ];

                        if (element.type == "table") {
                            let columns = element.options[1];
                            for (let i = 0; i < columns.children.length; i++) {
                                const column = columns.children[i];
                                if (
                                    this.defaultPDFValues[element.name].columns[
                                        column.value
                                    ]
                                ) {
                                    column.valueRU =
                                        column.children[0].valueRU =
                                            this.defaultPDFValues[
                                                element.name
                                            ].columns[column.value][
                                                this.additional.format.language
                                            ];
                                }
                            }
                        }
                    }
                }
                for (let index = 0; index < this.elements.length; index++) {
                    const element = this.elements[index];
                    if (element.options[0].value == "title") {
                        element.options[0].children[0].valueRU =
                            this.defaultPDFValues[element.name].title[
                                this.additional.format.language
                            ];
                        if (element.type == "table") {
                            let columns = element.options[1];
                            for (let i = 0; i < columns.children.length; i++) {
                                const column = columns.children[i];
                                if (
                                    this.defaultPDFValues[element.name].columns[
                                        column.value
                                    ]
                                ) {
                                    column.valueRU =
                                        column.children[0].valueRU =
                                            this.defaultPDFValues[
                                                element.name
                                            ].columns[column.value][
                                                this.additional.format.language
                                            ];
                                }
                            }
                        }
                        let modelIndex = document
                            .querySelector(".model-btn")
                            .getAttribute("id");
                        if (
                            modelIndex &&
                            element.id == modelIndex.split("_")[0]
                        ) {
                            document.querySelector(
                                ".model .project-name"
                            ).value = element.options[0].children[0].valueRU;
                        }
                    }
                }
            } else if (this.selectArray.selectName == "Пейзаж") {
                this.additional.orientation =
                    optionName == "Пейзаж" ? "landscape" : "portrait";
            } else if (this.selectArray.selectName == "Menu") {
                this.additional.menu = optionName == "Шаблон" ? true : false;
            }
        },
    },
};
</script>

<style scoped>
* {
    user-select: none;
}

*:focus {
    outline: none;
}

.brd {
    border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
}

#app-cover {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 42px;
    margin: 0 auto 0 auto;
    z-index: 1;
}

#select-button {
    position: relative;
    /* height: 16px; */
    padding: 12px 14px;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

#options-view-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

#selected-value {
    font-size: 16px;
    line-height: 1;
    margin-right: 26px;
}

.option i {
    width: 16px;
    height: 16px;
}

.option,
.label {
    color: #2d3667;
    font-size: 16px;
}

#chevrons {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 12px;
    padding: 9px 24px 9px 14px;
}

#chevrons i {
    display: block;
    height: 50%;
    width: 15px;
    color: #d1dede;
    font-size: 12px;
    text-align: right;
}

#options-view-button:checked + #select-button #chevrons i {
    color: #2d3667;
}

.options {
    position: absolute;
    left: 0;
    /* width: 250px; */
}

#options {
    position: absolute;
    top: 42px;
    right: 0;
    left: 0;
    /* width: 298px; */
    margin: 0 auto;
    background-color: #fff;
    border-radius: 4px;
}

#options-view-button:checked ~ #options {
    border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
}

.option {
    position: relative;
    line-height: 1;
    transition: 0.3s ease all;
    z-index: 2;
}

.option i {
    position: absolute;
    left: 14px;
    padding: 0;
    display: none;
    font-size: 16px !important;
}

#options-view-button:checked ~ #options .option i {
    display: block;
    padding: 12px 0;
}

.label {
    display: none;
    padding: 0;
    margin-left: 27px;
}

#options-view-button:checked ~ #options .label {
    display: block;
    padding: 12px 14px;
    background: none;
}

.s-c {
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
}

.s-c.top {
    top: 0;
    height: 100%;
}

.s-c.bottom {
    bottom: 0;
}

input[type="radio"] {
    position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
}

.s-c:hover ~ i {
    color: #fff;
    opacity: 0;
}

.s-c:hover {
    height: 100%;
    z-index: 1;
}

.s-c.bottom:hover + i {
    bottom: -25px;
    animation: moveup 0.3s ease 0.1s forwards;
}

.s-c.top:hover ~ i {
    top: -25px;
    animation: movedown 0.3s ease 0.1s forwards;
}

@keyframes moveup {
    0% {
        bottom: -25px;
        opacity: 0;
    }

    100% {
        bottom: 0;
        opacity: 1;
    }
}

@keyframes movedown {
    0% {
        top: -25px;
        opacity: 0;
    }

    100% {
        top: 0;
        opacity: 1;
    }
}

.label {
    transition: 0.3s ease all;
}

.opt-val {
    position: absolute;
    left: 14px;
    /* width: 217px; */
    height: 21px;
    opacity: 0;
    background-color: #fff;
    transform: scale(0);
}

.option input[type="radio"]:checked ~ .opt-val {
    opacity: 1;
    transform: scale(1);
}

.option input[type="radio"]:checked ~ i {
    top: 0;
    bottom: auto;
    opacity: 1;
    animation: unset;
}

.option input[type="radio"]:checked ~ i,
.option input[type="radio"]:checked ~ .label {
    color: #fff;
}

.option input[type="radio"]:checked ~ .label:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}

#options-view-button:not(:checked)
    ~ #options
    .option
    input[type="radio"]:checked
    ~ .opt-val {
    top: -30px;
}

.option:nth-child(1) input[type="radio"]:checked ~ .label:before {
    background-color: #0583f3;
    border-radius: 4px 4px 0 0;
}

.option:nth-child(1) input[type="radio"]:checked ~ .opt-val {
    top: -31px;
}

.option:nth-child(2) input[type="radio"]:checked ~ .label:before {
    background-color: #d80000;
}

.option:nth-child(2) input[type="radio"]:checked ~ .opt-val {
    top: -71px;
}

.option:nth-child(3) input[type="radio"]:checked ~ .label:before {
    background-color: #00ad0f;
}

.option:nth-child(3) input[type="radio"]:checked ~ .opt-val {
    top: -111px;
}
.option:nth-child(4) input[type="radio"]:checked ~ .label:before {
    background-color: yellow;
}

.option:nth-child(4) input[type="radio"]:checked ~ .opt-val {
    top: -151px;
}

.option .fa-codepen {
    color: #000;
}

.option .fa-dribbble {
    color: #ea4c89;
}

.option .fa-behance {
    color: #0057ff;
}

.option .fa-hackerrank {
    color: #32c766;
}

.option .fa-stack-overflow {
    color: #f48024;
}

.option .fa-free-code-camp {
    color: #006400;
}

#option-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 40px;
    transition: 0.3s ease all;
    z-index: 1;
    display: none;
}

#options-view-button:checked ~ #options #option-bg {
    display: block;
}

.option:hover .label {
    color: #fff;
}

.option:nth-child(1):hover ~ #option-bg {
    top: 0;
    background-color: #0583f3;
    border-radius: 4px 4px 0 0;
}

.option:nth-child(2):hover ~ #option-bg {
    top: 40px;
    background-color: #d80000;
}

.option:nth-child(3):hover ~ #option-bg {
    top: 80px;
    background-color: #00ad0f;
}
.option:nth-child(4):hover ~ #option-bg {
    top: 120px;
    background-color: #ebeb0e;
}

.fa-file-word:before {
    content: "\f1c2";
}

.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>