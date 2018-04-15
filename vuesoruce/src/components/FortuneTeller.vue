<template>
<transition name="bottom-to-up" appear>

	<div class="ui container segment" :class="{'loading' : isLoading}">
		<div class="ui header"><i class="idea icon"></i>Fortune Baba Says</div>
		<div class="content" v-if="!isError">{{msg}}</div>
		<div class="content" v-else>
			<div class="ui inverted red compact segment">Error
				<div class="ui segment">
					<li>Check your internet Connection</li>
					<li>Or wait for this service to become available</li>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>

<script>
import axios from 'axios';

export default{
	data(){
		return{
			msg:"",
			apiUrl:"https://helloacm.com/api/fortune/",
			isLoading:true,
			isError:false
		}
	},
	created(){
		this.isLoading=true;
		axios.get(this.apiUrl).then(resp=>{
			this.msg=resp.data;
			this.isLoading=false;
		},resp=>{
			console.log("Fortune Teller error");
			this.isLoading = false;
			this.isError = true;
		});
	}
}

</script>

<style>
	
</style>