<template>
	
	<div class="column">
		<h1>Articles</h1>

			<div class="ui container segments" style="">

				<div class="ui loading segment" v-if="updating">
					<h1>Loading Articles, please wait</h1>
				</div>

				<div v-else class="ui orange segment" v-for="article in articles">
					<div class="ui stackable grid">
						<div class="four wide column">
							<a :href="article.url" target="_blank" class="ui rounded image"><img :src="article.urlToImage" alt=""></a>
						</div>
						<div class="twelve wide column">
							<div class="header"><a target="_blank" :href="article.url">{{article.title}}</a></div>
							<p>{{article.description}}</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

</template>

<script>
export default{
	props:['source'],
	data(){
		return{
			articles:Object,
			apiKey:"b9c65a8b75424a56afe6f912b813a06a",
			url:"https://newsapi.org/v1/articles?",
			updating:false
		}
	},
	methods:{
		updateArticle(){
			if(this.source==""){return;} // check the default value of <select> in News.vue
			this.updating = true;
			this.$http.get(this.url+"&source="+this.source+"&apiKey="+this.apiKey).then(resp=>{
				this.articles = resp.body.articles;
				this.updating = false;
			});
		}
	},
	watch:{
		source(val){
			this.updateArticle(val);
		}
	}
}
</script>

<style>
	
</style>