<template>
<nav>
    <div class="flex flex-wrap justify-between bg-black text-white p-2">
      <a class="ml-2 text-lg pd-4">WaifuG</a>
      <div>
        <input class="rounded-sm p-1 text-black" type="number" placeholder="Search">
        <button
          class="bg-dark text-green-600 rounded-lg mx-1 border-2 border-green-600 p-1 hover:bg-green-600 hover:text-white"
          type="button">Search</button>
      </div>
    </div>
  </nav>
</template>

<script>

export default{
    name: "my-home"
}

</script>