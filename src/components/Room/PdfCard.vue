<template>
  <div class="pdf-card">
    PDFCard
    <div class="pdf-name">{{file.originalname}}</div>
    <div class="pdf-size">{{file.size / 1000}} Kb</div>
  </div>
</template>

<script>
export default {
  name: "PDFCard",
  props: ["file"],
};
</script>

<style>
.pdf-card {
    display: flex;
    justify-content: space-around;
    background: grey;
    color: white;
    margin: 10px;
    padding: 20px;
}
</style>
