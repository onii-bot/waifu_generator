<template>
<div id="container" class="flex flex-col flex-wrap text-center p-4 items-center align-center">
    <label for="textare" class="mb-4 text-lg text-white">No. of Waifu</label>
    <input class="w-96 rounded-sm p-1 h-10 mb-4" type="number" id="textare" placeholder="Enter" v-model="max_count">
    <button @click="fetchAPI" type="button" :class="{'disab':isRunning}"
      class="mt-4 mb-2 rounded-lg mx-1 border-2 text-lg py-1 px-2 text-white hover:bg-white hover:border-black hover:text-black">Search</button>
      <div class="flex flex-wrap">
        <h1 class="mt-2 text-yellow-600">Note: Due to the limit on API, each image takes 6 seconds to load</h1>
      <button @click="clearLocalStorage" class="rounded-sm ml-2 mt-2 px-1 border-2 text-sm text-white hover:bg-red-600 hover:border-black hover:text-white">Clear</button>  
      </div>
  </div>
  <div id="contents" class="flex flex-wrap card m-2 p-2 justify-around">

  </div>
</template>

<script>




export default{
    name: "my-home",
    data(){
        return{
            max_count : null,
            isRunning : false,
            allUrls: []
        }
    },
    methods: {
        fetchData(){
            fetch('https://api.waifu.im/search/')
            .then(response => response.json())
            .then(data => {
                let contents = document.getElementById("contents");
                let url = data["images"]["0"]["url"]
                this.allUrls.push(url)
                localStorage.setItem("urls",JSON.stringify(this.allUrls))
                contents.innerHTML = contents.innerHTML + `<a class="img-a" href="${url}"><img src="${url}" style='height:100%;width:100%;'></a>`
            })
            .catch(error => console.log(error));
        },

        fetchAPI(){
            if(this.max_count===null || this.max_count===0 || this.isRunning){
                return;
            }
            let count = 0;
            this.isRunning = true;
            this.fetchData();
            const interval = setInterval(() => {
                if (count >= this.max_count - 1) {
                    clearInterval(interval);
                    this.isRunning = false;
                }
                else{
                    this.fetchData();
                }
                count++;
            }, 6000);
        },
        clearLocalStorage(){
            localStorage.removeItem("urls")
            this.allUrls = []
            let contents = document.getElementById("contents");
            contents.innerHTML = ""
        }
    },
    mounted(){
        let a = localStorage.getItem("urls")
        if(a!=null){
            a = JSON.parse(a);
            let contents = document.getElementById("contents");
            for(let i=0;i<a.length;i++){
                this.allUrls[i] = a[i]
                contents.innerHTML = contents.innerHTML + `<a class="img-a" href="${this.allUrls[i]}"><img src="${this.allUrls[i]}" style='height:100%;width:100%;'></a>`
            }
            console.log(this.allUrls)
        }
    }
}

</script>