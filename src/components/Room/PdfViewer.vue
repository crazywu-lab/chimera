<template>
  <div id="pageContainer">
    <pdf src="http://www.pdf995.com/samples/pdf.pdf"></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'


export default {
  name: "PdfViewer",
  components: {
      pdf
  }
//   mounted() {
//     this.getPdf();
//   },
//   methods: {
    // async getPdf() {
    //   let container = document.getElementById("pageContainer");
    //   let pdfViewer = new PDFViewer({
    //     container: container
    //   });
    //   let loadingTask = pdfjsLib.getDocument("../../assets/pdf-sample.pdf");
    //   let pdf = await loadingTask.promise;
    //   pdfViewer.setDocument(pdf);
    // }
//   }
};
</script>

<style>

</style>