<template>
	<div>
		<transition-group tag="div" class="ui stackable grid container segment" name="scale" appear>
			<!-- title -->
		 	<div class="sixteen wide column" key="title">
				<div class="ui center aligned inverted green segment mainTitle" @click="resetView">
					<div class="ui header">	
						Morning Essentials
					</div>
				</div>
			</div>
			<!-- App Selector -->
			<div v-if="!somethingSelected" class="eight wide column" key="newsSelector"> 
				<app-news-selector @newsSelected="newsSelectedProc"></app-news-selector>
			</div>

			<!-- App News Section -->
			<div v-if="newsSelected" class="sixteen wide column" key="newsSection">
				<app-news></app-news>
			</div>

			<!-- WeatherReportSelector -->
			<div v-if="!somethingSelected" class="eight wide column" key="weatherSelector">
				<app-weather-report-selector @weatherSelected="weatherSelectedProc"></app-weather-report-selector>
			</div>

			<!-- WeatherReportSection -->
			<div v-if="weatherSelected" class="sixteen wide column" key="weatherSection">
				<app-weather-report></app-weather-report>
			</div>

			<!-- Fortune Teller -->
			<div v-if="!somethingSelected" class="eight wide column" key="baba">
				<app-fortune-teller></app-fortune-teller>
			</div>

			<!-- Quote -->
			<div v-if="!somethingSelected" class="eight wide column" key="quote">
				<app-quote></app-quote>
			</div>
			<!-- Flip a Coin -->
			<div v-if="!somethingSelected" class="eight wide column" key="coin">
				<app-flip-a-coin></app-flip-a-coin>
			</div>

			<!-- todos -->
			<div v-if="!somethingSelected" class="eight wide column" key="todos">
				<app-todo-list></app-todo-list>
			</div>
			

			<div v-if="!somethingSelected" class="sixteen wide column" key="trafficmap">
				<app-traffic-map></app-traffic-map>
			</div>

			<div class="sixteen wide column" key="info">
				<div class="ui conatiner center aligned segment">
					<div class="content">
						<a  href="/logout" class="ui red large label">
							<i class="minus circle icon"></i>Logout
						</a>
					</div>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
import News from './components/News.vue';
import FortuneTeller from './components/FortuneTeller.vue';
import FlipACoin from './components/FlipACoin.vue';
import NewsSelector from './components/NewsSelector.vue';
import WeatherReportSelector from './components/WeatherReportSelector.vue';
import WeatherReport from './components/WeatherReport.vue';
import Quote from './components/Quote.vue';
import TodoList from "./components/TodoList.vue";
import TrafficMap from "./components/TrafficMap.vue";

	export default{
		data:function(){
			return{
				somethingSelected : false,
				newsSelected : false,
				weatherSelected: false
			}
		},
		components:{
			AppNews : News,
			AppFortuneTeller : FortuneTeller,
			AppFlipACoin : FlipACoin,
			AppNewsSelector : NewsSelector,
			AppWeatherReportSelector : WeatherReportSelector,
			AppWeatherReport : WeatherReport,
			AppQuote: Quote,
			AppTodoList : TodoList,
			AppTrafficMap: TrafficMap
		},
		methods:{
			newsSelectedProc(){
				this.somethingSelected = true;
				this.newsSelected = true;
			},
			weatherSelectedProc(){
				this.somethingSelected = true;
				this.weatherSelected = true;
			},
			resetView(){
				this.somethingSelected = false;
				this.newsSelected = false;
				this.weatherSelected = false;
			}
		},
	}
</script>

<style>

	.bottom-to-up-enter,.bottom-to-up-leave-to{
		opacity: 0;
		transform: translateY(50px);
	}

	.bottom-to-up-enter-active,.bottom-to-up-leave-active{
		transition: all 0.5s;
	}
	.bottom-to-up-move{
		transition: transform 0.5s;
	}
	.bottom-to-up-leave-active{
		position: absolute;
	}

	.scale-enter{
		opacity: 0;
		transform: scale(0.5);
	}
	.scale-move{
		transition: transform 0.5s;
	}
	.scale-leave-to{
		opacity: 0;
		transform: scale(0.5);
	}

	.scale-enter-active,.scale-leave-active{
		transition: all 0.3s;
	}
	.scale-enter-active{
		transition-delay: 0.3s;
	}
	.scale-leave-active{
		position: absolute;
	}
	
	.mainTitle{
		cursor: pointer;
		transition: all 0.25s;
	}

	.mainTitle:hover{
		background-color: #EEE;
		transform: scale(1.015);
	}

	body{
		/*background: no-repeat center center fixed url("https://unsplash.it/500/500/?random");*/
		background-size: cover;
		background: linear-gradient(to right, #00c3ff, #ffff1c);
	}
</style>