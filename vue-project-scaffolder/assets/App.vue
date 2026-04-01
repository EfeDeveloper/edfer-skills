<script setup lang="ts">

</script>

<template>
  <main class="relative place-items-center grid bg-slate-950 px-6 min-h-screen overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_35%),radial-gradient(circle_at_bottom,rgba(249,115,22,0.18),transparent_30%)]" />
    <div class="top-1/2 left-1/2 absolute bg-cyan-400/10 blur-3xl rounded-full w-72 h-72 -translate-x-1/2 -translate-y-1/2" />

    <section class="relative flex flex-col items-center max-w-5xl text-center">
      <span class="bg-white/5 backdrop-blur-sm mb-5 px-4 py-1.5 border border-white/10 rounded-full font-semibold text-slate-300 text-xs uppercase tracking-[0.35em]">
        Vue + Tailwind v4
      </span>

      <h1 class="font-black text-white lg:text-[7rem] text-5xl sm:text-7xl md:text-8xl uppercase leading-none tracking-[0.16em]">
        <span class="block">Vue Project</span>
        <span class="block bg-clip-text bg-linear-to-r from-cyan-300 via-white to-amber-300 mt-2 text-transparent">
          Scaffolder
        </span>
      </h1>

      <div class="bg-linear-to-r from-transparent via-cyan-300 to-transparent opacity-80 mt-8 w-28 h-px" />
    </section>
  </main>
</template>
