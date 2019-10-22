<template>
	<div id="app">
		<div class="link_a">
			<router-link :to="{ name: 'equipage' }">装备</router-link>
			<router-link :to="{ name: 'occupation' }">职业</router-link>
			<router-link :to="{ name: 'race' }">种族</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app-com'
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

body{
	background: rgba(0, 0, 0, 0.6);
}

li{
	list-style: none;
}

a {
	color: #000;
	text-decoration: none;
}

a:visited {
	color: #000;
}

.link_a {
  font-size: 0;
  background: rgb(207, 222, 223);
  height: 30px;
}

.link_a a{
  display: inline-block;
  width: 33.33%;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
	border-right: 1px solid rgb(68, 211, 144);
	height: 30px;
}

.link_a a:nth-last-of-type(1) {
	border-right: none;
}

.link_a a.router-link-active {
	color: #9f6c35;
}

div, span, a, img{
	box-sizing: border-box;
}

</style>
