<template>
    <div class="chbox" :style="'width:'+checkboxWidth">
        <div class="wrap centre">
            <div class="checkbox">
                <input
                    :id="index"
                    type="checkbox"
                    :name="index"
                    :value="index"
					v-model="additional[val]"
                />
                <label :for="index"><slot></slot></label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "checkbox",
	props: {
		checkboxWidth: {
			type: String,
			required: true,
		},
		val: {
			type: String,
			required: true,
		},
		additional: {
			type: Object,
			required: true,
		},
		index: {
			type: String,
			required: true,
		},
	},
};
</script>

<style scoped>
.checkbox #check,
.checkbox .check {
	min-height: 0px;
}
.checkbox label {
    margin-top: 10px;
}
.chbox {
    position: relative;
    height: 42px;
    background: #fff;
    font-family: "Trebuchet MS";
    border-radius: 5px;
}

.wrap {
    position: absolute;
    top: calc(50% - 5px);
    left: 49%;
    margin-right: -50%;
    transform: translate(-50%, -50%) scale(2, 2);
}

input {
    display: none;
}

label {
    font-size: 10px;
    color: #bfbfbf;
    display: inline-block;
    padding: 0 0 0 1.5em;
    cursor: pointer;
}

label:before {
    content: "";
    display: inline-block;
    background: #55d8c6;
    position: absolute;
    left: 0;
    top: calc(50% - 3px);
    height: 10px;
    width: 10px;
    margin-right: 10px;
    border-radius: 80%;
    box-shadow: 0px 1px 0 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    border: 5px solid #fff;
    transition: border 0.3s ease;
}

input:checked + label:before {
    border-color: #fff;
    border-width: 0.5px;
}

input + label {
    transition: color 0.7s ease;
}

input:checked + label {
    color: #5d5d5d;
}
</style>