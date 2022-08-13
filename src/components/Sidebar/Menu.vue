<template>
    <div class="menu">
        <div class="block">
            <div class="block__header">Общее</div>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement($event, element)"
                    v-if="element.type == 'default'"
                >
                    {{ element.nameRU }}
                </div>
            </div>
        </div>
        <div class="block">
            <div class="block__header">Графики</div>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement($event, element)"
                    v-if="element.type == 'grouped'"
                >
                    {{ element.nameRU }}
                </div>
            </div>
            <div class="element" @click="createGroup">Группа</div>
        </div>
        <div class="block">
            <div class="block__header">Карты</div>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement($event, element)"
                    v-if="element.type == 'map'"
                >
                    {{ element.nameRU }}
                </div>
            </div>
        </div>
        <div class="block">
            <div class="block__header">Таблицы</div>
            <div v-for="element in elements" :key="element.id">
                <div
                    class="element"
                    @click="createElement($event, element)"
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
        elements: {
            type: Array,
            required: true,
        },
        newElements: {
            type: Array,
            required: true,
        },
    },
    methods: {
        // createElement(ev) {
        //     for (let i = 0; i < this.elements.length; i++) {
        //         const el = this.elements[i];
        // 		console.log(el.id, ev.target.getAttribute("id"), el.id == ev.target.getAttribute("id"));
        //         if (el.id == ev.target.getAttribute("id")) {
        //             this.newElements.push(el);
        //         }
        //     }
        // },
        createElement(ev, element) {
            // console.log(element);
            // for (let i = 0; i < this.newElements.length; i++) {
            //     const element = this.newElements[i];
            //     console.log(element, ev.target);
            // }
            ev.target.style.background = "#ccc";
            if (this.newElements.length) {
                for (let i = 0; i < this.newElements.length; i++) {
                    const newElement = this.newElements[i];
                    if (newElement.id == element.id) {
                        return;
                    }
                }
            }
            const independentCopy = JSON.parse(JSON.stringify(element));
            // independentCopy.id = Date.now();
            this.newElements.push(independentCopy);
        },
        createGroup(ev) {
            if (this.newElements.length >= 1) {
                let groupCount = 0;
                for (let i = 0; i < this.newElements.length; i++) {
                    const element = this.newElements[i];

                    if (element.group) {
                        groupCount++;
                    }
                }
                if (groupCount < 2) {
                    return this.newElements.push({
                        id: Date.now(),
                        name: "Group",
                        group: [],
                    });
                } else if (groupCount == 2) {
                    ev.target.style.background = "#ccc";
                    return this.newElements.push({
                        id: Date.now(),
                        name: "Group",
                        group: [],
                    });
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
    background-color: #4678a6;
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
    border-radius: 10px;
    margin: 5px;
    padding: 5px;
}
.block:nth-child(1) {
    background: #16395c; /* red */
}
.block:nth-child(2) {
    background: #075e07; /* yellow */
}
.block:nth-child(3) {
    background: #696e12; /* green */
}
.block:nth-child(4) {
    background: #6e1369; /* purple */
}
.block > div:not(.block > div:last-child) {
    margin-bottom: 2px;
}
.block div {
    border-radius: 5px;
}
.block__header {
    color: white;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 3px;
    text-align: center;
}
</style>