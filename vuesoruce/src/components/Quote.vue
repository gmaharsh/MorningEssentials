<template>
	<div class="ui container segment" :class="{'loading' : isLoading}">
		<div class="ui header">
			<i class="book icon"></i>{{title}}
		</div>
		<div class="content">
			{{quote}} - {{author}}
			<div v-if="isError" class="ui inverted red segment">Error Loading</div>
		</div>
	</div>
</template>

<script>

export default{
	data(){
		return{
			apiUrl:"https://quotes.rest/qod.json",
			author:"",
			quote:"",
			title:"",
			isLoading:true,
			isError:false
		}
	},
	created(){
		this.isLoading = true;
		this.$http.get(this.apiUrl).then(
			resp=>{
				this.author = resp.body.contents.quotes[0].author;
				this.quote = resp.body.contents.quotes[0].quote;
				this.title = resp.body.contents.quotes[0].title;
				this.isLoading = false;
			},
			resp=>{
				this.isLoading = false;
				this.isError = true;
				console.log("QuoteError");
		});
	}
}

</script>