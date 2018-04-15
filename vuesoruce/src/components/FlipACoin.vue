<template>
	<div class="ui padded center aligned container segment">
		<div class="ui header center aligned"><i class="radio icon"></i> Want to decide something? Flip a Coin</div>
		<div class="ui compact segment" @click="flip">
			<transition name="flip" mode="out-in" appear>
				<div v-if="msg===true" class="ui circular segment" key="1">
					<div class="ui header">HEADS</div>
				</div>
				<div v-else-if="msg===false" class="ui circular inverted segment" key="2">
					<div class="ui header">TAILS</div>
				</div>
			</transition>
		</div>
		<button class="ui blue button" :class='{"loading":isFlipping}' @click="flip">Flip</button>
	</div>
</template>

<script>
export default{
	data(){
		return{
			isFlipping:false,
			msg:""
		}
	},
	methods:{
		flip(){
			if(!this.isFlipping){
				this.isFlipping = true;
				this.msg="";
				let randnum = Math.random();
				let vm = this;
				setTimeout(function(){
				    if(randnum<0.5){
				    	vm.msg=true;
				    }else{
				    	vm.msg=false;
				    }
				    vm.isFlipping = false;
				},700);
			}

		}
	}
}
</script>

<style scoped>

.ui.circular.segment{
	width: 100px;
	height: 100px;
}

.ui.compact.segment{
	margin-left: auto;
	margin-right: auto;
	width: 150px;
	height: 150px;
	cursor: pointer;
}

.flip-enter, .flip-leave-to{
	opacity: 0;
	transform:rotateX(270deg) scale(0.75);
}


.flip-enter-active,.flip-leave-active{
	transition: all 0.35s;
}
</style>