<template>
	
	<div class="column">
		<h1>News</h1>

		<div v-if="isError" class="ui inverted red compact segment" >Error
			<div class="ui segment">
				<li>Check your internet Connection</li>
				<li>Or wait for this service to become available</li>
			</div>
		</div>

		<div v-else>
				
			<input type="checkbox" v-model="isChecked" value="true" @change="getSources"> Show News only related to {{countryName}}
			</br>
			<br>
			<i class="notched circle loading icon" v-if="isLoadingSources"></i>
			<select v-model="selectedSource" :disabled="isLoadingSources" class="ui dropdown">
				<option value="default" v-if="isLoadingSources">Loading</option>
				<option value="default" v-else>Select News Source</option>
				<option v-for="source,index in sources" :value="index">{{source.name}}</option>
			</select>
			<br>
			<br>
			<app-news-article :source="generatedId"></app-news-article>

		</div>
	</div>

</template>

<script>

import NewsArticle from "./NewsArticle.vue";

export default{
	data:function(){
		return{
			locUrl:"https://ipapi.co/json/",
			newsUrl:"https://newsapi.org/v1/sources",
			location:"",
			countryName:"",
			isChecked:false,
			isLoadingSources:false,
			sources:[],
			selectedSource:"default",
			isError:false
		}
	},
	components:{
		AppNewsArticle:NewsArticle
	},
	computed:{
		generatedId(){
			if(this.selectedSource!="default"){
				return this.sources[this.selectedSource].id;
			}else return "";
		}
	},
	methods:{
		initialise(){
			this.isLoadingSources = true;
			this.getLoc();
		},
		getLoc(){   //gets country code of the user to get country based news
			this.$http.get(this.locUrl).then(resp=>{
				this.location = resp.body.country;
				this.countryName = resp.body.country_name;
				this.getSources();   //we use new location to fetch sources
			},err=>{
				console.log("IPAPI Error");
				this.isError = true;
			});
		},
		getSources(){   //gets news sources
			this.selectedSource = "default";
			this.isLoadingSources = true;
			let url = this.newsUrl;
			if(this.isChecked){
				url = url + "?country=" + this.location;
			}
			this.$http.get(url).then(resp=>{
				this.sources = resp.body.sources;
				this.isLoadingSources = false;
			},err=>{
				this.isError = true;
				console.log("News Source Error");
			});
		}
	},
	created(){
			this.initialise();
		}

}
</script>

<style>
	
</style>