<template>
	<div class="ui container segment" @click="selected">
		<div class="ui header"><i class="newspaper icon"></i>News</div>
		<div class="content">
			Get to know some news from more than 70 newspapers!!
			<br><br>
			<div class="ui button green">Read</div>
		</div>
	</div>
</template>

<script>

export default{
	methods:{
		selected(){
			this.$emit('newsSelected');
		}
	}
}

</script>

<style scoped>
	.ui.container.segment{
		cursor: pointer;
		transition: all 0.25s;
	}
	.ui.container.segment:hover{
		background-color: #EEE;
		transform: scale(1.025);
		box-shadow: #000 0 0 1px 1px;
	}
</style>