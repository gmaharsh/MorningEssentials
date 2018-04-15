<template>
	<div class="ui container center aligned segment" @click="weatherSelected" :class="{'loading': isLoading}">
		<div class="ui header"><i class="cloud outline icon"></i>Weather Report</div>
		<div class="content" v-if="!isError">
			<div class="ui huge label">{{location}}</div>
			<img class="ui centered image" :src="imgUrl"></img>
			<div class="ui huge label">
				{{temp}}&deg;C - {{desc}}
			</div>
			<br><br>
			<div class="ui button green">More</div>
		</div>
		<div class="content" v-if="isError">
			<div class="ui inverted red compact segment">Error
				<div class="ui segment">
					<li>Check your internet Connection</li>
					<li>Or wait for this service to become available</li>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default{
	data(){
		return{
			apiKey : "2e61d59f2b894b3c82364026172106",
			weatherUrl:"https://api.apixu.com/v1/current.json",
			lat:"",
			lon:"",
			temp:"",
			desc:"",
			imgUrl:"",
			isLoading : true,
			isError:false,
			location:""
			}
	},
	methods:{
		getWeather(){
			this.isLoading = true;
			let url = this.weatherUrl + "?q="+ this.lat +","+ this.lon + "&key=" + this.apiKey;
			axios.get(url).then(resp=>{
				this.location = resp.data.location.name+","+resp.data.location.country; 
				this.temp = Math.round((resp.data.current.temp_c)*100)/100;
				this.desc = resp.data.current.condition.text;
				this.imgUrl = "https:"+resp.data.current.condition.icon;
				this.isLoading = false;
			},err=>{
				console.log("Weather Error");
				this.isError = true;
				this.isLoading = false;
			});
		},
		weatherSelected(){
			this.$emit('weatherSelected');
		}
	},
	created(){
		//this won't work without, internet
		var that = this;
		navigator.geolocation.getCurrentPosition(function(pos){
				that.lat = Math.round(pos.coords.latitude*1000)/1000;
				that.lon = Math.round(pos.coords.longitude*1000)/1000;
				that.getWeather();
			},
			err=>{
				axios.get("https://ipapi.co/json/").then(resp=>{
					that.lat=resp.data.latitude;
					that.lon=resp.data.longitude;
					that.getWeather();
				},err=>{
					that.isError=true;
					that.isLoading = false;
				})
			}
			,{timeout:5000}
			);
	}
}

</script>

<style scoped>
	.ui.segment{
		cursor: pointer;
		transition: all 0.25s;
	}
	.ui.segment:hover{
		background-color: #EEE;
		transform: scale(1.025);
		box-shadow: #000 0 0 1px 1px;
	}
</style>