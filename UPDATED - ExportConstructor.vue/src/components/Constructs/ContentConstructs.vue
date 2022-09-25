<template>
    <div class="constructs">
        <content-params></content-params>
        <element-list class="report-elements h-full" style="max-height: calc(100vh - 151px)"></element-list>
    </div>
</template>

<script>
import ElementList from "@/components/Constructs/ElementList";
import ContentParams from "@/components/Constructs/ContentParams";

export default {
    components: {
        ElementList,
        ContentParams,
    },
};
</script>

<style>
.report-elements {
    background: white;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 15px;
}

.constructs {
    /* height: 93vh; */
    width: 100%;
    margin-right: 35px;
}

.accs {
    user-select: none;
    color: white;
}

* {
    box-sizing: border-box;
}

.acc {
    max-width: 250px;
}

.accs .acc:not(.accs .acc:last-child) {
    margin-right: 4px;
}
.accs .acc {
    font-size: 13px;
}
.accs .acc__title-copy span,
.accs .acc__title span {
    padding-top: 5.25px;
    padding-bottom: 5.25px;
}
.accs .acc .acc__title-copy span,
.accs .acc .acc__title span {
    border-radius: 4px;
}

.acc2 {
    display: flex;
    margin: 0 0 0px 5px;
    font-size: 15px;
}

.group__body > .acc2:not(.group__body > .acc2:last-child),
.accs > div:not(.accs > div:last-child) {
    margin-bottom: 8px;
}

.acc2__title {
    display: flex;
}

.acc2__title > i {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px;
    cursor: pointer;
}
.acc2__title > i:last-child {
    border-radius: 0 4.5px 4.5px 0;
    margin-left: 2px;
    margin-right: 7px;
}

.acc2__title > i:first-child {
    border-radius: 4.5px 0 0 4.5px;
    padding-left: 2px;
    margin-right: 2px;
}

.acc2__title span {
    min-width: 80px;
}
.acc__title-copy span,
.acc__title span,
.acc2__title span {
    padding: 3.75px 12px 3.75px 8px;
    display: block;
    width: 100%;
    white-space: nowrap;
    background: rgb(53, 126, 189);
}
.acc2__title {
    max-height: 30px;
}

.accs .acc2 .acc .acc__title-copy span,
.accs .acc2 .acc .acc__title span {
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
}

.acc2__content:not(.acc2__content.open) {
    overflow: hidden;
}

.acc2__content {
    transition: 0.35s;
}

.acc2__content .acc {
    margin-bottom: 0 !important;
}

.acc__content:not(.acc__content.open) {
    overflow: hidden;
}

.acc__content {
    height: 0px;
    vertical-align: middle;
    text-align: center;
    margin-top: 2px;
    transition: 0.35s;
}

.f-w {
    flex-wrap: wrap;
}

.f-dir-col {
    flex-direction: column;
}

.acc__item {
    background: rgb(53, 126, 189);
    height: 22px;
    max-height: 22px;
    margin-bottom: 2px;
    white-space: nowrap;
    padding-right: 8px;
    padding-left: 8px;
}

.gray {
    background: #cccccc !important;
}

.pos-r {
    position: relative;
}

.on-hover:hover > .pos-a {
    display: block;
}

.on-hover > .pos-a {
    display: none;
}

.pos-a {
    position: absolute;
    top: 0;
    left: 100%;
    padding-left: 4px;
}

.acc-number::-webkit-outer-spin-button,
.acc-number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.acc-number,
.acc-number:focus {
    -moz-appearance: textfield;
    outline: none;
}

.remove-element {
    background: #ea5463 !important;
}

.group {
    margin-bottom: 8px;
}

.group-bg {
    background: #374b5e;
    padding: 3px;
}

.group .remove-element {
    color: #eaeaea;
    padding: 0px 10px;
    vertical-align: middle;
    height: 30px;
    border-radius: 2.5px;
}

.group__title {
    font-size: 13px;
    border-radius: 5px 5px 0 0;
    padding: 5px 5px 5px 15px;
    margin-bottom: 1px;
}

.group__body {
    border-radius: 0 0 5px 5px;
    margin-bottom: 1px;
    padding: 20px 0;
}
</style>