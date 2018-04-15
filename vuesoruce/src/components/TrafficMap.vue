<template>
	<div class="ui padded center aligned container segment" id="map" :class="{'loading': isLoading}">
	   
	</div>
</template>

<script>
import axios from 'axios';

export default{
	data(){
		return{
			lat:null,
			lon:null,
			isLoading:true
		}
	},
	methods:{
		setmap(){
			var map = new google.maps.Map(document.getElementById('map'), {
		          	zoom: 13,
		          	center: {"lat": this.lat, "lng": this.lon}
	          	});
          	var trafficLayer = new google.maps.TrafficLayer();
          	trafficLayer.setMap(map);
          	this.isLoading=false;
		}
	},
	created(){
		var that = this;
	        navigator.geolocation.getCurrentPosition(function(pos){
				that.lat = pos.coords.latitude;
	          	that.lon = pos.coords.longitude;
	          	that.setmap();
	    	},
	    	err=>{
	    		axios.get("https://ipapi.co/json/").then(resp=>{
	    			that.lat=resp.data.latitude;
	    			that.lon=resp.data.longitude;
	    			that.setmap();
	    		},err=>{
	    			that.isLoading = true;
	    		})
	    	}
	    	,{timeout:5000})
		}
	}
</script>

<style scoped>
#map{
        height: 300px;
	}
</style>